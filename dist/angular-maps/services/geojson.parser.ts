import {LatLng} from 'leaflet';
import {GeoElement, GeoElementType, GeoParser} from './geo.parser';
import {AbstractGeoJsonParser} from '@dps/mycms-commons/dist/geo-commons/services/geojson.parser';
import {GeoUtils} from './geo.utils';

export class GeoJsonParser extends AbstractGeoJsonParser<LatLng> implements GeoParser {
    protected createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng {
        return GeoUtils.createLatLng(lat, lng, alt, time);
    }

    protected createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement {
        return GeoUtils.createGeoElement(type, points, name);
    }

    protected calcDistance(from: LatLng, to: LatLng): number {
        return from.distanceTo(to);
    }
}
