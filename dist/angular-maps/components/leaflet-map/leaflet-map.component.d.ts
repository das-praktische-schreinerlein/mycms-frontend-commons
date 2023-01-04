import { EventEmitter } from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import { MapElement } from '../../services/leaflet-geo.plugin';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import { AbstractMapComponent } from '../abstract-map.component';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
export interface LeafletMapOptions {
    flgGenerateNameFromGpx: boolean;
    showAreaMarker: boolean;
    showStartMarker: boolean;
    showEndMarker: boolean;
    editable?: boolean;
}
export declare class LeafletMapComponent extends AbstractMapComponent {
    map: L.Map;
    mapHeight: string;
    private osmUrl;
    private osmAttrib;
    private osm;
    private featureGroup;
    private loadedMapElements;
    private noCoorElements;
    private bounds;
    centerOnMapElements: MapElement[];
    center: LatLng;
    zoom: number;
    options: LeafletMapOptions;
    centerChanged: EventEmitter<LatLng>;
    mapCreated: EventEmitter<L.Map>;
    mapElementClicked: EventEmitter<MapElement>;
    mapElementsLoaded: EventEmitter<MapElement[]>;
    constructor(http: MinimalHttpBackendClient);
    protected renderMap(): void;
    private pushLoadedMapElement;
    private pushNoCoorMapElement;
    private checkAndEmitLoadedEventIfAllProcessed;
    private extendBounds;
}
