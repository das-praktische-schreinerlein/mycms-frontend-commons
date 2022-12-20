import { LatLng } from 'leaflet';
import { GeoElement, LatLngTime } from './geo.parser';
var GeoUtils = /** @class */ (function () {
    function GeoUtils() {
    }
    GeoUtils.createLatLng = function (lat, lng, alt, time) {
        return time !== undefined
            ? new LatLngTime(Number(lat), Number(lng), Number(alt), time)
            : alt !== undefined
                ? new LatLng(Number(lat), Number(lng), Number(alt))
                : new LatLng(Number(lat), Number(lng));
    };
    GeoUtils.createGeoElement = function (type, points, name) {
        return new GeoElement(type, points, name);
    };
    return GeoUtils;
}());
export { GeoUtils };
//# sourceMappingURL=geo.utils.js.map