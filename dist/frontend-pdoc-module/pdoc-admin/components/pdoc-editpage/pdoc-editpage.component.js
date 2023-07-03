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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { CommonDocEditpageComponent } from '../../../../frontend-cdoc-commons/components/cdoc-editpage.component';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { COMMON_APP_ENVIRONMENT } from '../../../../frontend-section-commons/common-environment';
var PDocEditpageComponent = /** @class */ (function (_super) {
    __extends(PDocEditpageComponent, _super);
    function PDocEditpageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, pdocDataService, environment) {
        var _this = _super.call(this, route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, pdocDataService) || this;
        _this.route = route;
        _this.cdocRoutingService = cdocRoutingService;
        _this.toastr = toastr;
        _this.errorResolver = errorResolver;
        _this.pageUtils = pageUtils;
        _this.commonRoutingService = commonRoutingService;
        _this.angularMarkdownService = angularMarkdownService;
        _this.angularHtmlService = angularHtmlService;
        _this.cd = cd;
        _this.trackingProvider = trackingProvider;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.pdocDataService = pdocDataService;
        _this.environment = environment;
        _this.showResultListTrigger = {
            PAGE: false
        };
        _this.availableTabs = {
            'PAGE': true
        };
        return _this;
    }
    PDocEditpageComponent.prototype.getComponentConfig = function (config) {
        return {
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            editAllowed: (BeanUtils.getValue(config, 'permissions.pdocWritable') === true)
        };
    };
    PDocEditpageComponent.prototype.getFiltersForType = function (record, type) {
        return this.contentUtils.getPDocSubItemFiltersForType(record, type, (this.pdoc ? this.pdoc.theme : undefined));
    };
    PDocEditpageComponent = __decorate([
        Component({
            selector: 'app-pdoc-editpage',
            templateUrl: './pdoc-editpage.component.html',
            styleUrls: ['./pdoc-editpage.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(15, Inject(COMMON_APP_ENVIRONMENT)),
        __metadata("design:paramtypes", [ActivatedRoute, PDocRoutingService,
            ToastrService, PDocContentUtils,
            ErrorResolver, PageUtils,
            CommonRoutingService, AngularMarkdownService,
            AngularHtmlService, ChangeDetectorRef,
            GenericTrackingService, GenericAppService,
            PlatformService, LayoutService,
            PDocDataService, Object])
    ], PDocEditpageComponent);
    return PDocEditpageComponent;
}(CommonDocEditpageComponent));
export { PDocEditpageComponent };
//# sourceMappingURL=pdoc-editpage.component.js.map