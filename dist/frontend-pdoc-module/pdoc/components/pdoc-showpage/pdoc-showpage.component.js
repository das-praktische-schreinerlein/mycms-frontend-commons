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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { isArray, isNumber } from 'util';
import { CommonDocShowpageComponent } from '../../../../frontend-cdoc-commons/components/cdoc-showpage.component';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { COMMON_APP_ENVIRONMENT } from '../../../../frontend-section-commons/common-environment';
import { PrintService } from '../../../../angular-commons/services/print.service';
import { PdfPrintService } from '../../../../angular-commons/services/pdf-print.service';
var PDocShowPageComponent = /** @class */ (function (_super) {
    __extends(PDocShowPageComponent, _super);
    function PDocShowPageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, searchFormConverter, layoutService, elRef, router, environment, printService, pdfPrintService) {
        var _this = _super.call(this, route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, router) || this;
        _this.searchFormConverter = searchFormConverter;
        _this.elRef = elRef;
        _this.environment = environment;
        _this.printService = printService;
        _this.pdfPrintService = pdfPrintService;
        _this.tagcloudSearchResult = new PDocSearchResult(new PDocSearchForm({}), 0, undefined, new Facets());
        _this.showResultListTrigger = {
            ALL_ENTRIES: true,
            PAGE: false
        };
        _this.availableTabs = {
            ALL_ENTRIES: false,
            PAGE: true
        };
        return _this;
    }
    PDocShowPageComponent.prototype.getFiltersForType = function (record, type) {
        var minPerPage = isNumber(this.showResultListTrigger[type]) ? this.showResultListTrigger[type] : 0;
        var theme = this.pdoc ? this.pdoc.theme : undefined;
        var filters = this.contentUtils.getPDocSubItemFiltersForType(record, type, theme, minPerPage);
        return filters;
    };
    PDocShowPageComponent.prototype.renderDesc = function () {
        if (this.record && (this.record.descMd === undefined || this.record.descMd.toLowerCase() === 'tododesc')) {
            this.setDesc(this.descSelector, '');
            this.flgDescRendered = false;
            return '';
        }
        return _super.prototype.renderDesc.call(this);
    };
    PDocShowPageComponent.prototype.onOpenPrintPreview = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp)
        };
        this.printService.openPrintPreview(options);
        return false;
    };
    PDocShowPageComponent.prototype.onPrintPdf = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp),
            fileName: 'filename.pdf',
            pdfOptions: {
                orientation: 'portrait',
                format: 'a4'
            },
            waitForRenderingMs: 1000
        };
        this.pdfPrintService.printPdf(options);
        return false;
    };
    PDocShowPageComponent.prototype.onResize = function (layoutSizeData) {
        _super.prototype.onResize.call(this, layoutSizeData);
        this.layoutSize = layoutSizeData;
        this.cd.markForCheck();
    };
    PDocShowPageComponent.prototype.getComponentConfig = function (config) {
        return {
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            modalOutletName: 'pdocmodalshow'
        };
    };
    PDocShowPageComponent.prototype.configureProcessingOfResolvedData = function () {
        var me = this;
        var config = me.appService.getAppConfig();
        if (BeanUtils.getValue(config, 'components.pdoc-showpage.availableTabs') !== undefined) {
            me.availableTabs = BeanUtils.getValue(config, 'components.pdoc-showpage.availableTabs');
        }
        var allowedParams = BeanUtils.getValue(config, 'components.pdoc-showpage.allowedQueryParams');
        if (me.queryParamMap && isArray(allowedParams)) {
            for (var type in me.showResultListTrigger) {
                var paramName = 'show' + type;
                var param = me.queryParamMap.get(paramName);
                if (allowedParams.indexOf(paramName) >= 0 && param) {
                    me.showResultListTrigger[type] =
                        PDocSearchForm.genericFields.perPage.validator.sanitize(param);
                }
            }
        }
        if (this.environment['hideInternalDescLinks'] === true) {
            this.pageUtils.setGlobalStyle('.show-page #desc [href*="sections/"] { cursor: not-allowed; pointer-events: none; text-decoration: none; opacity: 0.5; color: currentColor; }'
                + ' .show-page #desc a[href*="sections/"]::before { content: \'\uD83D\uDEAB\'; font-size: smaller}', 'pdocShowpageHideInternalDescLinks');
        }
        else {
            this.pageUtils.setGlobalStyle('', 'pdocShowpageHideInternalDescLinks');
        }
        if (this.environment['hideInternalImages'] === true) {
            this.pageUtils.setGlobalStyle('.show-page #desc img[src*="api/static/picturestore"] {display:none;}', 'pdocShowpageHideInternalImages');
        }
        else {
            this.pageUtils.setGlobalStyle('', 'pdocShowpageHideInternalImages');
        }
    };
    PDocShowPageComponent.prototype.getConfiguredIndexableTypes = function (config) {
        var indexableTypes = [];
        if (BeanUtils.getValue(config, 'services.seo.pdocIndexableTypes')) {
            indexableTypes = config['services']['seo']['pdocIndexableTypes'];
        }
        return indexableTypes;
    };
    PDocShowPageComponent.prototype.doProcessAfterResolvedData = function () {
        var me = this;
        me.tagcloudSearchResult = new PDocSearchResult(new PDocSearchForm({}), 0, undefined, new Facets());
    };
    PDocShowPageComponent = __decorate([
        Component({
            selector: 'app-pdoc-showpage',
            templateUrl: './pdoc-showpage.component.html',
            styleUrls: ['./pdoc-showpage.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(17, Inject(COMMON_APP_ENVIRONMENT)),
        __metadata("design:paramtypes", [ActivatedRoute, PDocRoutingService,
            ToastrService, PDocContentUtils,
            ErrorResolver, PageUtils, CommonRoutingService,
            AngularMarkdownService, AngularHtmlService,
            ChangeDetectorRef, GenericTrackingService, GenericAppService,
            PlatformService, PDocSearchFormConverter,
            LayoutService, ElementRef, Router, Object, PrintService, PdfPrintService])
    ], PDocShowPageComponent);
    return PDocShowPageComponent;
}(CommonDocShowpageComponent));
export { PDocShowPageComponent };
//# sourceMappingURL=pdoc-showpage.component.js.map