var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input } from '@angular/core';
import { GeoLoader } from '../services/geo.loader';
import { GeoJsonParser } from '../services/geojson.parser';
import { GeoGpxParser } from '../services/geogpx.parser';
import { ComponentUtils } from '../../angular-commons/services/component.utils';
import { GeoTxtParser } from '../services/geotxt.parser';
var AbstractMapComponent = /** @class */ (function () {
    function AbstractMapComponent(http) {
        this.http = http;
        this.flgfullScreen = false;
        this.mapHeight = '';
        this.gpxLoader = new GeoLoader(http, new GeoGpxParser());
        this.jsonLoader = new GeoLoader(http, new GeoJsonParser());
        this.txtLoader = new GeoLoader(http, new GeoTxtParser());
    }
    AbstractMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.renderMap();
    };
    AbstractMapComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && ComponentUtils.hasNgChanged(changes)) {
            this.renderMap();
        }
    };
    AbstractMapComponent.prototype.toggleFullScreen = function () {
        this.flgfullScreen = !this.flgfullScreen;
        this.renderMap();
    };
    AbstractMapComponent.prototype.determineLoader = function (mapElement) {
        var trackSrc = mapElement.trackSrc;
        var trackUrl = mapElement.trackUrl;
        var point = mapElement.point;
        if ((trackSrc === undefined || trackSrc === null) &&
            (trackUrl === undefined || trackUrl === null) &&
            point !== undefined) {
            return this.jsonLoader;
        }
        else if (this.gpxLoader.isResponsibleForFile(trackUrl)
            || this.gpxLoader.isResponsibleForSrc(trackSrc)) {
            return this.gpxLoader;
        }
        else if (this.jsonLoader.isResponsibleForFile(trackUrl)
            || this.jsonLoader.isResponsibleForSrc(trackSrc)) {
            return this.jsonLoader;
        }
        else if (this.txtLoader.isResponsibleForFile(trackUrl)
            || this.txtLoader.isResponsibleForSrc(trackSrc)) {
            return this.txtLoader;
        }
        else {
            console.error('no loader for id/mapElement/url/src:', mapElement.id, mapElement, trackUrl, trackSrc);
        }
        return undefined;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractMapComponent.prototype, "mapId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractMapComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AbstractMapComponent.prototype, "mapElements", void 0);
    return AbstractMapComponent;
}());
export { AbstractMapComponent };
//# sourceMappingURL=abstract-map.component.js.map