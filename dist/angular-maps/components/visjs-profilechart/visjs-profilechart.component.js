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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { AbstractMapComponent } from '../abstract-map.component';
import { VisJsGeoProfileMap, VisJsGeoProfileMapPoint } from '../../services/visjs-geoprofilemap.plugin';
import { DataSet } from 'vis/dist/vis-graph3d.min';
var VisJsProfileDistanceChart = /** @class */ (function (_super) {
    __extends(VisJsProfileDistanceChart, _super);
    function VisJsProfileDistanceChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisJsProfileDistanceChart.prototype.convertGeoElementsToDataSet = function (geoElements, element, options) {
        var data = new DataSet();
        if (!geoElements) {
            return data;
        }
        var counter = 0;
        var style = 0;
        var names = {};
        var nameCount = 1;
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            if (geoElement === undefined) {
                continue;
            }
            if (!names[geoElement.name]) {
                names[geoElement.name] = nameCount++;
            }
        }
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            if (geoElement === undefined) {
                continue;
            }
            var lastPoint = undefined;
            var dist = 0;
            for (var p = 0; p < geoElement.points.length; p++) {
                var point = geoElement.points[p];
                if (point.lat && point.lng && point.alt !== undefined) {
                    dist += lastPoint !== undefined
                        ? point.distanceTo(lastPoint)
                        : 0;
                    data.add(new VisJsGeoProfileMapPoint({
                        id: counter++,
                        x: names[geoElement.name],
                        y: dist / 1000,
                        z: point.alt,
                        style: style
                    }));
                    lastPoint = point;
                }
            }
            style = style + 1;
        }
        return data;
    };
    return VisJsProfileDistanceChart;
}(VisJsGeoProfileMap));
export { VisJsProfileDistanceChart };
var VisJsProfileTimeChart = /** @class */ (function (_super) {
    __extends(VisJsProfileTimeChart, _super);
    function VisJsProfileTimeChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisJsProfileTimeChart.prototype.convertGeoElementsToDataSet = function (geoElements, element, options) {
        var data = new DataSet();
        if (!geoElements) {
            return data;
        }
        var counter = 0;
        var style = 0;
        var names = {};
        var times = {};
        var nameCount = 1;
        var timeCount = 1;
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            var lastPoint = undefined;
            var dist = 0;
            for (var p = 0; p < geoElement.points.length; p++) {
                var point = geoElement.points[p];
                if (point.lat && point.lng && point.alt !== undefined) {
                    dist += lastPoint !== undefined
                        ? point.distanceTo(lastPoint)
                        : 0;
                    if (!names[geoElement.name]) {
                        names[geoElement.name] = nameCount++;
                    }
                    if (!times[point['time']]) {
                        times[point['time']] = timeCount++;
                    }
                    data.add(new VisJsGeoProfileMapPoint({
                        id: counter++,
                        x: names[geoElement.name],
                        y: times[point['time']],
                        z: point.alt,
                        style: style
                    }));
                    lastPoint = point;
                }
            }
            style = style + 1;
        }
        return data;
    };
    return VisJsProfileTimeChart;
}(VisJsGeoProfileMap));
export { VisJsProfileTimeChart };
var VisJsProfileChartComponent = /** @class */ (function (_super) {
    __extends(VisJsProfileChartComponent, _super);
    function VisJsProfileChartComponent(http) {
        var _this = _super.call(this, http) || this;
        _this.flagTimeChart = false;
        return _this;
    }
    VisJsProfileChartComponent.prototype.renderMap = function () {
        if (!this.initialized || !this.mapId) {
            return;
        }
        this.mapHeight = this.flgfullScreen ? window.innerHeight + 'px' : this.height;
        var dataSources = [];
        for (var i = 0; i < this.mapElements.length; i++) {
            var chartElement = this.mapElements[i];
            var trackSrc = chartElement.trackSrc;
            var trackUrl = chartElement.trackUrl;
            var point = chartElement.point;
            // specify options
            var loader = void 0;
            if ((trackSrc === undefined || trackSrc === null) &&
                (trackUrl === undefined || trackUrl === null) &&
                point !== undefined) {
                trackSrc = '{ "track": {' +
                    '"tId":"dummy",' +
                    '"tName":"' + chartElement.name.replace(/[^-a-zA-Z0-9+ .;,:]+/g, '') + '",' +
                    '"color":"Red",' +
                    '"colorIdx":"0",' +
                    '"type":"' + chartElement.type + '",' +
                    '"header":["lat","lon","ele","time"],' +
                    '"records":[[' + point.lat + ', ' + point.lng
                    + ', ' + (point.alt ? point.alt : 0)
                    + ', ' + (point['time'] ? '"' + point['time'] + '"' : 'null') + ']]}}';
                loader = this.jsonLoader;
            }
            else {
                loader = this.determineLoader(chartElement);
            }
            if (loader) {
                dataSources.push({ geoLoader: loader, url: trackUrl, src: trackSrc });
            }
            else {
                console.error('no loader for id/mapElement/url/src:', chartElement.id, chartElement, trackUrl, trackSrc);
            }
        }
        if (dataSources.length > 0) {
            var options = {
                generateName: this.flgGenerateNameFromGpx,
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
                xLabel: 'Tour',
                yLabel: 'km',
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
            // tslint:disable-next-line:no-unused-expression
            this.flagTimeChart // NOSONAR do not remove !!!
                ? new VisJsProfileTimeChart(dataSources, container, options)
                : new VisJsProfileDistanceChart(dataSources, container, options);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VisJsProfileChartComponent.prototype, "flgGenerateNameFromGpx", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VisJsProfileChartComponent.prototype, "flagTimeChart", void 0);
    VisJsProfileChartComponent = __decorate([
        Component({
            selector: 'app-visjs-profilechart',
            templateUrl: './visjs-profilechart.component.html',
            styleUrls: ['./visjs-profilechart.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [MinimalHttpBackendClient])
    ], VisJsProfileChartComponent);
    return VisJsProfileChartComponent;
}(AbstractMapComponent));
export { VisJsProfileChartComponent };
//# sourceMappingURL=visjs-profilechart.component.js.map