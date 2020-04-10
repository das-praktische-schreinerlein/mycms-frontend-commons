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
var common_routing_service_1 = require("../../../angular-commons/services/common-routing.service");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var string_utils_1 = require("@dps/mycms-commons/dist/commons/utils/string.utils");
var CommonDocObjectNavigationComponent = /** @class */ (function (_super) {
    __extends(CommonDocObjectNavigationComponent, _super);
    function CommonDocObjectNavigationComponent(commonRoutingService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.commonRoutingService = commonRoutingService;
        _this.baseSearchUrl = 'cdoc/';
        return _this;
    }
    CommonDocObjectNavigationComponent.prototype.updateData = function () {
    };
    CommonDocObjectNavigationComponent.prototype.getNavigationObjectRecordUrl = function (navRecord) {
        var name = string_utils_1.StringUtils.generateTechnicalName(navRecord.name ? navRecord.name : 'name');
        return this.baseSearchUrl + 'show/' + name + '/' + navRecord.navid;
    };
    CommonDocObjectNavigationComponent.prototype.navigateToRecord = function (navRecord) {
        this.commonRoutingService.navigateByUrl(this.getNavigationObjectRecordUrl(navRecord));
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocObjectNavigationComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocObjectNavigationComponent.prototype, "navigationobjects", void 0);
    CommonDocObjectNavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-object-navigation',
            templateUrl: './cdoc-object-navigation.component.html',
            styleUrls: ['./cdoc-object-navigation.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [common_routing_service_1.CommonRoutingService, core_1.ChangeDetectorRef])
    ], CommonDocObjectNavigationComponent);
    return CommonDocObjectNavigationComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocObjectNavigationComponent = CommonDocObjectNavigationComponent;
//# sourceMappingURL=cdoc-object-navigation.component.js.map