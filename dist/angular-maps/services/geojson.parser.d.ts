import { LatLng } from 'leaflet';
import { GeoElement, GeoElementType, GeoParser } from './geo.parser';
import { AbstractGeoJsonParser } from '@dps/mycms-commons/dist/geo-commons/services/geojson.parser';
export declare class GeoJsonParser extends AbstractGeoJsonParser<LatLng> implements GeoParser {
    protected createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng;
    protected createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement;
}
