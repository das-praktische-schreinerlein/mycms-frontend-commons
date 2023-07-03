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
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons//services/pdoc-data.service';
import { ActivatedRoute } from '@angular/router';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { CommonDocSearchpageComponent } from '../../../../frontend-cdoc-commons/components/cdoc-searchpage.component';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { PDocActionTagService } from '../../../shared-pdoc/services/pdoc-actiontag.service';
import { PDocSearchFormUtils } from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import { CommonDocMultiActionManager } from '../../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { Location } from '@angular/common';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { COMMON_APP_ENVIRONMENT } from '../../../../frontend-section-commons/common-environment';
var PDocSearchPageComponent = /** @class */ (function (_super) {
    __extends(PDocSearchPageComponent, _super);
    function PDocSearchPageComponent(route, commonRoutingService, errorResolver, pdocDataService, searchFormConverter, cdocRoutingService, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils, pdocSearchFormUtils, actionService, elRef, location, environment) {
        var _this = _super.call(this, route, commonRoutingService, errorResolver, pdocDataService, searchFormConverter, cdocRoutingService, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils, pdocSearchFormUtils, new CommonDocMultiActionManager(appService, actionService), environment, location) || this;
        _this.cdocRoutingService = cdocRoutingService;
        _this.actionService = actionService;
        _this.elRef = elRef;
        _this.environment = environment;
        return _this;
    }
    PDocSearchPageComponent.prototype.onCreateNewRecord = function (type) {
        this.cdocRoutingService.navigateToCreate(type, null, null);
        return false;
    };
    PDocSearchPageComponent.prototype.getComponentConfig = function (config) {
        return {
            maxAllowedM3UExportItems: 0,
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            availableCreateActionTypes: BeanUtils.getValue(config, 'components.pdoc-searchpage.availableCreateActionTypes'),
            defaultLayoutPerType: BeanUtils.getValue(config, 'components.pdoc-searchpage.defaultLayoutPerType')
        };
    };
    PDocSearchPageComponent.prototype.configureComponent = function (config) {
        _super.prototype.configureComponent.call(this, config);
        var componentConfig = this.getComponentConfig(config);
        this.defaultLayoutPerType = componentConfig.defaultLayoutPerType;
    };
    PDocSearchPageComponent.prototype.doPreChecksBeforeSearch = function () {
        if ((this.searchForm.type === undefined || this.searchForm.type === '')
            && this.environment['pdocEmptyDefaultSearchTypes'] !== undefined && this.environment['pdocEmptyDefaultSearchTypes'] !== '') {
            this.searchForm.type = this.environment['pdocEmptyDefaultSearchTypes'];
            return this.redirectToSearch();
        }
        return _super.prototype.doPreChecksBeforeSearch.call(this);
    };
    PDocSearchPageComponent = __decorate([
        Component({
            selector: 'app-pdoc-searchpage',
            templateUrl: './pdoc-searchpage.component.html',
            styleUrls: ['./pdoc-searchpage.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(18, Inject(COMMON_APP_ENVIRONMENT)),
        __metadata("design:paramtypes", [ActivatedRoute, CommonRoutingService, ErrorResolver,
            PDocDataService, PDocSearchFormConverter,
            PDocRoutingService, ToastrService, PageUtils,
            ChangeDetectorRef, GenericTrackingService, GenericAppService,
            PlatformService, LayoutService, SearchFormUtils,
            PDocSearchFormUtils, PDocActionTagService,
            ElementRef, Location, Object])
    ], PDocSearchPageComponent);
    return PDocSearchPageComponent;
}(CommonDocSearchpageComponent));
export { PDocSearchPageComponent };
//# sourceMappingURL=pdoc-searchpage.component.js.map