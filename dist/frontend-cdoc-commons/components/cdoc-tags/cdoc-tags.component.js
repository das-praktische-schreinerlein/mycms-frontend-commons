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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonDocContentUtils } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
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
        Input(),
        __metadata("design:type", String)
    ], CommonDocTagsComponent.prototype, "tags", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsComponent.prototype, "tagsConfig", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsComponent.prototype, "possiblePrefixes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsComponent.prototype, "blacklist", void 0);
    CommonDocTagsComponent = __decorate([
        Component({
            selector: 'app-cdoc-tags',
            templateUrl: './cdoc-tags.component.html',
            styleUrls: ['./cdoc-tags.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [CommonDocContentUtils, ChangeDetectorRef])
    ], CommonDocTagsComponent);
    return CommonDocTagsComponent;
}(AbstractInlineComponent));
export { CommonDocTagsComponent };
//# sourceMappingURL=cdoc-tags.component.js.map