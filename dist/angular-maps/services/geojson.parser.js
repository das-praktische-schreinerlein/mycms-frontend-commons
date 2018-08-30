"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var L = require("leaflet");
var geo_parser_1 = require("./geo.parser");
var date_utils_1 = require("@dps/mycms-commons/dist/commons/utils/date.utils");
var GeoJsonParser = /** @class */ (function (_super) {
    __extends(GeoJsonParser, _super);
    function GeoJsonParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoJsonParser.prototype.parse = function (json, options) {
        var obj = JSON.parse(json);
        var elements = this._parseJsonObj(obj, options);
        if (!elements) {
            return;
        }
        return elements;
    };
    GeoJsonParser.prototype._parseJsonObj = function (obj, options) {
        var j;
        var coords = [];
        for (j = 0; j < obj['track']['records'].length; j++) {
            var record = obj['track']['records'][j];
            if (record.length > 2) {
                coords.push(new geo_parser_1.LatLngTime(record[0], record[1], record[2], date_utils_1.DateUtils.parseDate(record[3])));
            }
            else {
                coords.push(new L.LatLng(record[0], record[1], record[2]));
            }
        }
        return [new geo_parser_1.GeoElement(geo_parser_1.GeoElementType.TRACK, coords, obj['track']['tName'])];
    };
    return GeoJsonParser;
}(geo_parser_1.GeoParser));
exports.GeoJsonParser = GeoJsonParser;
//# sourceMappingURL=geojson.parser.js.map