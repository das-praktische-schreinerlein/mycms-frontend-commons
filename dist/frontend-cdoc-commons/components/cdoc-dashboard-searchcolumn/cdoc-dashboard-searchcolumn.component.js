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
import { Input } from '@angular/core';
import { CommonDocInlineSearchpageComponent } from '../../../frontend-cdoc-commons/components/cdoc-inline-searchpage/cdoc-inline-searchpage.component';
import { CommonDocMultiActionManager } from '../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
var CommonDocDashboardSearchColumnComponent = /** @class */ (function (_super) {
    __extends(CommonDocDashboardSearchColumnComponent, _super);
    function CommonDocDashboardSearchColumnComponent(appService, commonRoutingService, cdocDataService, searchFormConverter, cdocRoutingService, toastr, cd, elRef, pageUtils, searchFormUtils, cdocSearchFormUtils, actionService) {
        var _this = _super.call(this, appService, commonRoutingService, cdocDataService, searchFormConverter, cdocRoutingService, toastr, cd, elRef, pageUtils, searchFormUtils, cdocSearchFormUtils, new CommonDocMultiActionManager(appService, actionService)) || this;
        _this.actionService = actionService;
        _this.baseSearchUrl = 'cdoc/';
        return _this;
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocDashboardSearchColumnComponent.prototype, "baseSearchUrl", void 0);
    return CommonDocDashboardSearchColumnComponent;
}(CommonDocInlineSearchpageComponent));
export { CommonDocDashboardSearchColumnComponent };
//# sourceMappingURL=cdoc-dashboard-searchcolumn.component.js.map