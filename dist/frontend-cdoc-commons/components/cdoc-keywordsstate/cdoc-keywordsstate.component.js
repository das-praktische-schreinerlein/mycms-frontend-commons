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
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
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
        _this.unsetKeyword = new core_1.EventEmitter();
        _this.setKeyword = new core_1.EventEmitter();
        _this.tagsFound = new core_1.EventEmitter();
        return _this;
    }
    CommonDocKeywordsStateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === generic_app_service_1.AppState.Ready) {
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
        if (bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords')) {
            return {
                keywordsConfig: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords'),
                possiblePrefixes: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.possiblePrefixes'),
                prefix: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.editPrefix') || ''
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
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocKeywordsStateComponent.prototype, "keywords", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocKeywordsStateComponent.prototype, "suggestions", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "unsetKeyword", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "setKeyword", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocKeywordsStateComponent.prototype, "tagsFound", void 0);
    CommonDocKeywordsStateComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-keywordsstate',
            templateUrl: './cdoc-keywordsstate.component.html',
            styleUrls: ['./cdoc-keywordsstate.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, core_1.ChangeDetectorRef])
    ], CommonDocKeywordsStateComponent);
    return CommonDocKeywordsStateComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocKeywordsStateComponent = CommonDocKeywordsStateComponent;
//# sourceMappingURL=cdoc-keywordsstate.component.js.map