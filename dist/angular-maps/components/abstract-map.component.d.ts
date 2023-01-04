import { AfterViewChecked, OnChanges, SimpleChange } from '@angular/core';
import { GeoLoader } from '../services/geo.loader';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { MapElement } from '../services/leaflet-geo.plugin';
export declare abstract class AbstractMapComponent implements AfterViewChecked, OnChanges {
    private http;
    protected gpxLoader: GeoLoader;
    protected jsonLoader: GeoLoader;
    protected txtLoader: GeoLoader;
    initialized: boolean;
    flgfullScreen: boolean;
    mapHeight: string;
    mapId: string;
    height: string;
    mapElements: MapElement[];
    constructor(http: MinimalHttpBackendClient);
    ngAfterViewChecked(): void;
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    toggleFullScreen(): void;
    protected abstract renderMap(): any;
    protected determineLoader(mapElement: MapElement): GeoLoader;
}
