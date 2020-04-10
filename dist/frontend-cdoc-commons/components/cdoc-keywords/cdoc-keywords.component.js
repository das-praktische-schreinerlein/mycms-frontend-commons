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
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocKeywordsComponent = /** @class */ (function (_super) {
    __extends(CommonDocKeywordsComponent, _super);
    function CommonDocKeywordsComponent(appService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.cd = cd;
        _this.blacklist = [];
        _this.keywordsConfig = [];
        _this.possiblePrefixes = [];
        return _this;
    }
    CommonDocKeywordsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === generic_app_service_1.AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
                _this.updateData();
            }
        });
    };
    CommonDocKeywordsComponent.prototype.getComponentConfig = function (config) {
        if (bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords')) {
            return {
                keywordsConfig: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords'),
                possiblePrefixes: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.possiblePrefixes'),
                blacklist: []
            };
        }
        else {
            console.warn('no valid keywordsConfig found for components.cdoc-keywords.structuredKeywords');
            return {
                keywordsConfig: [],
                possiblePrefixes: [],
                blacklist: []
            };
        }
    };
    CommonDocKeywordsComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.blacklist = componentConfig.blacklist;
        this.keywordsConfig = componentConfig.keywordsConfig;
        this.possiblePrefixes = componentConfig.possiblePrefixes;
    };
    CommonDocKeywordsComponent.prototype.updateData = function () {
        this.cd.markForCheck();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_entity_record_1.CommonDocRecord)
    ], CommonDocKeywordsComponent.prototype, "record", void 0);
    CommonDocKeywordsComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-keywords',
            templateUrl: './cdoc-keywords.component.html',
            styleUrls: ['./cdoc-keywords.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, core_1.ChangeDetectorRef])
    ], CommonDocKeywordsComponent);
    return CommonDocKeywordsComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocKeywordsComponent = CommonDocKeywordsComponent;
//# sourceMappingURL=cdoc-keywords.component.js.map