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
import { VisJsGeoProfileMap } from '../../services/visjs-geoprofilemap.plugin';
import { AbstractMapComponent } from '../abstract-map.component';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
var VisJsProfileMapComponent = /** @class */ (function (_super) {
    __extends(VisJsProfileMapComponent, _super);
    function VisJsProfileMapComponent(http) {
        return _super.call(this, http) || this;
    }
    VisJsProfileMapComponent.prototype.renderMap = function () {
        if (!this.initialized || !this.mapId) {
            return;
        }
        this.mapHeight = this.flgfullScreen ? window.innerHeight + 'px' : this.height;
        var dataSources = [];
        for (var i = 0; i < this.mapElements.length; i++) {
            var mapElement = this.mapElements[i];
            var trackSrc = mapElement.trackSrc;
            var trackUrl = mapElement.trackUrl;
            var point = mapElement.point;
            // specify options
            var loader = void 0;
            if ((trackSrc === undefined || trackSrc === null) && (trackUrl === undefined || trackUrl === null) && point !== undefined) {
                trackSrc = '{ "track": {' +
                    '"tId":"dummy",' +
                    '"tName":"' + mapElement.name.replace(/[^-a-zA-Z0-9+ .;,:]+/g, '') + '",' +
                    '"color":"Red",' +
                    '"colorIdx":"0",' +
                    '"type":"' + mapElement.type + '",' +
                    '"header":["lat","lon","ele"],' +
                    '"records":[[' + point.lat + ', ' + point.lng + ', ' + (point.alt ? point.alt : 0) + ']]}}';
                loader = this.jsonLoader;
            }
            else {
                loader = this.determineLoader(mapElement);
            }
            if (loader) {
                dataSources.push({ geoLoader: loader, url: trackUrl, src: trackSrc });
            }
            else {
                console.error('no loader for mapElement:', mapElement.id, mapElement, trackUrl, trackSrc, this.gpxLoader.isResponsibleForSrc(trackSrc));
            }
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
            var mapProfileObj = new VisJsGeoProfileMap(dataSources, container, options); // NOSONAR do not remove !!!
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VisJsProfileMapComponent.prototype, "flgGenerateNameFromGpx", void 0);
    VisJsProfileMapComponent = __decorate([
        Component({
            selector: 'app-visjs-profilemap',
            templateUrl: './visjs-profilemap.component.html',
            styleUrls: ['./visjs-profilemap.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [MinimalHttpBackendClient])
    ], VisJsProfileMapComponent);
    return VisJsProfileMapComponent;
}(AbstractMapComponent));
export { VisJsProfileMapComponent };
//# sourceMappingURL=visjs-profilemap.component.js.map