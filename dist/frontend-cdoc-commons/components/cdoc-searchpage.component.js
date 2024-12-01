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
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { Layout, LayoutService, LayoutSize, SearchFormLayout } from '../../angular-commons/services/layout.service';
import { ErrorResolver } from '../resolver/error.resolver';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { RoutingState } from '../../angular-commons/services/common-routing.service';
import { CommonSectionSearchFormResolver } from '../resolver/cdoc-section-searchform.resolver';
import { AbstractPageComponent } from '../../angular-commons/components/abstract-page.component';
import { AngularHtmlService } from '../../angular-commons/services/angular-html.service';
var CommonDocSearchpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocSearchpageComponent, _super);
    function CommonDocSearchpageComponent(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils, cdocSearchFormUtils, multiActionManager, environment, location) {
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
        _this.location = location;
        _this.idValidationRule = new IdValidationRule(true);
        _this.Layout = Layout;
        _this.SearchFormLayout = SearchFormLayout;
        _this.LayoutSize = LayoutSize;
        _this.layout = Layout.FLAT;
        _this.sort = 'relevance';
        _this.perPage = 10;
        _this.searchFormLayout = SearchFormLayout.GRID;
        _this.showSearchFormElements = true;
        _this.pauseAutoPlay = false;
        _this.anchor = '';
        _this.m3uExportAvailable = false;
        _this.maxAllowedM3UExportItems = -1;
        _this.availableCreateActionTypes = [];
        _this.defaultLayoutPerType = {};
        _this.searchOptions = {
            loadDetailsMode: undefined,
            showFacets: true,
            loadTrack: true,
            showForm: true
        };
        _this.multiActionSelectValueMap = new Map();
        _this.searchForm = cdocDataService.newSearchForm({});
        _this.searchResult = cdocDataService.newSearchResult(_this.searchForm, 0, [], new Facets());
        return _this;
    }
    CommonDocSearchpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        var me = this;
        this.route.fragment.subscribe(function (value) {
            _this.anchor = _this.idValidationRule.sanitize(value);
        });
        this.route.data.subscribe(function (data) {
            me.commonRoutingService.setRoutingState(RoutingState.DONE);
            _this.availableCreateActionType = undefined;
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
        var predecessor = undefined;
        var successor = undefined;
        var lastSeachUrl = this.cdocRoutingService.getLastSearchUrl();
        if (this.searchResult && this.searchResult.recordCount > 0) {
            var records = this.searchResult.currentRecords;
            var index = records.findIndex(function (value) { return value.id === cdoc.id; });
            if (index > -1) {
                if (index > 0) {
                    predecessor = lastSeachUrl + '#redirect' + records[index - 1].id;
                }
                else {
                    if (this.searchForm.pageNum > 1) {
                        var predecessorSearchForm = this.cdocDataService.createSanitizedSearchForm(this.searchForm);
                        predecessorSearchForm.pageNum = this.searchForm.pageNum - 1;
                        predecessor = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, predecessorSearchForm) + '#redirectLast';
                    }
                }
                if (index >= 0 && index < records.length - 1) {
                    successor = lastSeachUrl + '#redirect' + records[index + 1].id;
                }
                else {
                    if (this.searchForm.pageNum < this.searchResult.recordCount / this.searchForm.perPage) {
                        var successorSearchForm = this.cdocDataService.createSanitizedSearchForm(this.searchForm);
                        successorSearchForm.pageNum = this.searchForm.pageNum + 1;
                        successor = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, successorSearchForm) + '#redirectFirst';
                    }
                }
            }
        }
        this.cdocRoutingService.setLastSearchUrlPredecessor(predecessor);
        this.cdocRoutingService.setLastSearchUrlSuccessor(successor);
        this.cdocRoutingService.navigateToShow(cdoc, lastSeachUrl);
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
        if (this.searchForm['layout'] !== layout) {
            this.searchForm['layout'] = layout;
            this.cdocRoutingService.setLastSearchUrl(this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm));
            this.location.go(this.cdocRoutingService.getLastSearchUrl());
        }
        this.layout = layout;
        if (layout.toString() === Layout.PAGE.toString()) {
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
        if (this.searchForm['hideForm'] !== !showForm) {
            this.searchForm['hideForm'] = !showForm;
            this.cdocRoutingService.setLastSearchUrl(this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm));
            this.location.go(this.cdocRoutingService.getLastSearchUrl());
        }
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
        this.onPlayingRecordChange(cdoc, true);
    };
    CommonDocSearchpageComponent.prototype.onPlayerStopped = function (cdoc) {
        this.pauseAutoPlay = false;
        this.onPlayingRecordChange(cdoc, false);
    };
    CommonDocSearchpageComponent.prototype.onPlayingRecordChange = function (playingRecord, started) {
        if (started) {
            this.curPlayingRecord = playingRecord;
            return;
        }
        var idx = this.searchResult.currentRecords.indexOf(playingRecord);
        if (idx < this.searchResult.currentRecords.length - 1) {
            this.curPlayingRecord = this.searchResult.currentRecords[idx + 1];
            this.cd.markForCheck();
        }
        else if (this.searchForm.pageNum < this.searchResult.recordCount / this.searchForm.perPage) {
        }
        return false;
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
            AngularHtmlService.browserSaveTextAsFile(value, 'playlist.m3u', 'application/m3u');
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
        if (this.platformService.isClient() && layoutSizeData.layoutSize >= LayoutSize.VERYBIG && this.showSearchFormElements &&
            !this.layoutService.isPrintMode()) {
            this.searchFormLayout = SearchFormLayout.STACKED;
        }
        else {
            this.searchFormLayout = SearchFormLayout.GRID;
        }
        this.cd.markForCheck();
    };
    CommonDocSearchpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.maxAllowedM3UExportItems = componentConfig.maxAllowedM3UExportItems;
        this.availableCreateActionTypes = componentConfig.availableCreateActionTypes || [];
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
        var defaultLayout = this.searchForm.type && this.defaultLayoutPerType
            ? LayoutService.layoutFromString(this.defaultLayoutPerType[this.searchForm.type.toUpperCase()])
            : undefined;
        if (defaultLayout === undefined) {
            defaultLayout = Layout.FLAT;
        }
        if (this.searchForm['layout'] !== undefined) {
            this.layout = this.searchForm['layout'];
        }
        else {
            this.layout = defaultLayout;
        }
        if (this.searchForm.perPage === 1) {
            this.layout = Layout.PAGE;
            this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
                '.show-on-fullpage-block { display: block; } ' +
                '.content-container, .list-container, .card-deck, .card { background: #130b0b !important; border: none !important;} ' +
                '.other-content-container, .map-container { background: white !important; border: 2px !important;} ' +
                '.list-header-container { background: #dadada; opacity: 0.1; } ' +
                'div:hover { opacity: 1 }', 'fullPageStyle');
        }
        else {
            this.pageUtils.setGlobalStyle('.show-on-fullpage-block { display: none; }', 'fullPageStyle');
        }
        if (this.searchForm['layout'] !== undefined && this.searchForm['layout'] !== this.layout) {
            this.searchForm['layout'] = this.layout;
        }
        if (this.searchForm['hideForm'] !== undefined) {
            this.onShowFormChanged(!this.searchForm['hideForm']);
        }
    };
    CommonDocSearchpageComponent.prototype.processError = function (data) {
        var flgSearchFormError = ErrorResolver.isResolverError(data.searchForm);
        var flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
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
            case CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM:
                code = ErrorResolver.ERROR_INVALID_DATA;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
                msg = undefined;
                break;
            case CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID:
                code = ErrorResolver.ERROR_INVALID_ID;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', searchForm);
                msg = undefined;
                break;
            case GenericAppService.ERROR_APP_NOT_INITIALIZED:
                code = ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                newUrl = undefined;
                msg = undefined;
                break;
            default:
                code = ErrorResolver.ERROR_OTHER;
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
        this.availableCreateActionType = undefined;
        if (this.searchForm.type && this.searchForm.type.split(',').length === 1
            && this.availableCreateActionTypes && this.availableCreateActionTypes.includes(this.searchForm.type.toUpperCase())) {
            this.availableCreateActionType = this.searchForm.type.toUpperCase();
        }
    };
    CommonDocSearchpageComponent.prototype.doSearch = function () {
        this.doPreChecksBeforeSearch();
        // console.log('doSearch form:', this.searchForm);
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrl);
        this.cdocRoutingService.setLastSearchUrl(this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm));
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        var me = this;
        this.cdocDataService.search(this.searchForm, this.searchOptions).then(function doneSearch(cdocSearchResult) {
            if (cdocSearchResult === undefined) {
                // console.log('empty searchResult', mdocSearchResult);
                me.initialized = true;
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            }
            else {
                // console.log('update searchResult', mdocSearchResult);
                me.initialized = true;
                me.searchResult = cdocSearchResult;
                me.searchForm = cdocSearchResult.searchForm;
            }
            if (me.doCheckRedirectToShowAfterSearch(me.anchor, cdocSearchResult)) {
                return false;
            }
            me.doCheckSearchResultAfterSearch(cdocSearchResult);
            me.showLoadingSpinner = false;
            me.pageUtils.goToLinkAnchor(me.anchor);
            me.cd.markForCheck();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.initialized = true;
            me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
        });
    };
    CommonDocSearchpageComponent.prototype.doCheckRedirectToShowAfterSearch = function (anchor, cdocSearchResult) {
        if (anchor != undefined && anchor.startsWith('redirect')) {
            if (cdocSearchResult.currentRecords && cdocSearchResult.currentRecords.length > 0) {
                if (anchor === 'redirectFirst') {
                    this.onShowDoc(cdocSearchResult.currentRecords[0]);
                    return true;
                }
                if (anchor === 'redirectLast') {
                    this.onShowDoc(cdocSearchResult.currentRecords[cdocSearchResult.currentRecords.length - 1]);
                    return true;
                }
                var index = cdocSearchResult.currentRecords.findIndex(function (value) { return 'redirect' + value.id === anchor; });
                if (index > 0) {
                    this.onShowDoc(cdocSearchResult.currentRecords[index]);
                    return true;
                }
            }
        }
        return false;
    };
    return CommonDocSearchpageComponent;
}(AbstractPageComponent));
export { CommonDocSearchpageComponent };
//# sourceMappingURL=cdoc-searchpage.component.js.map