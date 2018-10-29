import { AfterViewChecked, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import { MapElement } from '../../services/leaflet-geo.plugin';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import * as L from 'leaflet';
export interface LeafletMapOptions {
    flgGenerateNameFromGpx: boolean;
    showStartMarker: boolean;
    showEndMarker: boolean;
}
export declare class LeafletMapComponent implements AfterViewChecked, OnChanges {
    private http;
    private osmUrl;
    private osmAttrib;
    private osm;
    private gpxLoader;
    private jsonLoader;
    initialized: boolean;
    map: L.Map;
    mapHeight: string;
    flgfullScreen: boolean;
    private featureGroup;
    private loadedMapElements;
    private noCoorElements;
    mapId: string;
    height: string;
    mapElements: MapElement[];
    center: L.LatLng;
    zoom: number;
    options: LeafletMapOptions;
    centerChanged: EventEmitter<L.LatLng>;
    mapElementClicked: EventEmitter<MapElement>;
    mapElementsLoaded: EventEmitter<MapElement[]>;
    constructor(http: MinimalHttpBackendClient);
    ngAfterViewChecked(): void;
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    toggleFullScreen(): void;
    private renderMap();
    private pushLoadedMapElement(loadedMapElement);
}