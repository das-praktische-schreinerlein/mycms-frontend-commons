import {LatLng} from 'leaflet';
import * as tzlookup from 'tz-lookup/tz';
import {GeoElement, GeoElementType, LatLngTime} from './geo.parser';

export class GeoUtils  {
    public static getLocalDateTimeForLatLng(pos: LatLng): Date {
        if (!pos || !pos['time']) {
            return undefined;
        }

        const timezone = tzlookup(pos.lat, pos.lng);
        if (!timezone) {
            return pos['time'];
        }

        const dateString = pos['time'].toLocaleString('en-US', {timeZone: timezone});
        return new Date(dateString);
    }

    public static createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng {
        return time !== undefined
            ? new LatLngTime(Number(lat), Number(lng), Number(alt), time)
            : alt !== undefined
                ? new LatLng(Number(lat), Number(lng), Number(alt))
                : new LatLng(Number(lat), Number(lng));
    }

    public static createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement {
        return new GeoElement(type, points, name)
    }
}
