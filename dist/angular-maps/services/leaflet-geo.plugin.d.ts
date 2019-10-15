/**
 * inspired by leaflet-plugins
 */
import { GeoLoader } from './geo.loader';
import { GeoElement } from './geo.parser';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-editable-polyline';
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
    iconPolylineEditor?: L.Icon;
    iconEnd?: L.DivIcon;
    featureLayer?: L.Layer;
}
export declare class GeoParsedFeature extends L.FeatureGroup {
    options: any;
    _layers: {};
    geoLoader: GeoLoader;
    static convertGeoElementsToLayers(gpxElement: MapElement, geoElements: GeoElement[], options: any): L.FeatureGroup;
    constructor(geoLoader: GeoLoader, geoElement: MapElement, options: {});
    initialize(geoLoader: GeoLoader, geoElement: MapElement, options: {}): void;
    addGeoData(mapElement: MapElement, options: any): void;
}
