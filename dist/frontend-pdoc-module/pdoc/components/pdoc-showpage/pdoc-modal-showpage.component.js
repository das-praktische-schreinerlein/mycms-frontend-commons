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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject } from '@angular/core';
import { PDocShowPageComponent } from './pdoc-showpage.component';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { ToastrService } from 'ngx-toastr';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { COMMON_APP_ENVIRONMENT } from '../../../../frontend-section-commons/common-environment';
var PDocModalShowpageComponent = /** @class */ (function (_super) {
    __extends(PDocModalShowpageComponent, _super);
    function PDocModalShowpageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, searchFormConverter, layoutService, elRef, router, environment) {
        var _this = _super.call(this, route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, searchFormConverter, layoutService, elRef, router, environment) || this;
        _this.searchFormConverter = searchFormConverter;
        _this.elRef = elRef;
        _this.router = router;
        _this.environment = environment;
        _this.modal = true;
        return _this;
    }
    PDocModalShowpageComponent.prototype.configureProcessingOfResolvedData = function () {
        var me = this;
        _super.prototype.configureProcessingOfResolvedData.call(this);
        me.availableTabs = {};
    };
    PDocModalShowpageComponent = __decorate([
        Component({
            selector: 'app-pdoc-modal-showpage',
            templateUrl: './pdoc-showpage.component.html',
            styleUrls: ['./pdoc-showpage.component.css', './pdoc-modal-showpage.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(17, Inject(COMMON_APP_ENVIRONMENT)),
        __metadata("design:paramtypes", [ActivatedRoute, PDocRoutingService,
            ToastrService, PDocContentUtils,
            ErrorResolver, PageUtils, CommonRoutingService,
            AngularMarkdownService, AngularHtmlService,
            ChangeDetectorRef, GenericTrackingService, GenericAppService,
            PlatformService, PDocSearchFormConverter,
            LayoutService, ElementRef, Router, Object])
    ], PDocModalShowpageComponent);
    return PDocModalShowpageComponent;
}(PDocShowPageComponent));
export { PDocModalShowpageComponent };
//# sourceMappingURL=pdoc-modal-showpage.component.js.map