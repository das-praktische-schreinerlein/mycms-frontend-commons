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
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var CommonDocODObjectDetailsComponent = /** @class */ (function (_super) {
    __extends(CommonDocODObjectDetailsComponent, _super);
    function CommonDocODObjectDetailsComponent(appService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.cd = cd;
        _this.showKeyColumn = false;
        _this.defaultShowKeyAsTooltip = false;
        _this.defaultFilterForNameToShowNameAndKey = [];
        _this.showKeyAsTooltip = undefined;
        _this.filterForNameToShowNameAndKey = undefined;
        return _this;
    }
    CommonDocODObjectDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === generic_app_service_1.AppState.Ready) {
                _this.config = _this.appService.getAppConfig();
                _this.configureComponent(_this.config);
                _this.updateData();
            }
        });
    };
    CommonDocODObjectDetailsComponent.prototype.getComponentConfig = function (config) {
        return {
            defaultShowKeyAsTooltip: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-odobjectdetails.defaultShowKeyAsTooltip') || false,
            defaultFilterForNameToShowNameAndKey: bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-odobjectdetails.defaultFilterForNameToShowNameAndKey') || []
        };
    };
    CommonDocODObjectDetailsComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.defaultShowKeyAsTooltip = componentConfig.defaultShowKeyAsTooltip;
        this.defaultFilterForNameToShowNameAndKey = componentConfig.defaultFilterForNameToShowNameAndKey;
    };
    CommonDocODObjectDetailsComponent.prototype.checkShowName = function (object) {
        if (!this.defaultFilterForNameToShowNameAndKey || !object.key || !object.name) {
            return false;
        }
        for (var _i = 0, _a = this.defaultFilterForNameToShowNameAndKey; _i < _a.length; _i++) {
            var pattern = _a[_i];
            if (object.name.startsWith(pattern)) {
                return true;
            }
            if (object.name.match(new RegExp(pattern))) {
                return true;
            }
        }
        return false;
    };
    CommonDocODObjectDetailsComponent.prototype.updateData = function () {
        this.showKeyColumn = false;
        if (this.objects) {
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                if (this.checkShowName(object)) {
                    this.showKeyColumn = true;
                    break;
                }
            }
        }
        this.cd.markForCheck();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocODObjectDetailsComponent.prototype, "objects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommonDocODObjectDetailsComponent.prototype, "showKeyAsTooltip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocODObjectDetailsComponent.prototype, "filterForNameToShowNameAndKey", void 0);
    CommonDocODObjectDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-odobjectdetails',
            templateUrl: './cdoc-odobjectdetails.component.html',
            styleUrls: ['./cdoc-odobjectdetails.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, core_1.ChangeDetectorRef])
    ], CommonDocODObjectDetailsComponent);
    return CommonDocODObjectDetailsComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocODObjectDetailsComponent = CommonDocODObjectDetailsComponent;
//# sourceMappingURL=cdoc-odobjectdetails.component.js.map