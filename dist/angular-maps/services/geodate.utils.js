import * as tzlookup from 'tz-lookup/tz';
var GeoDateUtils = /** @class */ (function () {
    function GeoDateUtils() {
    }
    GeoDateUtils.getLocalDateTimeForLatLng = function (pos) {
        if (!pos || !pos['time']) {
            return undefined;
        }
        var timezone = tzlookup(pos.lat, pos.lng);
        if (!timezone) {
            return pos['time'];
        }
        var dateString = pos['time'].toLocaleString('en-US', { timeZone: timezone });
        return new Date(dateString);
    };
    return GeoDateUtils;
}());
export { GeoDateUtils };
//# sourceMappingURL=geodate.utils.js.map