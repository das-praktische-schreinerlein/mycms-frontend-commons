import { LatLng } from 'leaflet';
import { GeoElement, GeoElementType } from './geo.parser';
export declare class GeoUtils {
    static getLocalDateTimeForLatLng(pos: LatLng): Date;
    static createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng;
    static createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement;
}
