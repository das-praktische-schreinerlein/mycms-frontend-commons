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
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var layout_service_1 = require("../../angular-commons/services/layout.service");
var common_routing_service_1 = require("../../angular-commons/services/common-routing.service");
var error_resolver_1 = require("../resolver/error.resolver");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var cdoc_album_resolver_1 = require("../resolver/cdoc-album.resolver");
var pdoc_page_component_1 = require("../../frontend-pdoc-commons/components/pdoc-page.component");
var CommonDocAlbumpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocAlbumpageComponent, _super);
    function CommonDocAlbumpageComponent(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr, vcr, pageUtils, cd, trackingProvider, fb, cdocAlbumService, appService, platformService, layoutService, environment) {
        var _this = _super.call(this, route, toastr, vcr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment) || this;
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
        _this.fb = fb;
        _this.cdocAlbumService = cdocAlbumService;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.environment = environment;
        _this.idCsvValidationRule = new generic_validator_util_1.IdCsvValidationRule(true);
        _this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        _this.mode = 'show';
        _this.layout = layout_service_1.Layout.FLAT;
        _this.curRecordNr = 0;
        _this.albumKey = 'Current';
        _this.autoPlayAllowed = false;
        _this.maxAllowedItems = -1;
        _this.pauseAutoPlay = false;
        _this.editFormGroup = _this.fb.group({
            albumIds: ''
        });
        _this.searchForm = cdocDataService.newSearchForm({});
        _this.listSearchForm = cdocDataService.newSearchForm({});
        _this.searchResult = cdocDataService.newSearchResult(_this.searchForm, 0, [], new facets_1.Facets());
        _this.listSearchResult = cdocDataService.newSearchResult(_this.listSearchForm, 0, [], new facets_1.Facets());
        return _this;
    }
    CommonDocAlbumpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        if (!(this.maxAllowedItems > 0)) {
            console.warn('album not allowed');
            this.record = undefined;
            this.searchForm = undefined;
            this.listSearchForm = undefined;
            this.errorResolver.redirectAfterRouterError(error_resolver_1.ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            this.cd.markForCheck();
            return;
        }
        this.route.data.subscribe(function (data) {
            _this.commonRoutingService.setRoutingState(common_routing_service_1.RoutingState.DONE);
            _this.configureProcessingOfResolvedData(_this.config);
            if (_this.processError(data)) {
                return;
            }
            _this.baseSearchUrl = (data.baseSearchUrl.data ? data.baseSearchUrl.data : _this.baseSearchUrl);
            if (data.flgDoEdit === true) {
                _this.mode = 'edit';
            }
            // console.log('route: search for ', data);
            _this.searchForm = _this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);
            _this.listSearchForm = _this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);
            _this.setMetaTags(_this.config, null, null);
            _this.trackingProvider.trackPageView();
            _this.setPageLayoutAndStyles();
            _this.curRecordNr = _this.listSearchForm.pageNum;
            return _this.doSearch();
        });
    };
    CommonDocAlbumpageComponent.prototype.onCurRecordChange = function (page) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        if (page < 1) {
            page = 1;
        }
        if (page > this.listSearchResult.recordCount) {
            page = 1;
        }
        this.curRecordNr = page;
        this.searchForm.pageNum = this.curRecordNr;
        this.listSearchForm.pageNum = this.curRecordNr;
        this.redictToSearch();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onShowDoc = function (cdoc) {
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrlDefault);
        this.cdocRoutingService.navigateToShow(cdoc, this.cdocRoutingService.getLastSearchUrl());
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onPageChange = function (page) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.listSearchForm.pageNum = +page;
        this.loadListResult();
        this.cd.markForCheck();
        this.pageUtils.scrollToTop();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onPerPageChange = function (perPage) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.listSearchForm.perPage = perPage;
        this.listSearchForm.pageNum = 1;
        if (perPage + '' === '1') {
            this.doShow();
        }
        this.loadListResult();
        this.cd.markForCheck();
        this.pageUtils.scrollToTop();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onSortChange = function (sort) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.listSearchForm.sort = sort;
        this.listSearchForm.pageNum = 1;
        this.searchForm.sort = sort;
        this.doSearch();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onLayoutChange = function (layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.layout = layout;
        if (layout.toString() === layout_service_1.Layout.PAGE.toString()) {
            this.doShow();
        }
        else if (this.listSearchForm.perPage === 1) {
            this.onPerPageChange(10);
        }
        this.loadListResult();
        this.cd.markForCheck();
        this.pageUtils.scrollToTop();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onPlayerStarted = function (cdoc) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.pauseAutoPlay = true;
    };
    CommonDocAlbumpageComponent.prototype.onPlayerStopped = function (cdoc) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        this.pauseAutoPlay = false;
    };
    CommonDocAlbumpageComponent.prototype.submitSave = function (event) {
        if (this.doSave() === true) {
            return this.doShow();
        }
        return false;
    };
    CommonDocAlbumpageComponent.prototype.doEdit = function () {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/edit', this.albumKey, this.listSearchForm.sort, 10,
            Math.round(this.curRecordNr / 10) || 1].join('/'));
        return false;
    };
    CommonDocAlbumpageComponent.prototype.doShow = function () {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/show', this.albumKey, this.listSearchForm.sort, 1,
            ((this.listSearchForm.pageNum - 1) * this.listSearchForm.perPage) + 1].join('/'));
        return false;
    };
    CommonDocAlbumpageComponent.prototype.redictToSearch = function () {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/show', this.albumKey, this.listSearchForm.sort, 1,
            this.curRecordNr].join('/'));
        return false;
    };
    CommonDocAlbumpageComponent.prototype.doSaveAsFile = function () {
        var albumEntry = { key: this.albumKey, ids: this.editFormGroup.getRawValue()['albumIds'] };
        var blob = new Blob([JSON.stringify(albumEntry, null, 2)], { type: 'application/json' });
        var filename = this.albumKey + '.mytbalbum.json';
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else {
            var e = document.createEvent('MouseEvents'), a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
        }
        return true;
    };
    CommonDocAlbumpageComponent.prototype.onFileSelected = function (event) {
        for (var _i = 0, _a = event.srcElement.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.processFile(file);
        }
    };
    CommonDocAlbumpageComponent.prototype.onFileDropped = function (event) {
        var me = this;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var droppedFile = _a[_i];
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    me.processFile(file);
                });
                return;
            }
        }
    };
    CommonDocAlbumpageComponent.prototype.onAlbumIntervalNext = function () {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        var me = this;
        if (me.pauseAutoPlay) {
            return false;
        }
        me.onCurRecordChange(me.curRecordNr + 1);
        this.redictToSearch();
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onAlbumIntervalStarted = function () {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }
        var me = this;
        me.listSearchForm.pageNum = me.curRecordNr;
        return false;
    };
    CommonDocAlbumpageComponent.prototype.onAlbumReset = function () {
        this.editFormGroup.patchValue({ albumIds: '' });
        return this.doSave() && this.doShow();
    };
    CommonDocAlbumpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseAlbumUrl = componentConfig.baseAlbumUrl;
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.autoPlayAllowed = componentConfig.autoPlayAllowed;
        this.maxAllowedItems = componentConfig.maxAllowedItems;
    };
    CommonDocAlbumpageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    CommonDocAlbumpageComponent.prototype.processError = function (data) {
        var flgSearchFormError = error_resolver_1.ErrorResolver.isResolverError(data.searchForm);
        var flgBaseSearchUrlError = error_resolver_1.ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgSearchFormError && !flgBaseSearchUrlError) {
            return false;
        }
        var newUrl, msg, code;
        var errorCode = (flgSearchFormError ? data.searchForm.error.code : data.baseSearchUrl.error.code);
        var searchForm = undefined;
        if (flgSearchFormError) {
            if (data.searchForm.error.data) {
                searchForm = this.cdocDataService.createSanitizedSearchForm(data.searchForm.error.data);
            }
            else {
                searchForm = this.cdocDataService.newSearchForm({});
            }
        }
        else if (data.searchForm.data) {
            searchForm = data.searchForm.data;
        }
        switch (errorCode) {
            case cdoc_album_resolver_1.CommonDocAlbumResolver.ERROR_INVALID_DOC_ID:
                code = error_resolver_1.ErrorResolver.ERROR_INVALID_DATA;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
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
        return;
    };
    CommonDocAlbumpageComponent.prototype.setMetaTags = function (config, pdoc, record) {
        this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSearchPage', {}, 'Search');
        this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSearchPage', {}, 'Search');
        this.pageUtils.setRobots(false, false);
        this.pageUtils.setMetaLanguage();
    };
    CommonDocAlbumpageComponent.prototype.setPageLayoutAndStyles = function () {
        this.pageUtils.setGlobalStyle('', 'sectionStyle');
        this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
            '.show-on-fullpage-block { display: block; } ' +
            'body { background: #130b0b; } ' +
            '.image-content-container {background: #130b0b !IMPORTANT; border: none !IMPORTANT;} ', 'fullPageStyle');
    };
    CommonDocAlbumpageComponent.prototype.processFile = function (file) {
        var me = this;
        var reader = new FileReader();
        var maxLength = 10000000;
        if (file.size > maxLength) {
            me.toastr.warning('Die Album-Datei darf höchstes ' + maxLength / 1000000 + 'MB sein.', 'Oje!');
            return;
        }
        if (!file.name.toLowerCase().endsWith('.mytbalbum.json')) {
            me.toastr.warning('Es dürfen nur .mytbalbum.json Dateien geladen werden.', 'Oje!');
            return;
        }
        reader.onload = (function (theFile) {
            return function (e) {
                var src = e.target.result;
                var albumEntry = JSON.parse(src);
                me.editFormGroup.patchValue({ albumIds: albumEntry.ids || '' });
                return me.doSave() && me.doShow();
            };
        })(file);
        // Read in the file as a data URL.
        reader.readAsText(file);
    };
    CommonDocAlbumpageComponent.prototype.doSave = function () {
        var ids = this.editFormGroup.getRawValue()['albumIds'];
        if (this.idCsvValidationRule.isValid(ids)) {
            this.cdocAlbumService.removeDocIds(this.albumKey);
            for (var _i = 0, _a = ids.split(','); _i < _a.length; _i++) {
                var id = _a[_i];
                this.cdocAlbumService.addIdToAlbum(this.albumKey, id);
            }
            return true;
        }
        else {
            this.toastr.warning('Leider stimmt in der Liste was nicht. Hast du die Ids nur mit "," getrennt?', 'Oje!');
            return false;
        }
    };
    CommonDocAlbumpageComponent.prototype.doSearch = function () {
        this.initialized = false;
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrl);
        this.cdocRoutingService.setLastSearchUrl(this.route.toString());
        var ids = this.searchForm.moreFilter.replace(/id:/g, '').split(',');
        this.editFormGroup = this.fb.group({
            albumIds: [ids.join(',')]
        });
        var me = this;
        me.searchResult = this.cdocDataService.newSearchResult(me.searchForm, 0, [], undefined);
        me.listSearchResult = this.cdocDataService.newSearchResult(me.listSearchForm, 0, [], undefined);
        me.record = undefined;
        me.cd.markForCheck();
        if (ids.length <= 0 || ids[0] === '') {
            return;
        }
        me.showLoadingSpinner = true;
        me.cdocDataService.doMultiSearch(me.searchForm, ids).then(function doneSearch(cdocSearchResult) {
            me.initialized = true;
            me.searchResult = cdocSearchResult;
            me.loadListResult();
            me.loadRecord(me.curRecordNr);
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
            me.pageUtils.scrollToTop();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
        });
    };
    CommonDocAlbumpageComponent.prototype.loadRecord = function (nr) {
        this.curRecordNr = nr;
        this.pauseAutoPlay = false;
        if (this.searchResult !== undefined && this.searchResult.currentRecords.length >= nr) {
            this.record = this.searchResult.currentRecords[nr - 1];
        }
        else {
            this.record = undefined;
        }
    };
    CommonDocAlbumpageComponent.prototype.loadListResult = function () {
        var listRecords = [];
        for (var i = (this.listSearchForm.pageNum - 1) * this.listSearchForm.perPage; (i < this.listSearchForm.pageNum * this.listSearchForm.perPage &&
            i < this.searchResult.recordCount); i++) {
            listRecords.push(this.searchResult.currentRecords[i]);
        }
        var listCdocSearchResult = this.cdocDataService.newSearchResult(this.listSearchForm, this.searchResult.recordCount, listRecords, undefined);
        this.listSearchResult = listCdocSearchResult;
        this.curRecordNr = this.listSearchForm.pageNum;
    };
    return CommonDocAlbumpageComponent;
}(pdoc_page_component_1.AbstractPageComponent));
exports.CommonDocAlbumpageComponent = CommonDocAlbumpageComponent;
//# sourceMappingURL=cdoc-albumpage.component.js.map