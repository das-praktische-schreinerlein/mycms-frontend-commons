import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import {GeoParsedFeature, MapElement} from '../../services/leaflet-geo.plugin';
import * as L from 'leaflet';
import {FeatureGroup, LatLng, LatLngBounds, markerClusterGroup, MarkerClusterGroup, TileLayer} from 'leaflet';
import {GeoElement, GeoElementType} from '../../services/geo.parser';
import {AbstractMapComponent} from '../abstract-map.component';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {AbstractGeoGpxParser} from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';

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
export class LeafletMapComponent extends AbstractMapComponent {
    map: L.Map;
    mapHeight = '390px';

    // create the tile layer with correct attribution
    private osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    private osm = new TileLayer(this.osmUrl, {
        minZoom: 1, maxZoom: 16,
        attribution: this.osmAttrib
    });

    private featureGroup: MarkerClusterGroup;
    private loadedMapElements: MapElement[];
    private noCoorElements: MapElement[];
    private bounds: LatLngBounds = undefined;

    @Input()
    public centerOnMapElements: MapElement[] = undefined;

    @Input()
    public center: LatLng;

    @Input()
    public zoom: number;

    @Input()
    public options: LeafletMapOptions;

    @Output()
    public centerChanged: EventEmitter<LatLng> = new EventEmitter();

    @Output()
    public mapCreated: EventEmitter<L.Map> = new EventEmitter();

    @Output()
    public mapElementClicked: EventEmitter<MapElement> = new EventEmitter();

    @Output()
    public mapElementsLoaded: EventEmitter<MapElement[]> = new EventEmitter();

    constructor(http: MinimalHttpBackendClient) {
        super(http);
    }

    protected renderMap() {
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
        this.featureGroup = markerClusterGroup();
        this.featureGroup.addTo(this.map);

        for (let i = 0; i < this.mapElements.length; i++) {
            const mapElement = this.mapElements[i];
            const trackSrc = mapElement.trackSrc;
            const trackUrl = mapElement.trackUrl;
            if (trackUrl || trackSrc) {
                let geoFeature: GeoParsedFeature;
                if (this.gpxLoader.isResponsibleForFile(trackUrl)
                    || this.gpxLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this.gpxLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this.options.editable,
                        generateName: this.options.flgGenerateNameFromGpx,
                        showAreaMarker: this.options.showAreaMarker,
                        showStartMarker: this.options.showStartMarker,
                        showEndMarker: this.options.showEndMarker
                    });
                } else if (this.txtLoader.isResponsibleForFile(trackUrl)
                    || this.txtLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this.txtLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this.options.editable,
                        generateName: this.options.flgGenerateNameFromGpx,
                        showAreaMarker: this.options.showAreaMarker,
                        showStartMarker: this.options.showStartMarker,
                        showEndMarker: this.options.showEndMarker
                    });
                } else if (this.jsonLoader.isResponsibleForFile(trackUrl)
                    || this.jsonLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this.jsonLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this.options.editable,
                        generateName: this.options.flgGenerateNameFromGpx,
                        showAreaMarker: this.options.showAreaMarker,
                        showStartMarker: this.options.showStartMarker,
                        showEndMarker: this.options.showEndMarker
                    });
                } else {
                    console.error('no loader for mapElement responsible:', mapElement.id, mapElement, trackUrl, trackSrc,
                        AbstractGeoGpxParser.isResponsibleForSrc(trackSrc));
                    me.pushNoCoorMapElement(mapElement);
                    continue;
                }

                if (!geoFeature) {
                    console.error('no geoFeature for mapElement parsed by loader:', mapElement.id, mapElement, trackUrl, trackSrc,
                        this.gpxLoader.isResponsibleForSrc(trackSrc));
                    me.pushNoCoorMapElement(mapElement);
                    continue;
                }

                geoFeature.on('error', function (e) {
                    const loadedMapElement = <MapElement>e['mapElement'];
                    console.error('cant load mapElement:', loadedMapElement.id);
                    me.pushNoCoorMapElement(loadedMapElement);
                });
                geoFeature.on('loaded', function (e) {
                    const loadedTrackFeature = <FeatureGroup>e.target;
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
                const pointFeature: FeatureGroup = GeoParsedFeature.convertGeoElementsToLayers(mapElement, [geoElement], {
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
