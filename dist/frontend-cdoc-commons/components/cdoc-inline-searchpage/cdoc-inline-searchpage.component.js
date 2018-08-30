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
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocInlineSearchpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocInlineSearchpageComponent, _super);
    function CommonDocInlineSearchpageComponent(appService, commonRoutingService, cdocDataService, searchFormConverter, cdocRoutingService, toastr, vcr, cd, elRef, pageUtils) {
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
        _this.initialized = false;
        _this.showLoadingSpinner = false;
        _this.Layout = layout_service_1.Layout;
        _this.params = {};
        _this.showForm = false;
        _this.showTimetable = false;
        _this.showLayout = false;
        _this.showResultList = false;
        _this.loadFacets = false;
        _this.loadTrack = false;
        _this.showOnlyIfRecordsFound = true;
        _this.baseSearchUrl = 'cdoc/';
        _this.short = false;
        _this.perPageOnToSearchPage = 10;
        _this.show = new core_1.EventEmitter();
        _this.searchResultFound = new core_1.EventEmitter();
        _this.searchForm = _this.cdocDataService.newSearchForm({});
        _this.searchResult = _this.cdocDataService.newSearchResult(_this.searchForm, 0, [], new facets_1.Facets());
        _this.toastr.setRootViewContainerRef(vcr);
        return _this;
    }
    CommonDocInlineSearchpageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // reset initialized
        this.initialized = false;
        // do search
        this.appStateSubscription = this.appService.getAppState().subscribe(function (appState) {
            if (appState === generic_app_service_1.AppState.Ready) {
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
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new facets_1.Facets());
            }
            else {
                // console.log('update searchResult', cdocSearchResult);
                me.initialized = true;
                me.searchResult = cdocSearchResult;
                me.searchForm = cdocSearchResult.searchForm;
            }
            me.searchResultFound.emit(me.searchResult);
            me.cd.markForCheck();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new facets_1.Facets());
            me.searchResultFound.emit(me.searchResult);
            me.cd.markForCheck();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "params", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showTimetable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showLayout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showResultList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "loadFacets", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "loadTrack", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "showOnlyIfRecordsFound", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "searchLinkLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocInlineSearchpageComponent.prototype, "htmlId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocInlineSearchpageComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "short", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocInlineSearchpageComponent.prototype, "perPageOnToSearchPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocInlineSearchpageComponent.prototype, "show", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocInlineSearchpageComponent.prototype, "searchResultFound", void 0);
    return CommonDocInlineSearchpageComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocInlineSearchpageComponent = CommonDocInlineSearchpageComponent;
//# sourceMappingURL=cdoc-inline-searchpage.component.js.map