"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var CommonDocTagsComponent = /** @class */ (function (_super) {
    __extends(CommonDocTagsComponent, _super);
    function CommonDocTagsComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.contentUtils = contentUtils;
        _this.cd = cd;
        _this.tagsKats = [];
        _this.possiblePrefixes = [];
        _this.blacklist = [];
        return _this;
    }
    CommonDocTagsComponent.prototype.updateData = function () {
        this.tagsKats = [];
        if (this.tags === undefined) {
            return;
        }
        this.tagsKats = this.contentUtils.getStructuredKeywords(this.tagsConfig, this.tags.split(', '), this.blacklist, this.possiblePrefixes);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocTagsComponent.prototype, "tags", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsComponent.prototype, "tagsConfig", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsComponent.prototype, "possiblePrefixes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsComponent.prototype, "blacklist", void 0);
    CommonDocTagsComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-tags',
            templateUrl: './cdoc-tags.component.html',
            styleUrls: ['./cdoc-tags.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [cdoc_contentutils_service_1.CommonDocContentUtils, core_1.ChangeDetectorRef])
    ], CommonDocTagsComponent);
    return CommonDocTagsComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocTagsComponent = CommonDocTagsComponent;
//# sourceMappingURL=cdoc-tags.component.js.map