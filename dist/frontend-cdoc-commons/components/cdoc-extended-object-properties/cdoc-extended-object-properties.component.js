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
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var CommonDocExtendedObjectPropertiesComponent = /** @class */ (function (_super) {
    __extends(CommonDocExtendedObjectPropertiesComponent, _super);
    function CommonDocExtendedObjectPropertiesComponent(appService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.cd = cd;
        _this.allowedExtendedObjectProperties = {};
        _this.modes = {};
        _this.profile = '';
        _this.categories = [];
        return _this;
    }
    CommonDocExtendedObjectPropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
                _this.updateData();
            }
        });
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.cdoc-extended-object-properties')) {
            return {
                allowedExtendedObjectProperties: BeanUtils.getValue(config, 'components.cdoc-extended-object-properties.allowedExtendedObjectProperties'),
                modes: BeanUtils.getValue(config, 'components.cdoc-extended-object-properties.modes'),
            };
        }
        else {
            console.warn('no valid allowedExtendedObjectProperties found for components.cdoc-extended-object-properties');
            return {
                allowedExtendedObjectProperties: {},
                modes: {}
            };
        }
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.allowedExtendedObjectProperties = componentConfig.allowedExtendedObjectProperties;
        this.modes = componentConfig.modes;
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.updateData = function () {
        this.cd.markForCheck();
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.isVisible = function () {
        return this.modes[this.profile] && this.modes[this.profile] !== 'hidden';
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.isFlagVisible = function (property) {
        return property.value !== '0' &&
            this.categories !== undefined && this.categories.length > 0 && this.categories.includes(property.category) &&
            this.allowedExtendedObjectProperties[this.profile] &&
            this.allowedExtendedObjectProperties[this.profile].includes(property.name);
    };
    CommonDocExtendedObjectPropertiesComponent.prototype.isShortMode = function () {
        return this.modes[this.profile] && this.modes[this.profile] === 'short';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocExtendedObjectPropertiesComponent.prototype, "profile", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocExtendedObjectPropertiesComponent.prototype, "categories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocExtendedObjectPropertiesComponent.prototype, "extendedObjectProperties", void 0);
    CommonDocExtendedObjectPropertiesComponent = __decorate([
        Component({
            selector: 'app-cdoc-extended-object-properties',
            templateUrl: './cdoc-extended-object-properties.component.html',
            styleUrls: ['./cdoc-extended-object-properties.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, ChangeDetectorRef])
    ], CommonDocExtendedObjectPropertiesComponent);
    return CommonDocExtendedObjectPropertiesComponent;
}(AbstractInlineComponent));
export { CommonDocExtendedObjectPropertiesComponent };
//# sourceMappingURL=cdoc-extended-object-properties.component.js.map