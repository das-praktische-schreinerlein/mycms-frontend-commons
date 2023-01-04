/**
 * inspired by leaflet-plugins
 */
import { GeoLoader } from './geo.loader';
import { GeoElement } from './geo.parser';
import { DivIcon, FeatureGroup, Icon, LatLng, Layer } from 'leaflet';
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
    point?: LatLng;
    type?: string;
    title?: string;
    iconStart?: DivIcon;
    iconPolylineEditor?: Icon;
    iconEnd?: DivIcon;
    featureLayer?: Layer;
}
export declare class GeoParsedFeature extends FeatureGroup {
    options: any;
    _layers: {};
    geoLoader: GeoLoader;
    static convertGeoElementsToLayers(gpxElement: MapElement, geoElements: GeoElement[], options: any): FeatureGroup;
    constructor(geoLoader: GeoLoader, geoElement: MapElement, options: {});
    initialize(geoLoader: GeoLoader, geoElement: MapElement, options: {}): void;
    addGeoData(mapElement: MapElement, options: any): void;
}
