import { LatLng } from 'leaflet';
import { GeoElementBase, GeoElementType, LatLngTimeBase } from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
import { AbstractGeoParser } from '@dps/mycms-commons/dist/geo-commons/services/geo.parser';
export { GeoElementType as GeoElementType };
export declare class LatLngTime extends LatLng implements LatLngTimeBase {
    time: Date;
    constructor(latitude: number, longitude: number, altitude: number, time: Date);
}
export declare class GeoElement implements GeoElementBase<LatLng> {
    type: GeoElementType;
    points: LatLng[];
    name: string;
    constructor(type: GeoElementType, points: LatLng[], name: string);
}
export interface GeoParser extends AbstractGeoParser<LatLng> {
}
