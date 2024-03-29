var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AbstractGeoJsonParser } from '@dps/mycms-commons/dist/geo-commons/services/geojson.parser';
import { GeoUtils } from './geo.utils';
var GeoJsonParser = /** @class */ (function (_super) {
    __extends(GeoJsonParser, _super);
    function GeoJsonParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoJsonParser.prototype.createLatLng = function (lat, lng, alt, time) {
        return GeoUtils.createLatLng(lat, lng, alt, time);
    };
    GeoJsonParser.prototype.createGeoElement = function (type, points, name) {
        return GeoUtils.createGeoElement(type, points, name);
    };
    GeoJsonParser.prototype.calcDistance = function (from, to) {
        return from.distanceTo(to);
    };
    return GeoJsonParser;
}(AbstractGeoJsonParser));
export { GeoJsonParser };
//# sourceMappingURL=geojson.parser.js.map