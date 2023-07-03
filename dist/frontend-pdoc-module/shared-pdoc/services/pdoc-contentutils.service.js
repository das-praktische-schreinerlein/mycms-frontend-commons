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
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocRoutingService } from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import { CommonDocContentUtils } from '../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
var PDocContentUtils = /** @class */ (function (_super) {
    __extends(PDocContentUtils, _super);
    function PDocContentUtils(sanitizer, cdocRoutingService, appService) {
        return _super.call(this, sanitizer, cdocRoutingService, appService) || this;
    }
    PDocContentUtils.prototype.getStyleClassForRecord = function (record, layout) {
        var value = record['pdocratepers'] || { gesamt: 0 };
        var rate = Math.round(((value['gesamt'] || 0) / 3) + 0.5);
        return ['list-item-persrate-' + rate, 'list-item-' + layout + '-persrate-' + rate];
    };
    PDocContentUtils.prototype.getPDocSubItemFiltersForType = function (record, type, theme, minPerPage) {
        var filters = {
            type: type
        };
        filters['sort'] = 'ratePers';
        if (type === 'ALL_ENTRIES') {
            filters['type'] = 'PAGE';
        }
        if (record.type === 'PAGE') {
            if (type === 'PAGE') {
                filters['moreFilter'] = 'page_id_i:' + record.pageId;
            }
            else {
                filters['moreFilter'] = 'page_id_i:' + record.pageId;
            }
        }
        if (minPerPage && minPerPage > 0 && minPerPage > filters['perPage']) {
            filters['perPage'] = minPerPage;
        }
        return filters;
    };
    PDocContentUtils.prototype.updateItemData = function (itemData, record, layout) {
        _super.prototype.updateItemData.call(this, itemData, record, layout);
        if (record === undefined) {
            return false;
        }
        itemData.styleClassFor = this.getStyleClassForRecord(itemData.currentRecord, layout);
    };
    PDocContentUtils.prototype.getServiceConfig = function () {
        return {
            cdocRecordRefIdField: undefined,
            cdocAudiosKey: undefined,
            cdocImagesKey: undefined,
            cdocVideosKey: undefined
        };
    };
    PDocContentUtils = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DomSanitizer, CommonDocRoutingService, GenericAppService])
    ], PDocContentUtils);
    return PDocContentUtils;
}(CommonDocContentUtils));
export { PDocContentUtils };
//# sourceMappingURL=pdoc-contentutils.service.js.map