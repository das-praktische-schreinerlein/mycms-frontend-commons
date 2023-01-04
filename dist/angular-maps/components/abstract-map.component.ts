import {AfterViewChecked, Input, OnChanges, SimpleChange} from '@angular/core';
import {GeoLoader} from '../services/geo.loader';
import {GeoJsonParser} from '../services/geojson.parser';
import {GeoGpxParser} from '../services/geogpx.parser';
import {ComponentUtils} from '../../angular-commons/services/component.utils';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {MapElement} from '../services/leaflet-geo.plugin';
import {GeoTxtParser} from '../services/geotxt.parser';

export abstract class AbstractMapComponent implements AfterViewChecked, OnChanges {
    protected gpxLoader: GeoLoader;
    protected jsonLoader: GeoLoader;
    protected txtLoader: GeoLoader;

    initialized: boolean;
    flgfullScreen = false;
    mapHeight = '';

    @Input()
    public mapId: string;

    @Input()
    public height: string;

    @Input()
    public mapElements: MapElement[];

    constructor(private http: MinimalHttpBackendClient) {
        this.gpxLoader = new GeoLoader(http, new GeoGpxParser());
        this.jsonLoader = new GeoLoader(http, new GeoJsonParser());
        this.txtLoader = new GeoLoader(http, new GeoTxtParser());
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
    }

    protected abstract renderMap();

    protected determineLoader(mapElement: MapElement): GeoLoader {
        const trackSrc = mapElement.trackSrc;
        const trackUrl = mapElement.trackUrl;
        const point = mapElement.point;

        if ((trackSrc === undefined || trackSrc === null) &&
            (trackUrl === undefined || trackUrl === null) &&
            point !== undefined) {
            return this.jsonLoader;
        } else if (this.gpxLoader.isResponsibleForFile(trackUrl)
            || this.gpxLoader.isResponsibleForSrc(trackSrc)) {
            return this.gpxLoader;
        } else if (this.jsonLoader.isResponsibleForFile(trackUrl)
            || this.jsonLoader.isResponsibleForSrc(trackSrc)) {
            return this.jsonLoader;
        } else if (this.txtLoader.isResponsibleForFile(trackUrl)
            || this.txtLoader.isResponsibleForSrc(trackSrc)) {
            return this.txtLoader;
        } else {
            console.error('no loader for id/mapElement/url/src:', mapElement.id, mapElement, trackUrl, trackSrc);
        }

        return undefined;
    }
}
