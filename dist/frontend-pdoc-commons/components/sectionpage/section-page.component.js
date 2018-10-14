"use strict";
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
var router_1 = require("@angular/router");
var pdoc_record_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record");
var ngx_toastr_1 = require("ngx-toastr");
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var pdoc_data_service_1 = require("@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service");
var error_resolver_1 = require("../../../frontend-cdoc-commons/resolver/error.resolver");
var sections_pdoc_details_resolver_1 = require("../../../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var page_utils_1 = require("../../../angular-commons/services/page.utils");
var angular_markdown_service_1 = require("../../../angular-commons/services/angular-markdown.service");
var angular_html_service_1 = require("../../../angular-commons/services/angular-html.service");
var common_routing_service_1 = require("../../../angular-commons/services/common-routing.service");
var generic_tracking_service_1 = require("../../../angular-commons/services/generic-tracking.service");
var platform_service_1 = require("../../../angular-commons/services/platform.service");
var SectionPageComponent = /** @class */ (function () {
    function SectionPageComponent(route, pdocDataService, commonRoutingService, errorResolver, toastr, pageUtils, angularMarkdownService, angularHtmlService, cd, trackingProvider, platformService, layoutService, appService) {
        this.route = route;
        this.pdocDataService = pdocDataService;
        this.commonRoutingService = commonRoutingService;
        this.errorResolver = errorResolver;
        this.toastr = toastr;
        this.pageUtils = pageUtils;
        this.angularMarkdownService = angularMarkdownService;
        this.angularHtmlService = angularHtmlService;
        this.cd = cd;
        this.trackingProvider = trackingProvider;
        this.platformService = platformService;
        this.layoutService = layoutService;
        this.appService = appService;
        this.flgDescRendered = false;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        this.pdoc = new pdoc_record_1.PDocRecord();
        this.baseSearchUrl = '';
        this.sections = [];
        this.Layout = layout_service_1.Layout;
        this.SearchFormLayout = layout_service_1.SearchFormLayout;
        this.searchFormLayout = layout_service_1.SearchFormLayout.GRID;
    }
    SectionPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to route params
        var me = this;
        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(function (layoutSizeData) {
            me.onResize(layoutSizeData);
        });
        this.route.data.subscribe(function (data) {
            me.commonRoutingService.setRoutingState(common_routing_service_1.RoutingState.DONE);
            var config = me.appService.getAppConfig();
            me.configureProcessingOfResolvedData(config);
            var flgPDocError = error_resolver_1.ErrorResolver.isResolverError(data.pdoc);
            var flgBaseSearchUrlError = error_resolver_1.ErrorResolver.isResolverError(data.baseSearchUrl);
            if (!flgPDocError && !flgBaseSearchUrlError) {
                me.pdoc = data.pdoc.data;
                me.flgDescRendered = false;
                me.baseSearchUrl = data.baseSearchUrl.data;
                me.sections = me.getSubSections(me.pdoc);
                me.doProcessAfterResolvedData(config);
                _this.pageUtils.setTranslatedTitle('meta.title.prefix.sectionPage', { title: me.pdoc.heading }, me.pdoc.heading);
                _this.pageUtils.setTranslatedDescription('meta.desc.prefix.sectionPage', { title: me.pdoc.heading, teaser: me.pdoc.teaser }, me.pdoc.teaser);
                _this.pageUtils.setRobots(true, true);
                _this.pageUtils.setMetaLanguage();
                me.cd.markForCheck();
                me.pageUtils.scrollToTop();
                _this.trackingProvider.trackPageView();
                return;
            }
            me.pdoc = undefined;
            var newUrl, msg, code;
            var errorCode = (flgPDocError ? data.pdoc.error.code : data.baseSearchUrl.error.code);
            var sectionId = (flgPDocError ? data.pdoc.error.data : data.baseSearchUrl.error.data);
            switch (errorCode) {
                case sections_pdoc_details_resolver_1.SectionsPDocRecordResolver.ERROR_INVALID_SECTION_ID:
                    code = error_resolver_1.ErrorResolver.ERROR_INVALID_ID;
                    me.baseSearchUrl = ['sections', _this.idValidationRule.sanitize(sectionId)].join('/');
                    newUrl = [me.baseSearchUrl].join('/');
                    msg = undefined;
                    break;
                case sections_pdoc_details_resolver_1.SectionsPDocRecordResolver.ERROR_UNKNOWN_SECTION_ID:
                    code = error_resolver_1.ErrorResolver.ERROR_UNKNOWN_ID;
                    me.baseSearchUrl = ['sections', 'start'].join('/');
                    if (data.pdoc.state.url === me.baseSearchUrl) {
                        newUrl = 'errorpage';
                        msg = 'Es ist leider ein unglaublich schwerwiegender Fehler aufgetreten. ' +
                            'Bitte probieren Sie es später noch einmal :-(';
                    }
                    else {
                        newUrl = [me.baseSearchUrl].join('/');
                        msg = undefined;
                    }
                    break;
                case sections_pdoc_details_resolver_1.SectionsPDocRecordResolver.ERROR_READING_SECTION_ID:
                    code = error_resolver_1.ErrorResolver.ERROR_WHILE_READING;
                    me.baseSearchUrl = ['sections', 'start'].join('/');
                    if (data.pdoc.state.url === me.baseSearchUrl) {
                        newUrl = 'errorpage';
                        msg = 'Es ist leider ein unglaublich schwerwiegender Fehler aufgetreten. ' +
                            'Bitte probieren Sie es später noch einmal :-(';
                    }
                    else {
                        newUrl = undefined;
                        msg = undefined;
                    }
                    break;
                case generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED:
                    code = error_resolver_1.ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                    newUrl = undefined;
                    msg = undefined;
                    break;
                default:
                    code = error_resolver_1.ErrorResolver.ERROR_OTHER;
                    me.baseSearchUrl = ['sections', 'start'].join('/');
                    newUrl = undefined;
                    msg = undefined;
            }
            _this.errorResolver.redirectAfterRouterError(code, newUrl, _this.toastr, msg);
            me.cd.markForCheck();
            return;
        });
    };
    SectionPageComponent.prototype.renderDesc = function () {
        if (this.flgDescRendered) {
            return;
        }
        if (!this.pdoc) {
            this.flgDescRendered = true;
            return;
        }
        if (!this.platformService.isClient()) {
            return this.pdoc.descTxt || '';
        }
        if (this.pdoc.descHtml) {
            this.flgDescRendered = this.angularHtmlService.renderHtml('#desc', this.pdoc.descHtml, true);
        }
        else {
            var desc = this.pdoc.descMd ? this.pdoc.descMd : '';
            this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#desc', desc, true);
        }
        return '';
    };
    SectionPageComponent.prototype.onShow = function (record) {
        this.commonRoutingService.navigateByUrl('sections/' + record.id);
        return false;
    };
    SectionPageComponent.prototype.onScrollToTop = function () {
        this.pageUtils.scrollToTop();
    };
    SectionPageComponent.prototype.getSubSections = function (pdoc) {
        return this.pdocDataService.getSubDocuments(pdoc);
    };
    SectionPageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    SectionPageComponent.prototype.doProcessAfterResolvedData = function (config) {
    };
    SectionPageComponent.prototype.onResize = function (layoutSizeData) {
        if (this.platformService.isClient() && layoutSizeData.layoutSize >= layout_service_1.LayoutSize.VERYBIG && !this.layoutService.isPrintMode()) {
            this.searchFormLayout = layout_service_1.SearchFormLayout.STACKED;
        }
        else {
            this.searchFormLayout = layout_service_1.SearchFormLayout.GRID;
        }
        this.cd.markForCheck();
    };
    SectionPageComponent = __decorate([
        core_1.Component({
            selector: 'app-sectionpage',
            templateUrl: './section-page.component.html',
            styleUrls: ['./section-page.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, pdoc_data_service_1.PDocDataService,
            common_routing_service_1.CommonRoutingService, error_resolver_1.ErrorResolver,
            ngx_toastr_1.ToastrService, page_utils_1.PageUtils,
            angular_markdown_service_1.AngularMarkdownService, angular_html_service_1.AngularHtmlService,
            core_1.ChangeDetectorRef, generic_tracking_service_1.GenericTrackingService,
            platform_service_1.PlatformService, layout_service_1.LayoutService,
            generic_app_service_1.GenericAppService])
    ], SectionPageComponent);
    return SectionPageComponent;
}());
exports.SectionPageComponent = SectionPageComponent;
//# sourceMappingURL=section-page.component.js.map