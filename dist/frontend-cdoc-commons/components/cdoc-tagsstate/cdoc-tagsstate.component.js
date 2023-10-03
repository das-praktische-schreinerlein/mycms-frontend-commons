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
import { CommonDocContentUtils, KeywordsState } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocTagsStateComponent = /** @class */ (function (_super) {
    __extends(CommonDocTagsStateComponent, _super);
    function CommonDocTagsStateComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.contentUtils = contentUtils;
        _this.cd = cd;
        _this.tagsKats = [];
        _this.KeywordState = KeywordsState;
        _this.suggestions = [];
        _this.tagsEnvironment = {};
        _this.possiblePrefixes = [];
        _this.prefix = '';
        _this.unsetTag = new EventEmitter();
        _this.setTag = new EventEmitter();
        _this.tagsFound = new EventEmitter();
        return _this;
    }
    CommonDocTagsStateComponent.prototype.doSetTag = function (keyword) {
        this.setTag.emit(this.prefix + keyword);
    };
    CommonDocTagsStateComponent.prototype.doUnsetTag = function (keyword) {
        this.unsetTag.emit(this.prefix + keyword);
    };
    CommonDocTagsStateComponent.prototype.updateData = function () {
        this.tagsKats = this.contentUtils.getStructuredKeywordsState(this.tagsConfig, this.tags === undefined || this.tags === null ? [] : this.tags.split(', '), this.suggestions ? this.suggestions : [], this.possiblePrefixes, this.tagsEnvironment);
        this.tagsFound.emit(this.tagsKats);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocTagsStateComponent.prototype, "tags", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsStateComponent.prototype, "suggestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocTagsStateComponent.prototype, "tagsConfig", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsStateComponent.prototype, "tagsEnvironment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsStateComponent.prototype, "possiblePrefixes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagsStateComponent.prototype, "prefix", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "unsetTag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "setTag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTagsStateComponent.prototype, "tagsFound", void 0);
    CommonDocTagsStateComponent = __decorate([
        Component({
            selector: 'app-cdoc-tagsstate',
            templateUrl: './cdoc-tagsstate.component.html',
            styleUrls: ['./cdoc-tagsstate.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [CommonDocContentUtils, ChangeDetectorRef])
    ], CommonDocTagsStateComponent);
    return CommonDocTagsStateComponent;
}(AbstractInlineComponent));
export { CommonDocTagsStateComponent };
//# sourceMappingURL=cdoc-tagsstate.component.js.map