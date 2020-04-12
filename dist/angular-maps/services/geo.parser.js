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
import * as L from 'leaflet';
var LatLng = L.LatLng;
export var GeoElementType;
(function (GeoElementType) {
    GeoElementType[GeoElementType["TRACK"] = 0] = "TRACK";
    GeoElementType[GeoElementType["ROUTE"] = 1] = "ROUTE";
    GeoElementType[GeoElementType["WAYPOINT"] = 2] = "WAYPOINT";
    GeoElementType[GeoElementType["AREA"] = 3] = "AREA";
})(GeoElementType || (GeoElementType = {}));
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
var GeoParser = /** @class */ (function () {
    function GeoParser() {
    }
    GeoParser.prototype._humanLen = function (l) {
        if (l < 2000) {
            return l.toFixed(0) + ' m';
        }
        else {
            return (l / 1000).toFixed(1) + ' km';
        }
    };
    GeoParser.prototype._polylineLen = function (ll) {
        var d = 0, p = null;
        for (var i = 0; i < ll.length; i++) {
            if (i && p) {
                d += p.distanceTo(ll[i]);
            }
            p = ll[i];
        }
        return d;
    };
    return GeoParser;
}());
export { GeoParser };
//# sourceMappingURL=geo.parser.js.map