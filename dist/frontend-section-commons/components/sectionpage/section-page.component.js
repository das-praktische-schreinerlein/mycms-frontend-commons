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
import { ActivatedRoute } from '@angular/router';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ToastrService } from 'ngx-toastr';
import { Layout, LayoutService, LayoutSize, SearchFormLayout } from '../../../angular-commons/services/layout.service';
import { StaticPagesDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import { ErrorResolver } from '../../../frontend-cdoc-commons/resolver/error.resolver';
import { SectionsPDocRecordResolver } from '../../../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../../angular-commons/services/page.utils';
import { AngularMarkdownService } from '../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../angular-commons/services/angular-html.service';
import { CommonRoutingService, RoutingState } from '../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../angular-commons/services/platform.service';
var SectionPageComponent = /** @class */ (function () {
    function SectionPageComponent(route, pagesDataService, commonRoutingService, errorResolver, toastr, pageUtils, angularMarkdownService, angularHtmlService, cd, trackingProvider, platformService, layoutService, appService) {
        this.route = route;
        this.pagesDataService = pagesDataService;
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
        this.idValidationRule = new IdValidationRule(true);
        this.pdoc = new PDocRecord();
        this.baseSearchUrl = '';
        this.sections = [];
        this.menuSections = [];
        this.Layout = Layout;
        this.SearchFormLayout = SearchFormLayout;
        this.searchFormLayout = SearchFormLayout.GRID;
        this.flgShowAdminArea = false;
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
            me.commonRoutingService.setRoutingState(RoutingState.DONE);
            var config = me.appService.getAppConfig();
            me.configureProcessingOfResolvedData(config);
            var flgPDocError = ErrorResolver.isResolverError(data.pdoc);
            var flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
            if (!flgPDocError && !flgBaseSearchUrlError) {
                me.pdoc = data.pdoc.data;
                me.flgDescRendered = false;
                me.baseSearchUrl = data.baseSearchUrl.data;
                me.sections = me.getSubSections(me.pdoc);
                me.pagesDataService.getById('menu', { forceLocalStore: true }).then(function onThemesFound(pdoc) {
                    me.menuSections = me.getSubSections(pdoc);
                    me.calcSectionsNavRunner();
                    me.cd.markForCheck();
                }).catch(function onNotFound(error) {
                    me.menuSections = [];
                    me.calcSectionsNavRunner();
                    me.cd.markForCheck();
                    console.error('show getMainSection failed:', error);
                });
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
                case SectionsPDocRecordResolver.ERROR_INVALID_SECTION_ID:
                    code = ErrorResolver.ERROR_INVALID_ID;
                    me.baseSearchUrl = ['sections', _this.idValidationRule.sanitize(sectionId)].join('/');
                    newUrl = [me.baseSearchUrl].join('/');
                    msg = undefined;
                    break;
                case SectionsPDocRecordResolver.ERROR_UNKNOWN_SECTION_ID:
                    code = ErrorResolver.ERROR_UNKNOWN_ID;
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
                case SectionsPDocRecordResolver.ERROR_READING_SECTION_ID:
                    code = ErrorResolver.ERROR_WHILE_READING;
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
                case GenericAppService.ERROR_APP_NOT_INITIALIZED:
                    code = ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                    newUrl = undefined;
                    msg = undefined;
                    break;
                default:
                    code = ErrorResolver.ERROR_OTHER;
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
        return this.pagesDataService.getSubDocuments(pdoc);
    };
    SectionPageComponent.prototype.calcSectionsNavRunner = function () {
        this.sectionPrev = undefined;
        this.sectionNext = undefined;
        if (this.pdoc && this.menuSections) {
            var allSections = [];
            for (var i = 0; i < this.menuSections.length; i++) {
                this.calcSubSectionsTreeList(allSections, this.menuSections[i]);
            }
            var lastSection = undefined;
            for (var i = 0; i < allSections.length; i++) {
                if (allSections[i].id === this.pdoc.id) {
                    this.sectionPrev = lastSection;
                    this.sectionNext = i + 1 < allSections.length ? allSections[i + 1] : undefined;
                    i = allSections.length++;
                }
                lastSection = allSections[i];
            }
        }
    };
    SectionPageComponent.prototype.calcSubSectionsTreeList = function (allSections, parent) {
        var subSections = this.getSubSections(parent);
        allSections.push(parent);
        for (var i = 0; i < subSections.length; i++) {
            this.calcSubSectionsTreeList(allSections, subSections[i]);
        }
    };
    SectionPageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    SectionPageComponent.prototype.doProcessPageFlags = function (config, pdoc) {
        var flags = pdoc.flags
            ? pdoc.flags.split(',')
                .map(function (flag) { return flag.trim(); })
                .filter(function (flag) { return flag !== undefined && flag !== ''; })
            : [];
        this.flgShowAdminArea = flags.includes('flg_ShowAdminArea');
    };
    SectionPageComponent.prototype.doProcessAfterResolvedData = function (config) {
        this.doProcessPageFlags(config, this.pdoc);
    };
    SectionPageComponent.prototype.onResize = function (layoutSizeData) {
        if (this.platformService.isClient() && layoutSizeData.layoutSize >= LayoutSize.VERYBIG && !this.layoutService.isPrintMode()) {
            this.searchFormLayout = SearchFormLayout.STACKED;
        }
        else {
            this.searchFormLayout = SearchFormLayout.GRID;
        }
        this.flgDescRendered = false;
        this.cd.markForCheck();
    };
    SectionPageComponent = __decorate([
        Component({
            selector: 'app-sectionpage',
            templateUrl: './section-page.component.html',
            styleUrls: ['./section-page.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ActivatedRoute, StaticPagesDataService,
            CommonRoutingService, ErrorResolver,
            ToastrService, PageUtils,
            AngularMarkdownService, AngularHtmlService,
            ChangeDetectorRef, GenericTrackingService,
            PlatformService, LayoutService,
            GenericAppService])
    ], SectionPageComponent);
    return SectionPageComponent;
}());
export { SectionPageComponent };
//# sourceMappingURL=section-page.component.js.map