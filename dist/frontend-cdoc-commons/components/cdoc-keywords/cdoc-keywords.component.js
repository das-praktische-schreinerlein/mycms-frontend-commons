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
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
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
            if (appState === AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
                _this.updateData();
            }
        });
    };
    CommonDocKeywordsComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords')) {
            return {
                keywordsConfig: BeanUtils.getValue(config, 'components.cdoc-keywords.structuredKeywords'),
                possiblePrefixes: BeanUtils.getValue(config, 'components.cdoc-keywords.possiblePrefixes'),
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
        Input(),
        __metadata("design:type", CommonDocRecord)
    ], CommonDocKeywordsComponent.prototype, "record", void 0);
    CommonDocKeywordsComponent = __decorate([
        Component({
            selector: 'app-cdoc-keywords',
            templateUrl: './cdoc-keywords.component.html',
            styleUrls: ['./cdoc-keywords.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, ChangeDetectorRef])
    ], CommonDocKeywordsComponent);
    return CommonDocKeywordsComponent;
}(AbstractInlineComponent));
export { CommonDocKeywordsComponent };
//# sourceMappingURL=cdoc-keywords.component.js.map