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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PDocDynamicComponentService } from '../../services/pdoc-dynamic-components.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDocActionsComponent } from '../../../../frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocActionTagService } from '../../services/pdoc-actiontag.service';
var PDocActionsComponent = /** @class */ (function (_super) {
    __extends(PDocActionsComponent, _super);
    function PDocActionsComponent(dynamicComponentService, toastr, cd, appService, actionTagService) {
        var _this = _super.call(this, dynamicComponentService, toastr, cd, appService, actionTagService) || this;
        _this.dynamicComponentService = dynamicComponentService;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.actionTagService = actionTagService;
        return _this;
    }
    PDocActionsComponent = __decorate([
        Component({
            selector: 'app-pdoc-action',
            templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component.html',
            styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [PDocDynamicComponentService,
            ToastrService,
            ChangeDetectorRef, GenericAppService,
            PDocActionTagService])
    ], PDocActionsComponent);
    return PDocActionsComponent;
}(CommonDocActionsComponent));
export { PDocActionsComponent };
//# sourceMappingURL=pdoc-actions.component.js.map