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
import { EventEmitter, Input, Output } from '@angular/core';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { Layout } from '../../../angular-commons/services/layout.service';
import { AppState } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { AngularHtmlService } from '../../../angular-commons/services/angular-html.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
var CommonDocInlineSearchpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocInlineSearchpageComponent, _super);
    function CommonDocInlineSearchpageComponent(appService, commonRoutingService, cdocDataService, searchFormConverter, cdocRoutingService, toastr, cd, elRef, pageUtils, searchFormUtils, cdocSearchFormUtils, multiActionManager) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.commonRoutingService = commonRoutingService;
        _this.cdocDataService = cdocDataService;
        _this.searchFormConverter = searchFormConverter;
        _this.cdocRoutingService = cdocRoutingService;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.elRef = elRef;
        _this.pageUtils = pageUtils;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocSearchFormUtils = cdocSearchFormUtils;
        _this.multiActionManager = multiActionManager;
        _this.initialized = false;
        _this.showLoadingSpinner = false;
        _this.Layout = Layout;
        _this.m3uExportAvailable = false;
        _this.maxAllowedM3UExportItems = -1;
        _this.pauseAutoPlay = false;
        _this.playerIdPrefix = 'mdocInlineSearch_' + (Math.random() * 100).toFixed(0);
        _this.multiActionSelectValueMap = new Map();
        _this.params = {};
        _this.showForm = false;
        _this.showTimetable = false;
        _this.showLayout = false;
        _this.showResultList = false;
        _this.loadFacets = false;
        _this.loadTrack = false;
        _this.showOnlyIfRecordsFound = true;
        _this.showMultiActionHeader = false;
        _this.baseSearchUrl = 'cdoc/';
        _this.short = false;
        _this.perPageOnToSearchPage = 10;
        _this.show = new EventEmitter();
        _this.searchResultFound = new EventEmitter();
        _this.searchForm = _this.cdocDataService.newSearchForm({});
        _this.searchResult = _this.cdocDataService.newSearchResult(_this.searchForm, 0, [], new Facets());
        return _this;
    }
    CommonDocInlineSearchpageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // reset initialized
        this.initialized = false;
        // do search
        this.appStateSubscription = this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                _this.configureComponent(_this.appService.getAppConfig());
                return _this.doSearchWithParams(_this.params);
            }
        });
    };
    CommonDocInlineSearchpageComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
    };
    CommonDocInlineSearchpageComponent.prototype.onShowDoc = function (cdoc) {
        this.cdocRoutingService.navigateToShow(cdoc, '');
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onPageChange = function (page) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.pageNum = +page;
        this.doSearch();
        this.pageUtils.scrollToTopOfElement(this.elRef);
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onPerPageChange = function (perPage) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.perPage = perPage;
        this.searchForm.pageNum = 1;
        this.doSearch();
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onSortChange = function (sort) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.searchForm.sort = sort;
        this.searchForm.pageNum = 1;
        this.doSearch();
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onLayoutChange = function (layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.layout = layout;
        this.cd.markForCheck();
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onSearchDoc = function (cdocSearchForm) {
        this.searchForm = cdocSearchForm;
        this.doSearch();
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.getToSearchUrl = function () {
        var lSearchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        lSearchForm.perPage = this.perPageOnToSearchPage;
        return this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, lSearchForm);
    };
    CommonDocInlineSearchpageComponent.prototype.onToSearchPage = function (event) {
        this.commonRoutingService.navigateByUrl(this.getToSearchUrl());
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onPlayerStarted = function (cdoc) {
        this.pauseAutoPlay = true;
        this.onPlayingRecordChange(cdoc, true);
    };
    CommonDocInlineSearchpageComponent.prototype.onPlayerStopped = function (cdoc) {
        this.pauseAutoPlay = false;
        this.onPlayingRecordChange(cdoc, false);
    };
    CommonDocInlineSearchpageComponent.prototype.onPlayingRecordChange = function (playingRecord, started) {
        if (started) {
            this.curPlayingRecord = playingRecord;
            return;
        }
        var idx = this.searchResult.currentRecords.indexOf(playingRecord);
        if (idx < this.searchResult.currentRecords.length - 1) {
            this.curPlayingRecord = this.searchResult.currentRecords[idx + 1];
            this.cd.markForCheck();
        }
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.onSubmitSelectedMultiActions = function (event) {
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
    CommonDocInlineSearchpageComponent.prototype.onM3UExport = function () {
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
    CommonDocInlineSearchpageComponent.prototype.getComponentConfig = function (config) {
        return {
            maxAllowedM3UExportItems: BeanUtils.getValue(config, 'services.serverItemExport.maxAllowedM3UItems')
        };
    };
    CommonDocInlineSearchpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.maxAllowedM3UExportItems = componentConfig.maxAllowedM3UExportItems;
    };
    CommonDocInlineSearchpageComponent.prototype.updateData = function () {
        if (this.initialized) {
            return this.doSearchWithParams(this.params);
        }
    };
    CommonDocInlineSearchpageComponent.prototype.doSearchWithParams = function (params) {
        // console.log('doSearchWithParams params:', params);
        this.searchFormConverter.paramsToSearchForm(params, {}, this.searchForm);
        this.searchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        this.doSearch();
    };
    CommonDocInlineSearchpageComponent.prototype.doSearch = function () {
        // prepare searchform for consistency
        this.searchFormConverter.paramsToSearchForm(this.searchFormConverter.searchFormToValueMap(this.searchForm), {}, this.searchForm, {});
        // console.log('doSearch form:', this.searchForm);
        var me = this;
        me.showLoadingSpinner = true;
        me.cd.markForCheck();
        this.cdocDataService.search(this.searchForm, {
            showFacets: this.showForm || this.loadFacets || (this.showTimetable ? ['week_is', 'month_is'] : false),
            loadTrack: this.loadTrack,
            showForm: this.showForm
        }).then(function doneSearch(cdocSearchResult) {
            me.showLoadingSpinner = false;
            if (cdocSearchResult === undefined) {
                // console.log('empty searchResult', cdocSearchResult);
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            }
            else {
                // console.log('update searchResult', cdocSearchResult);
                me.initialized = true;
                me.searchResult = cdocSearchResult;
                me.searchForm = cdocSearchResult.searchForm;
            }
            me.doCheckSearchResultAfterSearch(cdocSearchResult);
            me.searchResultFound.emit(me.searchResult);
            me.cd.markForCheck();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            me.searchResultFound.emit(me.searchResult);
            me.cd.markForCheck();
        });
        return false;
    };
    CommonDocInlineSearchpageComponent.prototype.generateMultiActionSelectValueMapFromSearchResult = function (searchResult, valueMap) {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    };
    CommonDocInlineSearchpageComponent.prototype.doCheckSearchResultAfterSearch = function (searchResult) {
        var config = this.appService.getAppConfig();
        var maxAllowedItems = BeanUtils.getValue(config, 'services.serverItemExport.maxAllowedM3UItems');
        if (maxAllowedItems > 0 && this.m3uLinkLabel && searchResult && searchResult.recordCount > 0 &&
            maxAllowedItems > searchResult.recordCount) {
            this.m3uExportAvailable = true;
        }
        else {
            this.m3uExportAvailable = false;
        }
        var valueMap = new Map();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "params", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showForm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showTimetable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showLayout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showResultList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "loadFacets", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "loadTrack", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showOnlyIfRecordsFound", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showMultiActionHeader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "searchLinkLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "m3uLinkLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "htmlId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CommonDocInlineSearchpageComponent.prototype, "layout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "short", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "perPageOnToSearchPage", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocInlineSearchpageComponent.prototype, "show", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocInlineSearchpageComponent.prototype, "searchResultFound", void 0);
    return CommonDocInlineSearchpageComponent;
}(AbstractInlineComponent));
export { CommonDocInlineSearchpageComponent };
//# sourceMappingURL=cdoc-inline-searchpage.component.js.map