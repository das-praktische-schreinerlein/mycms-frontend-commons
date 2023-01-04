var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AbstractGeoTxtParser } from '@dps/mycms-commons/dist/geo-commons/services/geotxt.parser';
import { GeoUtils } from './geo.utils';
var GeoTxtParser = /** @class */ (function (_super) {
    __extends(GeoTxtParser, _super);
    function GeoTxtParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoTxtParser.prototype.createLatLng = function (lat, lng, alt, time) {
        return GeoUtils.createLatLng(lat, lng, alt, time);
    };
    GeoTxtParser.prototype.createGeoElement = function (type, points, name) {
        return GeoUtils.createGeoElement(type, points, name);
    };
    GeoTxtParser.prototype.calcDistance = function (from, to) {
        return from.distanceTo(to);
    };
    return GeoTxtParser;
}(AbstractGeoTxtParser));
export { GeoTxtParser };
//# sourceMappingURL=geotxt.parser.js.map