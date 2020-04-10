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
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocTagsStateComponent = /** @class */ (function (_super) {
    __extends(CommonDocTagsStateComponent, _super);
    function CommonDocTagsStateComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.contentUtils = contentUtils;
        _this.cd = cd;
        _this.tagsKats = [];
        _this.KeywordState = cdoc_contentutils_service_1.KeywordsState;
        _this.suggestions = [];
        _this.possiblePrefixes = [];
        _this.prefix = '';
        _this.unsetTag = new core_1.EventEmitter();
        _this.setTag = new core_1.EventEmitter();
        _this.tagsFound = new core_1.EventEmitter();
        return _this;
    }
    CommonDocTagsStateComponent.prototype.doSetTag = function (keyword) {
        this.setTag.emit(this.prefix + keyword);
    };
    CommonDocTagsStateComponent.prototype.doUnsetTag = function (keyword) {
        this.unsetTag.emit(this.prefix + keyword);
    };
    CommonDocTagsStateComponent.prototype.updateData = function () {
        this.tagsKats = this.contentUtils.getStructuredKeywordsState(this.tagsConfig, this.tags === undefined || this.tags === null ? [] : this.tags.split(', '), this.suggestions ? this.suggestions : [], this.possiblePrefixes);
        this.tagsFound.emit(this.tagsKats);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocTagsStateComponent.prototype, "tags", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsStateComponent.prototype, "suggestions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsStateComponent.prototype, "tagsConfig", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsStateComponent.prototype, "possiblePrefixes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsStateComponent.prototype, "prefix", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "unsetTag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "setTag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "tagsFound", void 0);
    CommonDocTagsStateComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-tagsstate',
            templateUrl: './cdoc-tagsstate.component.html',
            styleUrls: ['./cdoc-tagsstate.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [cdoc_contentutils_service_1.CommonDocContentUtils, core_1.ChangeDetectorRef])
    ], CommonDocTagsStateComponent);
    return CommonDocTagsStateComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocTagsStateComponent = CommonDocTagsStateComponent;
//# sourceMappingURL=cdoc-tagsstate.component.js.map