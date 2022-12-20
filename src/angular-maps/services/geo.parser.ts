import {LatLng} from 'leaflet';
import {
    GeoElementBase,
    GeoElementType,
    LatLngTimeBase
} from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
import {AbstractGeoParser} from '@dps/mycms-commons/dist/geo-commons/services/geo.parser';

export { GeoElementType as GeoElementType };

export class LatLngTime extends LatLng implements LatLngTimeBase {
    time: Date;
    constructor(latitude: number, longitude: number, altitude: number, time: Date) {
        super(latitude, longitude, altitude);
        this.time = time;
    }
}

export class GeoElement implements GeoElementBase<LatLng> {
    type: GeoElementType;
    points: LatLng[] = [];
    name: string;

    constructor(type: GeoElementType, points: LatLng[], name: string) {
        this.type = type;
        this.points = points;
        this.name = name;
    }
}

export interface GeoParser extends AbstractGeoParser<LatLng> {
}
