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
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../angular-commons/services/platform.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
import { MapContentUtils } from '../../services/map-contentutils.service';
var MapDocProfileChartComponent = /** @class */ (function (_super) {
    __extends(MapDocProfileChartComponent, _super);
    function MapDocProfileChartComponent(cd, contentUtils, appService, platformService) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.contentUtils = contentUtils;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.chartElements = [];
        _this.showImageTrackAndGeoPos = false;
        _this.chartElementsFound = new EventEmitter();
        return _this;
    }
    MapDocProfileChartComponent.prototype.renderChart = function () {
        if (!this.docRecords) {
            this.chartElements = [];
            return;
        }
        var tmpList = [];
        for (var i = 0; i < this.docRecords.length; i++) {
            var record = this.docRecords[i];
            for (var _i = 0, _a = this.contentUtils.createChartElementForDocRecord(record, StringUtils.calcCharCodeForListIndex(i + 1), this.showImageTrackAndGeoPos); _i < _a.length; _i++) {
                var chartElement = _a[_i];
                tmpList.push(chartElement);
            }
        }
        this.chartElements = tmpList;
        this.chartElementsFound.emit(this.chartElements);
        this.cd.markForCheck();
    };
    MapDocProfileChartComponent.prototype.updateData = function () {
        if (this.platformService.isClient()) {
            this.renderChart();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapDocProfileChartComponent.prototype, "chartId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MapDocProfileChartComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MapDocProfileChartComponent.prototype, "docRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MapDocProfileChartComponent.prototype, "showImageTrackAndGeoPos", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MapDocProfileChartComponent.prototype, "chartElementsFound", void 0);
    MapDocProfileChartComponent = __decorate([
        Component({
            selector: 'app-mapdoc-profilechart',
            templateUrl: './mapdoc-profilechart.component.html',
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, MapContentUtils, GenericAppService,
            PlatformService])
    ], MapDocProfileChartComponent);
    return MapDocProfileChartComponent;
}(AbstractInlineComponent));
export { MapDocProfileChartComponent };
//# sourceMappingURL=mapdoc-profilechart.component.js.map