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
var cdoc_contentutils_service_1 = require("../../services/cdoc-contentutils.service");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocVideoplayerComponent = /** @class */ (function (_super) {
    __extends(CommonDocVideoplayerComponent, _super);
    function CommonDocVideoplayerComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
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
        _this.maxWidth = 600;
        _this.maxHeight = 800;
        _this.maxFullWidth = 1200;
        _this.maxFullHeight = 1200;
        _this.forceWidth = '';
        _this.showFullScreenVideo = false;
        _this.showPreview = true;
        _this.show = new core_1.EventEmitter();
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocVideoplayerComponent.prototype.submitShow = function (cdoc) {
        this.show.emit(cdoc);
        return false;
    };
    CommonDocVideoplayerComponent.prototype.updateData = function () {
        if (window) {
            this.maxWidth = Math.min(600, window.innerWidth - 100);
            this.maxHeight = Math.min(800, window.innerHeight - 80);
            this.maxFullWidth = Math.min(1200, window.innerWidth - 50);
            this.maxFullHeight = Math.min(1200, window.innerHeight - 80);
        }
        this.contentUtils.updateItemData(this.listItem, this.record, 'default');
        this.cd.markForCheck();
    };
    __decorate([
        core_1.ViewChild('videoPlayer'),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "videoplayer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_entity_record_1.CommonDocRecord)
    ], CommonDocVideoplayerComponent.prototype, "record", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocVideoplayerComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "forceWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocVideoplayerComponent.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "showFullScreenVideo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "showPreview", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocVideoplayerComponent.prototype, "show", void 0);
    CommonDocVideoplayerComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-videoplayer',
            templateUrl: './cdoc-videoplayer.component.html',
            styleUrls: ['./cdoc-videoplayer.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [cdoc_contentutils_service_1.CommonDocContentUtils, core_1.ChangeDetectorRef])
    ], CommonDocVideoplayerComponent);
    return CommonDocVideoplayerComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocVideoplayerComponent = CommonDocVideoplayerComponent;
//# sourceMappingURL=cdoc-videoplayer.component.js.map