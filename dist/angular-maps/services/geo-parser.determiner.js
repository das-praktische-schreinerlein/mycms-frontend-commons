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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GeoGpxParser } from './geogpx.parser';
import { GeoJsonParser } from './geojson.parser';
import { GeoTxtParser } from './geotxt.parser';
import { Injectable } from '@angular/core';
import { AbstractGeoParserDeterminer } from '@dps/mycms-commons/dist/geo-commons/services/geo-parser.determiner';
var GeoParserDeterminer = /** @class */ (function (_super) {
    __extends(GeoParserDeterminer, _super);
    function GeoParserDeterminer(gpxParser, jsonParser, txtParser) {
        var _this = _super.call(this, gpxParser, jsonParser, txtParser) || this;
        _this.gpxParser = gpxParser;
        _this.jsonParser = jsonParser;
        _this.txtParser = txtParser;
        return _this;
    }
    GeoParserDeterminer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GeoGpxParser,
            GeoJsonParser,
            GeoTxtParser])
    ], GeoParserDeterminer);
    return GeoParserDeterminer;
}(AbstractGeoParserDeterminer));
export { GeoParserDeterminer };
//# sourceMappingURL=geo-parser.determiner.js.map