"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geo_loader_1 = require("../../services/geo.loader");
var geojson_parser_1 = require("../../services/geojson.parser");
var geogpx_parser_1 = require("../../services/geogpx.parser");
var visjs_geoprofilemap_plugin_1 = require("../../services/visjs-geoprofilemap.plugin");
var component_utils_1 = require("../../../angular-commons/services/component.utils");
var minimal_http_backend_client_1 = require("@dps/mycms-commons/dist/commons/services/minimal-http-backend-client");
var VisJsProfileMapComponent = /** @class */ (function () {
    function VisJsProfileMapComponent(http) {
        this.http = http;
        this.flgfullScreen = false;
        this.mapHeight = '';
        this.gpxLoader = new geo_loader_1.GeoLoader(http, new geogpx_parser_1.GeoGpxParser());
        this.jsonLoader = new geo_loader_1.GeoLoader(http, new geojson_parser_1.GeoJsonParser());
    }
    VisJsProfileMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.renderMap();
    };
    VisJsProfileMapComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && component_utils_1.ComponentUtils.hasNgChanged(changes)) {
            this.renderMap();
        }
    };
    VisJsProfileMapComponent.prototype.toggleFullScreen = function () {
        this.flgfullScreen = !this.flgfullScreen;
        this.renderMap();
    };
    VisJsProfileMapComponent.prototype.renderMap = function () {
        if (!this.initialized || !this.mapId) {
            return;
        }
        this.mapHeight = this.flgfullScreen ? window.innerHeight + 'px' : this.height;
        var dataSources = [];
        for (var i = 0; i < this.mapElements.length; i++) {
            var trackSrc = this.mapElements[i].trackSrc;
            var trackUrl = this.mapElements[i].trackUrl;
            var point = this.mapElements[i].point;
            // specify options
            var loader = void 0;
            if ((trackSrc === undefined || trackSrc === null) && (trackUrl === undefined || trackUrl === null) && point !== undefined) {
                trackSrc = '{ "track": {' +
                    '"tId":"dummy",' +
                    '"tName":"' + this.mapElements[i].name.replace(/[^-a-zA-Z0-9+ .;,:]+/g, '') + '",' +
                    '"color":"Red",' +
                    '"colorIdx":"0",' +
                    '"type":"' + this.mapElements[i].type + '",' +
                    '"header":["lat","lon","ele"],' +
                    '"records":[[' + point.lat + ', ' + point.lng + ', ' + (point.alt ? point.alt : 0) + ']]}}';
                loader = this.jsonLoader;
            }
            else if ((trackUrl !== undefined && trackUrl.endsWith('.gpx'))
                || (trackSrc !== undefined && trackSrc !== null
                    && (trackSrc.indexOf('<trkpt') >= 0 || trackSrc.indexOf('<rpt') >= 0))) {
                loader = this.gpxLoader;
            }
            else {
                loader = this.jsonLoader;
            }
            dataSources.push({ geoLoader: loader, url: trackUrl, src: trackSrc });
        }
        if (dataSources.length > 0) {
            var options = {
                // generateName: this.flgGenerateNameFromGpx,
                width: '100%',
                height: this.mapHeight,
                style: 'bar-size',
                showPerspective: true,
                showGrid: true,
                showShadow: false,
                keepAspectRatio: true,
                verticalRatio: 0.2,
                xBarWidth: 0.004,
                yBarWidth: 0.004,
                xLabel: 'lat',
                yLabel: 'lon',
                zLabel: 'm',
                cameraPosition: {
                    horizontal: 1.0,
                    vertical: 0.5,
                    distance: 2
                },
                tooltip: function (data) {
                    return 'Hoehe:' + data.data.z;
                }
            };
            var container = document.getElementById(this.mapId);
            var mapProfileObj = new visjs_geoprofilemap_plugin_1.VisJsGeoProfileMap(dataSources, container, options);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VisJsProfileMapComponent.prototype, "mapId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VisJsProfileMapComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], VisJsProfileMapComponent.prototype, "mapElements", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VisJsProfileMapComponent.prototype, "flgGenerateNameFromGpx", void 0);
    VisJsProfileMapComponent = __decorate([
        core_1.Component({
            selector: 'app-visjs-profilemap',
            templateUrl: './visjs-profilemap.component.html',
            styleUrls: ['./visjs-profilemap.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [minimal_http_backend_client_1.MinimalHttpBackendClient])
    ], VisJsProfileMapComponent);
    return VisJsProfileMapComponent;
}());
exports.VisJsProfileMapComponent = VisJsProfileMapComponent;
//# sourceMappingURL=visjs-profilemap.component.js.map