"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var cdoc_contentutils_service_1 = require("../../services/cdoc-contentutils.service");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var cdoc_multiaction_manager_1 = require("../../services/cdoc-multiaction.manager");
var CommonDocListItemComponent = /** @class */ (function (_super) {
    __extends(CommonDocListItemComponent, _super);
    function CommonDocListItemComponent(contentUtils, cd, layoutService) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.layoutService = layoutService;
        _this.listLayoutName = 'default';
        _this.listItem = {
            currentRecord: undefined,
            styleClassFor: undefined,
            thumbnailUrl: undefined,
            previewUrl: undefined,
            fullUrl: undefined,
            image: undefined,
            video: undefined,
            urlShow: undefined
        };
        _this.LayoutSize = layout_service_1.LayoutSize;
        _this.layoutSize = layout_service_1.LayoutSize.BIG;
        _this.short = false;
        _this.show = new core_1.EventEmitter();
        _this.showImage = new core_1.EventEmitter();
        _this.contentUtils = contentUtils;
        _this.layoutSizeObservable = _this.layoutService.getLayoutSizeData();
        _this.layoutSizeObservable.subscribe(function (layoutSizeData) {
            _this.layoutSize = layoutSizeData.layoutSize;
            _this.cd.markForCheck();
        });
        return _this;
    }
    CommonDocListItemComponent.prototype.ngOnDestroy = function () {
        // this.layoutSizeObservable.unsubscribe();
    };
    CommonDocListItemComponent.prototype.submitShow = function (cdoc) {
        this.show.emit(cdoc);
        return false;
    };
    CommonDocListItemComponent.prototype.submitShowImage = function (cdoc) {
        this.showImage.emit(cdoc);
        return false;
    };
    CommonDocListItemComponent.prototype.onActionTagEvent = function (event) {
        if (event.result !== undefined) {
            this.record = event.result;
            this.multiActionManager.removeRecordFromMultiActionTag(this.record);
            this.updateData();
        }
        return false;
    };
    CommonDocListItemComponent.prototype.isMultiActionTagSelected = function () {
        return this.multiActionManager && this.multiActionManager.getSelectedMultiActionTags().length > 0;
    };
    CommonDocListItemComponent.prototype.isMultiActionAvailableForRecord = function () {
        return this.multiActionManager &&
            !this.multiActionManager.isMultiActionTagAvailableForRecord(this.listItem.currentRecord);
    };
    CommonDocListItemComponent.prototype.isMultiActionSelectedForRecord = function () {
        return this.multiActionManager && this.multiActionManager.isRecordOnMultiActionTag(this.listItem.currentRecord);
    };
    CommonDocListItemComponent.prototype.onChangeMultiActionForRecord = function (event) {
        if (this.multiActionManager) {
            event.target.checked ?
                this.multiActionManager.appendRecordToMultiActionTag(this.listItem.currentRecord)
                : this.multiActionManager.removeRecordFromMultiActionTag(this.listItem.currentRecord);
        }
        return true;
    };
    CommonDocListItemComponent.prototype.updateData = function () {
        var _this = this;
        this.contentUtils.updateItemData(this.listItem, this.record, this.listLayoutName);
        if (this.multiActionManager) {
            this.multiActionManager.getSelectedMultiActionTagsObservable().subscribe(function (value) {
                _this.cd.markForCheck();
            });
        }
        this.cd.markForCheck();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_entity_record_1.CommonDocRecord)
    ], CommonDocListItemComponent.prototype, "record", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", void 0)
    ], CommonDocListItemComponent.prototype, "rowNr", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", void 0)
    ], CommonDocListItemComponent.prototype, "idx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocListItemComponent.prototype, "backToSearchUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocListItemComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocListItemComponent.prototype, "short", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_multiaction_manager_1.CommonDocMultiActionManager)
    ], CommonDocListItemComponent.prototype, "multiActionManager", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListItemComponent.prototype, "show", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListItemComponent.prototype, "showImage", void 0);
    CommonDocListItemComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-list-item',
            templateUrl: './cdoc-list-item.component.html',
            styleUrls: ['./cdoc-list-item.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [cdoc_contentutils_service_1.CommonDocContentUtils, core_1.ChangeDetectorRef,
            layout_service_1.LayoutService])
    ], CommonDocListItemComponent);
    return CommonDocListItemComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocListItemComponent = CommonDocListItemComponent;
//# sourceMappingURL=cdoc-list-item.component.js.map