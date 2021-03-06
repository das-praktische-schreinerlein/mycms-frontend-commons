import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange
} from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import {GeoParsedFeature, MapElement} from '../../services/leaflet-geo.plugin';
import {GeoLoader} from '../../services/geo.loader';
import {GeoJsonParser} from '../../services/geojson.parser';
import {GeoGpxParser} from '../../services/geogpx.parser';
import {ComponentUtils} from '../../../angular-commons/services/component.utils';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';

import * as L from 'leaflet';
import {GeoElement, GeoElementType} from '../../services/geo.parser';
import LatLng = L.LatLng;
import LatLngBounds = L.LatLngBounds;

export interface LeafletMapOptions {
    flgGenerateNameFromGpx: boolean;
    showAreaMarker: boolean;
    showStartMarker: boolean;
    showEndMarker: boolean;
    editable?: boolean;
}

@Component({
    selector: 'app-leaflet-map',
    templateUrl: './leaflet-map.component.html',
    styleUrls: ['./leaflet-map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements AfterViewChecked, OnChanges {
    // create the tile layer with correct attribution
    private osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    private osm = new L.TileLayer(this.osmUrl, {
        minZoom: 1, maxZoom: 16,
        attribution: this.osmAttrib
    });
    private gpxLoader: GeoLoader;
    private jsonLoader: GeoLoader;

    initialized: boolean;
    map: L.Map;
    mapHeight = '390px';
    flgfullScreen = false;
    private featureGroup: L.MarkerClusterGroup;
    private loadedMapElements: MapElement[];
    private noCoorElements: MapElement[];
    private bounds: LatLngBounds = undefined;

    @Input()
    public mapId: string;

    @Input()
    public height: string;

    @Input()
    public mapElements: MapElement[];

    @Input()
    public centerOnMapElements: MapElement[] = undefined;

    @Input()
    public center: L.LatLng;

    @Input()
    public zoom: number;

    @Input()
    public options: LeafletMapOptions;

    @Output()
    public centerChanged: EventEmitter<L.LatLng> = new EventEmitter();

    @Output()
    public mapCreated: EventEmitter<L.Map> = new EventEmitter();

    @Output()
    public mapElementClicked: EventEmitter<MapElement> = new EventEmitter();

    @Output()
    public mapElementsLoaded: EventEmitter<MapElement[]> = new EventEmitter();

    constructor(private http: MinimalHttpBackendClient) {
        this.gpxLoader = new GeoLoader(http, new GeoGpxParser());
        this.jsonLoader = new GeoLoader(http, new GeoJsonParser());
    }

    ngAfterViewChecked() {
        if (this.initialized) {
            return;
        }

        this.initialized = true;
        this.renderMap();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (this.initialized && ComponentUtils.hasNgChanged(changes)) {
            this.renderMap();
        }
    }

    toggleFullScreen() {
        this.flgfullScreen = !this.flgfullScreen;
        this.renderMap();
        const me = this;
        setTimeout(function init() {
            me.map.invalidateSize();
        }, 500);
    }

    private renderMap() {
        // TODO: move to Service
        if (!this.initialized || !this.mapId) {
            return;
        }

        const mapHeight = this.flgfullScreen ? window.innerHeight - 10 : parseInt(this.height, 10) - 10;
        this.mapHeight = mapHeight + 'px';

        if (!this.map) {
            // set up the map
            this.map = new L.Map(this.mapId);
            this.map.addLayer(this.osm);
            this.mapCreated.emit(this.map);
        }

        if (!this.map) {
            return;
        }

        if (this.featureGroup) {
            this.featureGroup.clearLayers();
            this.map.removeLayer(this.featureGroup);
        }
        this.loadedMapElements = [];
        this.noCoorElements = [];
        this.bounds = undefined;

        const center = this.center || new LatLng(43, 16);
        this.map.setView(center, this.zoom);
        const me = this;
        this.featureGroup = L.markerClusterGroup();
        this.featureGroup.addTo(this.map);

        for (let i = 0; i < this.mapElements.length; i++) {
            const mapElement = this.mapElements[i];
            if (mapElement.trackUrl || mapElement.trackSrc) {
                let geoFeature: GeoParsedFeature;
                if ((mapElement.trackUrl !== undefined && mapElement.trackUrl.endsWith('.gpx'))
                    || (mapElement.trackSrc !== undefined && mapElement.trackSrc !== null &&
                        (mapElement.trackSrc.indexOf('<trkpt') || mapElement.trackSrc.indexOf('<rpt')))) {
                    geoFeature = new GeoParsedFeature(this.gpxLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this.options.editable,
                        generateName: this.options.flgGenerateNameFromGpx,
                        showAreaMarker: this.options.showAreaMarker,
                        showStartMarker: this.options.showStartMarker,
                        showEndMarker: this.options.showEndMarker
                    });
                } else {
                    geoFeature = new GeoParsedFeature(this.jsonLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this.options.editable,
                        generateName: this.options.flgGenerateNameFromGpx,
                        showAreaMarker: this.options.showAreaMarker,
                        showStartMarker: this.options.showStartMarker,
                        showEndMarker: this.options.showEndMarker
                    });
                }
                geoFeature.on('error', function (e) {
                    const loadedMapElement = <MapElement>e['mapElement'];
                    console.error('cant load mapElement:', loadedMapElement.id);
                    me.pushNoCoorMapElement(loadedMapElement);
                });
                geoFeature.on('loaded', function (e) {
                    const loadedTrackFeature = <L.FeatureGroup>e.target;
                    const loadedMapElement = <MapElement>e['mapElement'];
                    me.featureGroup.addLayer(loadedTrackFeature);
                    loadedTrackFeature.on('click', function () {
                        me.mapElementClicked.emit(loadedMapElement);
                    });

                    if (me.centerOnMapElements && me.centerOnMapElements.length > 0) {
                        if (me.centerOnMapElements.indexOf(loadedMapElement) >= 0) {
                            me.bounds = me.extendBounds(me.bounds, loadedTrackFeature.getBounds());
                        }
                    } else {
                        me.bounds = me.extendBounds(me.bounds, loadedTrackFeature.getBounds());
                    }

                    if (me.bounds) {
                        me.map.fitBounds(me.bounds);
                    }
                    me.pushLoadedMapElement(loadedMapElement);
                });
            } else if (mapElement.point) {
                const prefix = (mapElement.code !== undefined ? mapElement.code + ' ' : '');
                const geoElement = new GeoElement(GeoElementType.WAYPOINT, [mapElement.point],
                    mapElement.title || (prefix + mapElement.name));
                const pointFeature: L.FeatureGroup = GeoParsedFeature.convertGeoElementsToLayers(mapElement, [geoElement], {
                    async: true,
                    display_wpt: true,
                    editable: this.options.editable,
                    generateName: this.options.flgGenerateNameFromGpx,
                    showAreaMarker: this.options.showAreaMarker,
                    showStartMarker: this.options.showStartMarker,
                    showEndMarker: this.options.showEndMarker
                });
                mapElement.featureLayer = pointFeature;
                me.featureGroup.addLayer(pointFeature);
                pointFeature.on('click', function () {
                    me.mapElementClicked.emit(mapElement);
                });

                if (me.centerOnMapElements && me.centerOnMapElements.length > 0) {
                    if (me.centerOnMapElements.indexOf(mapElement) >= 0) {
                        me.bounds = me.extendBounds(me.bounds, pointFeature.getBounds());
                    }
                } else {
                    me.bounds = me.extendBounds(me.bounds, pointFeature.getBounds());
                }
                if (me.bounds) {
                    me.map.fitBounds(me.bounds);
                }
                me.pushLoadedMapElement(mapElement);
            } else {
                me.pushNoCoorMapElement(mapElement);
            }
        }

        this.checkAndEmitLoadedEventIfAllProcessed()
    }

    private pushLoadedMapElement(loadedMapElement: MapElement) {
        this.loadedMapElements.push(loadedMapElement);
        this.checkAndEmitLoadedEventIfAllProcessed();
    }

    private pushNoCoorMapElement(noCoorElement: MapElement) {
        this.noCoorElements.push(noCoorElement);
        this.checkAndEmitLoadedEventIfAllProcessed();
    }

    private checkAndEmitLoadedEventIfAllProcessed() {
        if (this.mapElements.length === 0 ||
            this.loadedMapElements.length + this.noCoorElements.length === this.mapElements.length) {
            this.mapElementsLoaded.emit(this.loadedMapElements);
        }
    }

    private extendBounds(bounds: LatLngBounds, element: LatLngBounds) {
        if (!bounds) {
            return element;
        }

        return bounds.extend(element);
    }
}
