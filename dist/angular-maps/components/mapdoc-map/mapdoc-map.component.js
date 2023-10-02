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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlatformService } from '../../../angular-commons/services/platform.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
import { LatLng } from 'leaflet';
import { MapContentUtils } from '../../services/map-contentutils.service';
import { TrackColors } from '@dps/mycms-commons/dist/geo-commons/model/track-colors';
var MapDocMapComponent = /** @class */ (function (_super) {
    __extends(MapDocMapComponent, _super);
    function MapDocMapComponent(contentUtils, cd, platformService) {
        var _this = _super.call(this, cd) || this;
        _this.contentUtils = contentUtils;
        _this.cd = cd;
        _this.platformService = platformService;
        _this.showLoadingSpinner = false;
        _this.mapElements = [];
        _this.centerOnMapElements = undefined;
        _this.mapElementsReverseMap = new Map();
        _this.showImageTrackAndGeoPos = false;
        _this.editable = false;
        _this.mapCreated = new EventEmitter();
        _this.centerChanged = new EventEmitter();
        _this.docClicked = new EventEmitter();
        _this.mapElementsFound = new EventEmitter();
        return _this;
    }
    MapDocMapComponent.prototype.onTrackClicked = function (mapElement) {
        this.docClicked.emit(this.mapElementsReverseMap.get(mapElement));
    };
    MapDocMapComponent.prototype.onMapElementsLoaded = function (mapElements) {
        this.showLoadingSpinner = false;
        this.cd.detectChanges();
    };
    MapDocMapComponent.prototype.onMapCreated = function (map) {
        this.mapCreated.emit(map);
    };
    MapDocMapComponent.prototype.renderMap = function () {
        this.mapElementsReverseMap.clear();
        this.centerOnMapElements = undefined;
        if (!this.docRecords) {
            this.mapElements = [];
            this.showLoadingSpinner = false;
            return;
        }
        this.showLoadingSpinner = (this.docRecords.length > 0);
        for (var i = 0; i < this.docRecords.length; i++) {
            var record = this.docRecords[i];
            for (var _i = 0, _a = this.contentUtils.createMapElementForDocRecord(record, StringUtils.calcCharCodeForListIndex(i + 1), this.showImageTrackAndGeoPos, this.trackColors); _i < _a.length; _i++) {
                var mapElement = _a[_i];
                if (record.id === this.currentDocId) {
                    mapElement.color = 'red';
                    this.centerOnMapElements = [mapElement];
                }
                this.mapElementsReverseMap.set(mapElement, record);
            }
        }
        this.mapElements = Array.from(this.mapElementsReverseMap.keys());
        this.mapElementsFound.emit(this.mapElements);
        this.cd.markForCheck();
    };
    MapDocMapComponent.prototype.updateData = function () {
        if (this.platformService.isClient()) {
            this.renderMap();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapDocMapComponent.prototype, "mapId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapDocMapComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MapDocMapComponent.prototype, "docRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapDocMapComponent.prototype, "currentDocId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", LatLng)
    ], MapDocMapComponent.prototype, "mapCenterPos", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MapDocMapComponent.prototype, "mapZoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MapDocMapComponent.prototype, "showImageTrackAndGeoPos", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TrackColors)
    ], MapDocMapComponent.prototype, "trackColors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MapDocMapComponent.prototype, "editable", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MapDocMapComponent.prototype, "mapCreated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MapDocMapComponent.prototype, "centerChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MapDocMapComponent.prototype, "docClicked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MapDocMapComponent.prototype, "mapElementsFound", void 0);
    MapDocMapComponent = __decorate([
        Component({
            selector: 'app-mapdoc-map',
            templateUrl: './mapdoc-map.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [MapContentUtils, ChangeDetectorRef,
            PlatformService])
    ], MapDocMapComponent);
    return MapDocMapComponent;
}(AbstractInlineComponent));
export { MapDocMapComponent };
//# sourceMappingURL=mapdoc-map.component.js.map