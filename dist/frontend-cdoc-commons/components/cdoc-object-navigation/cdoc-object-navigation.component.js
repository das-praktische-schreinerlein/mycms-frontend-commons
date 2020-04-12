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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
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
        var name = StringUtils.generateTechnicalName(navRecord.name ? navRecord.name : 'name');
        return this.baseSearchUrl + 'show/' + name + '/' + navRecord.navid;
    };
    CommonDocObjectNavigationComponent.prototype.navigateToRecord = function (navRecord) {
        this.commonRoutingService.navigateByUrl(this.getNavigationObjectRecordUrl(navRecord));
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocObjectNavigationComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocObjectNavigationComponent.prototype, "navigationobjects", void 0);
    CommonDocObjectNavigationComponent = __decorate([
        Component({
            selector: 'app-cdoc-object-navigation',
            templateUrl: './cdoc-object-navigation.component.html',
            styleUrls: ['./cdoc-object-navigation.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [CommonRoutingService, ChangeDetectorRef])
    ], CommonDocObjectNavigationComponent);
    return CommonDocObjectNavigationComponent;
}(AbstractInlineComponent));
export { CommonDocObjectNavigationComponent };
//# sourceMappingURL=cdoc-object-navigation.component.js.map