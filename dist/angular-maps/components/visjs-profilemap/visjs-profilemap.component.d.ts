import { AfterViewChecked, OnChanges, SimpleChange } from '@angular/core';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { MapElement } from '../../services/leaflet-geo.plugin';
export declare class VisJsProfileMapComponent implements AfterViewChecked, OnChanges {
    private http;
    private gpxLoader;
    private jsonLoader;
    initialized: boolean;
    flgfullScreen: boolean;
    mapHeight: string;
    mapId: string;
    height: string;
    mapElements: MapElement[];
    flgGenerateNameFromGpx?: boolean;
    constructor(http: MinimalHttpBackendClient);
    ngAfterViewChecked(): void;
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    toggleFullScreen(): void;
    private renderMap;
}
