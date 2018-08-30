import * as L from 'leaflet';
import LatLng = L.LatLng;
export declare enum GeoElementType {
    TRACK = 0,
    ROUTE = 1,
    WAYPOINT = 2,
}
export declare class LatLngTime extends LatLng {
    time: Date;
    constructor(latitude: number, longitude: number, altitude: number, time: Date);
}
export declare class GeoElement {
    type: GeoElementType;
    points: LatLng[];
    name: string;
    constructor(type: GeoElementType, points: L.LatLng[], name: string);
}
export declare abstract class GeoParser {
    abstract parse(src: string, options: any): GeoElement[];
    _humanLen(l: any): string;
    _polylineLen(ll: LatLng[]): number;
}
