/**
 * inspired by leaflet-plugins
 */
import { GeoLoader } from './geo.loader';
import { GeoElement } from './geo.parser';
import * as L from 'leaflet';
import 'leaflet.markercluster';
export interface MapElement {
    id: string;
    code?: string;
    color?: string;
    name: string;
    popupContent: string;
    trackUrl?: string;
    trackSrc?: string;
    point?: L.LatLng;
    type?: string;
    title?: string;
    iconStart?: L.DivIcon;
    iconEnd?: L.DivIcon;
}
export declare class GeoParsedFeature extends L.FeatureGroup {
    options: any;
    _layers: {};
    layers: {};
    geoLoader: GeoLoader;
    constructor(geoLoader: GeoLoader, geoElement: MapElement, options: {});
    initialize(geoLoader: GeoLoader, geoElement: MapElement, options: {}): void;
    addGeoData(geoElement: MapElement, options: any): void;
    convertGeoElementsToLayers(gpxElement: MapElement, geoElements: GeoElement[], options: any): L.FeatureGroup;
}
