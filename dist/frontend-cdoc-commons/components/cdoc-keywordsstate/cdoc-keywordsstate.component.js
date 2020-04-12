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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocKeywordsStateComponent = /** @class */ (function (_super) {
    __extends(CommonDocKeywordsStateComponent, _super);
    function CommonDocKeywordsStateComponent(appService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.cd = cd;
        _this.possiblePrefixes = [];
        _this.keywordsConfig = [];
        _this.prefix = '';
        _this.suggestions = [];
        _this.unsetKeyword = new EventEmitter();
        _this.setKeyword = new EventEmitter();
        _this.tagsFound = new EventEmitter();
        return _this;
    }
    CommonDocKeywordsStateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
                _this.updateData();
            }
        });
    };
    CommonDocKeywordsStateComponent.prototype.doSetKeyword = function (keyword) {
        this.setKeyword.emit(keyword);
    };
    CommonDocKeywordsStateComponent.prototype.doUnsetKeyword = function (keyword) {
        this.unsetKeyword.emit(keyword);
    };
    CommonDocKeywordsStateComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords')) {
            return {
                keywordsConfig: BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords'),
                possiblePrefixes: BeanUtils.getValue(config, 'components.cdoc-keywords.possiblePrefixes'),
                prefix: BeanUtils.getValue(config, 'components.cdoc-keywords.editPrefix') || ''
            };
        }
        else {
            console.warn('no valid keywordsConfig found for components.cdoc-keywords.structuredKeywords');
            return {
                keywordsConfig: [],
                possiblePrefixes: [],
                prefix: ''
            };
        }
    };
    CommonDocKeywordsStateComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.prefix = componentConfig.prefix;
        this.keywordsConfig = componentConfig.keywordsConfig;
        this.possiblePrefixes = componentConfig.possiblePrefixes;
    };
    CommonDocKeywordsStateComponent.prototype.updateData = function () {
        this.cd.markForCheck();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocKeywordsStateComponent.prototype, "keywords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocKeywordsStateComponent.prototype, "suggestions", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "unsetKeyword", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "setKeyword", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "tagsFound", void 0);
    CommonDocKeywordsStateComponent = __decorate([
        Component({
            selector: 'app-cdoc-keywordsstate',
            templateUrl: './cdoc-keywordsstate.component.html',
            styleUrls: ['./cdoc-keywordsstate.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, ChangeDetectorRef])
    ], CommonDocKeywordsStateComponent);
    return CommonDocKeywordsStateComponent;
}(AbstractInlineComponent));
export { CommonDocKeywordsStateComponent };
//# sourceMappingURL=cdoc-keywordsstate.component.js.map