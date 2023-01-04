import { LatLng } from 'leaflet';
import { GeoElement, GeoElementType, GeoParser } from './geo.parser';
import { AbstractGeoTxtParser } from '@dps/mycms-commons/dist/geo-commons/services/geotxt.parser';
export declare class GeoTxtParser extends AbstractGeoTxtParser<LatLng> implements GeoParser {
    protected createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng;
    protected createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement;
    protected calcDistance(from: LatLng, to: LatLng): number;
}
