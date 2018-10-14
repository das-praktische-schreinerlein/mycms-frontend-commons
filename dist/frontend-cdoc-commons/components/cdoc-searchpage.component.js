"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var layout_service_1 = require("../../angular-commons/services/layout.service");
var error_resolver_1 = require("../resolver/error.resolver");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var common_routing_service_1 = require("../../angular-commons/services/common-routing.service");
var cdoc_section_searchform_resolver_1 = require("../resolver/cdoc-section-searchform.resolver");
var pdoc_page_component_1 = require("../../frontend-pdoc-commons/components/pdoc-page.component");
var angular_html_service_1 = require("../../angular-commons/services/angular-html.service");
var CommonDocSearchpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocSearchpageComponent, _super);
    function CommonDocSearchpageComponent(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils, cdocSearchFormUtils, multiActionManager, environment) {
        var _this = _super.call(this, route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment) || this;
        _this.route = route;
        _this.commonRoutingService = commonRoutingService;
        _this.errorResolver = errorResolver;
        _this.cdocDataService = cdocDataService;
        _this.searchFormConverter = searchFormConverter;
        _this.cdocRoutingService = cdocRoutingService;
        _this.toastr = toastr;
        _this.pageUtils = pageUtils;
        _this.cd = cd;
        _this.trackingProvider = trackingProvider;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocSearchFormUtils = cdocSearchFormUtils;
        _this.multiActionManager = multiActionManager;
        _this.environment = environment;
        _this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        _this.Layout = layout_service_1.Layout;
        _this.SearchFormLayout = layout_service_1.SearchFormLayout;
        _this.LayoutSize = layout_service_1.LayoutSize;
        _this.layout = layout_service_1.Layout.FLAT;
        _this.sort = 'relevance';
        _this.perPage = 10;
        _this.searchFormLayout = layout_service_1.SearchFormLayout.GRID;
        _this.showSearchFormElements = true;
        _this.pauseAutoPlay = false;
        _this.anchor = '';
        _this.m3uExportAvailable = false;
        _this.maxAllowedM3UExportItems = -1;
        _this.multiActionSelectValueMap = new Map();
        _this.searchForm = cdocDataService.newSearchForm({});
        _this.searchResult = cdocDataService.newSearchResult(_this.searchForm, 0, [], new facets_1.Facets());
        return _this;
    }
    CommonDocSearchpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        var me = this;
        this.route.fragment.subscribe(function (value) {
            _this.anchor = _this.idValidationRule.sanitize(value);
        });
        this.route.data.subscribe(function (data) {
            me.commonRoutingService.setRoutingState(common_routing_service_1.RoutingState.DONE);
            me.onResize(_this.layoutSizeObservable.getValue());
            me.configureProcessingOfResolvedData(me.config);
            if (me.processError(data)) {
                return;
            }
            me.pdoc = data.pdoc ? data.pdoc.data : undefined;
            me.baseSearchUrl = (data.baseSearchUrl.data ? data.baseSearchUrl.data : me.baseSearchUrl);
            if (!data.flgDoSearch) {
                // console.log('ngOnInit: redirect for ', data);
                return _this.redirectToSearch();
            }
            // console.log('route: search for ', data);
            _this.searchForm = data.searchForm.data;
            _this.setPageLayoutAndStyles();
            _this.perPage = _this.searchForm.perPage;
            _this.sort = _this.searchForm.sort;
            _this.doProcessAfterResolvedData({});
            _this.setMetaTags(me.config, me.pdoc, null);
            _this.pageUtils.setMetaLanguage();
            _this.trackingProvider.trackPageView();
            return _this.doSearch();
        });
    };
    CommonDocSearchpageComponent.prototype.onShowDoc = function (cdoc) {
        this.cdocRoutingService.navigateToShow(cdoc, this.cdocRoutingService.getLastSearchUrl());
        return false;
    };
    CommonDocSearchpageComponent.prototype.onPageChange = function (page, scroll) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.pageNum = +page;
        // console.log('onPageChange: redirect to page', page);
        this.redirectToSearch();
        if (scroll) {
            this.pageUtils.scrollToTop();
        }
        return false;
    };
    CommonDocSearchpageComponent.prototype.onPerPageChange = function (perPage) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.perPage = perPage;
        this.searchForm.pageNum = 1;
        // console.log('onPerPageChange: redirect to perPage', perPage);
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onSortChange = function (sort) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.sort = sort;
        this.searchForm.pageNum = 1;
        // console.log('onSortChange: redirect to sort', sort);
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onLayoutChange = function (layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.layout = layout;
        if (layout.toString() === layout_service_1.Layout.PAGE.toString()) {
            this.onPerPageChange(1);
        }
        else if (this.perPage === 1) {
            this.onPerPageChange(10);
        }
        //        this.redirectToSearch();
        this.cd.markForCheck();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onSearchDoc = function (searchForm) {
        var origSearchForm = this.searchForm;
        this.searchForm = searchForm;
        this.searchForm.perPage = origSearchForm.perPage;
        this.searchForm.sort = origSearchForm.sort;
        this.searchForm.pageNum = 1;
        // console.log('onSearchDoc: redirect to ', searchForm);
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onShowFormChanged = function (showForm) {
        this.showSearchFormElements = showForm;
        this.onResize(this.layoutSizeObservable.getValue());
        return false;
    };
    CommonDocSearchpageComponent.prototype.onTimeTableColumnClicked = function (month) {
        this.searchForm.when = month;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onTypeTableColumnClicked = function (type) {
        this.searchForm.type = type;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onInitialTableColumnClicked = function (initial) {
        this.searchForm.initial = initial;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onTagcloudClicked = function (filterValue, filter) {
        this.searchForm[filter] = filterValue;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    };
    CommonDocSearchpageComponent.prototype.onPlayerStarted = function (cdoc) {
        this.pauseAutoPlay = true;
    };
    CommonDocSearchpageComponent.prototype.onPlayerStopped = function (cdoc) {
        this.pauseAutoPlay = false;
    };
    CommonDocSearchpageComponent.prototype.onSubmitSelectedMultiActions = function (event) {
        var _this = this;
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        this.multiActionManager.processActionTags().then(function (value) {
            _this.toastr.info('Aktionen wurden erfolgreich ausgeführt.', 'Juhu!');
            _this.doSearch();
        }).catch(function (reason) {
            _this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            _this.showLoadingSpinner = false;
            _this.cd.markForCheck();
        });
        return false;
    };
    CommonDocSearchpageComponent.prototype.onM3UExport = function () {
        var _this = this;
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        this.cdocDataService.export(this.searchForm, 'm3uplaylist', undefined).then(function (value) {
            _this.toastr.info('Export wurde erfolgreich ausgeführt.', 'Juhu!');
            _this.showLoadingSpinner = false;
            _this.cd.markForCheck();
            angular_html_service_1.AngularHtmlService.browserSaveTextAsFile(value, 'playlist.m3u', 'application/m3u');
        }).catch(function (reason) {
            _this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            _this.showLoadingSpinner = false;
            _this.cd.markForCheck();
        });
        return true;
    };
    CommonDocSearchpageComponent.prototype.redirectToSearch = function () {
        // reset initialized
        this.initialized = false;
        var url = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm);
        // console.log('redirectToSearch: redirect to ', url);
        this.commonRoutingService.navigateByUrl(url);
        return false;
    };
    CommonDocSearchpageComponent.prototype.onResize = function (layoutSizeData) {
        if (this.platformService.isClient() && layoutSizeData.layoutSize >= layout_service_1.LayoutSize.VERYBIG && this.showSearchFormElements &&
            !this.layoutService.isPrintMode()) {
            this.searchFormLayout = layout_service_1.SearchFormLayout.STACKED;
        }
        else {
            this.searchFormLayout = layout_service_1.SearchFormLayout.GRID;
        }
        this.cd.markForCheck();
    };
    CommonDocSearchpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.maxAllowedM3UExportItems = componentConfig.maxAllowedM3UExportItems;
    };
    CommonDocSearchpageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    CommonDocSearchpageComponent.prototype.doProcessAfterResolvedData = function (config) {
    };
    CommonDocSearchpageComponent.prototype.setMetaTags = function (config, pdoc, record) {
        if (pdoc) {
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSectionSearchPage', { title: pdoc.heading }, pdoc.heading);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSectionSearchPage', { title: pdoc.heading, teaser: pdoc.teaser }, pdoc.teaser);
            this.pageUtils.setRobots(false, false);
        }
        else {
            this.pageUtils.setGlobalStyle('', 'sectionStyle');
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSearchPage', {}, 'Search');
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSearchPage', {}, 'Search');
            this.pageUtils.setRobots(false, false);
        }
    };
    CommonDocSearchpageComponent.prototype.setPageLayoutAndStyles = function () {
        if (this.searchForm.perPage === 1) {
            this.layout = layout_service_1.Layout.PAGE;
            this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
                '.show-on-fullpage-block { display: block; } ' +
                '.content-container, .list-container, .card-deck, .card { background: #130b0b !IMPORTANT; border: none !IMPORTANT;} ' +
                '.other-content-container, .map-container { background: white !IMPORTANT; border: 2px !IMPORTANT;} ' +
                '.list-header-container { background: #dadada; opacity: 0.1; } ' +
                'div:hover { opacity: 1 }', 'fullPageStyle');
        }
        else {
            this.pageUtils.setGlobalStyle('.show-on-fullpage-block { display: none; }', 'fullPageStyle');
        }
    };
    CommonDocSearchpageComponent.prototype.processError = function (data) {
        var flgSearchFormError = error_resolver_1.ErrorResolver.isResolverError(data.searchForm);
        var flgPDocError = error_resolver_1.ErrorResolver.isResolverError(data.pdoc);
        var flgBaseSearchUrlError = error_resolver_1.ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgSearchFormError && !flgBaseSearchUrlError) {
            return false;
        }
        var newUrl, msg, code;
        var errorCode = (flgSearchFormError ? data.searchForm.error.code : data.baseSearchUrl.error.code);
        var sectionId = undefined;
        var searchForm = undefined;
        if (flgSearchFormError) {
            if (data.searchForm.error.data) {
                sectionId = data.searchForm.error.data.theme;
            }
            if (data.searchForm.error.data) {
                searchForm = this.cdocDataService.createSanitizedSearchForm(data.searchForm.error.data);
            }
            else {
                searchForm = this.cdocDataService.newSearchForm({});
            }
        }
        else if (data.searchForm.data) {
            sectionId = data.searchForm.data.theme;
            searchForm = data.searchForm.data;
        }
        switch (errorCode) {
            case cdoc_section_searchform_resolver_1.CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM:
                code = error_resolver_1.ErrorResolver.ERROR_INVALID_DATA;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
                msg = undefined;
                break;
            case cdoc_section_searchform_resolver_1.CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID:
                code = error_resolver_1.ErrorResolver.ERROR_INVALID_ID;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', searchForm);
                msg = undefined;
                break;
            case generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED:
                code = error_resolver_1.ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                newUrl = undefined;
                msg = undefined;
                break;
            default:
                code = error_resolver_1.ErrorResolver.ERROR_OTHER;
                this.baseSearchUrl = this.baseSearchUrlDefault + '/';
                newUrl = undefined;
                msg = undefined;
        }
        this.errorResolver.redirectAfterRouterError(code, newUrl, this.toastr, msg);
        this.cd.markForCheck();
        return true;
    };
    CommonDocSearchpageComponent.prototype.doPreChecksBeforeSearch = function () {
        if ((this.searchForm.type === undefined || this.searchForm.type === '')
            && this.environment.emptyDefaultSearchTypes !== undefined && this.environment.emptyDefaultSearchTypes !== '') {
            this.searchForm.type = this.environment.emptyDefaultSearchTypes;
            return this.redirectToSearch();
        }
    };
    CommonDocSearchpageComponent.prototype.generateMultiActionSelectValueMapFromSearchResult = function (searchResult, valueMap) {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    };
    CommonDocSearchpageComponent.prototype.doCheckSearchResultAfterSearch = function (searchResult) {
        this.pauseAutoPlay = false;
        if (this.maxAllowedM3UExportItems > 0 && searchResult && searchResult.recordCount > 0 &&
            this.maxAllowedM3UExportItems > searchResult.recordCount) {
            this.m3uExportAvailable = true;
        }
        else {
            this.m3uExportAvailable = false;
        }
        var valueMap = new Map();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;
    };
    CommonDocSearchpageComponent.prototype.doSearch = function () {
        this.doPreChecksBeforeSearch();
        // console.log('doSearch form:', this.searchForm);
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrl);
        this.cdocRoutingService.setLastSearchUrl(this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm));
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        var me = this;
        this.cdocDataService.search(this.searchForm, {
            showFacets: true,
            loadTrack: true,
            showForm: true
        }).then(function doneSearch(cdocSearchResult) {
            if (cdocSearchResult === undefined) {
                // console.log('empty searchResult', mdocSearchResult);
                me.initialized = true;
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new facets_1.Facets());
            }
            else {
                // console.log('update searchResult', mdocSearchResult);
                me.initialized = true;
                me.searchResult = cdocSearchResult;
                me.searchForm = cdocSearchResult.searchForm;
            }
            me.doCheckSearchResultAfterSearch(cdocSearchResult);
            me.showLoadingSpinner = false;
            me.pageUtils.goToLinkAnchor(me.anchor);
            me.cd.markForCheck();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.initialized = true;
            me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new facets_1.Facets());
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
        });
    };
    return CommonDocSearchpageComponent;
}(pdoc_page_component_1.AbstractPageComponent));
exports.CommonDocSearchpageComponent = CommonDocSearchpageComponent;
//# sourceMappingURL=cdoc-searchpage.component.js.map