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
import { LatLng } from 'leaflet';
import { GeoElementType } from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
export { GeoElementType as GeoElementType };
var LatLngTime = /** @class */ (function (_super) {
    __extends(LatLngTime, _super);
    function LatLngTime(latitude, longitude, altitude, time) {
        var _this = _super.call(this, latitude, longitude, altitude) || this;
        _this.time = time;
        return _this;
    }
    return LatLngTime;
}(LatLng));
export { LatLngTime };
var GeoElement = /** @class */ (function () {
    function GeoElement(type, points, name) {
        this.points = [];
        this.type = type;
        this.points = points;
        this.name = name;
    }
    return GeoElement;
}());
export { GeoElement };
//# sourceMappingURL=geo.parser.js.map