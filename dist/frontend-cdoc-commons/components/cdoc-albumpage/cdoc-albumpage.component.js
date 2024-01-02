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
import { IdCsvValidationRule, IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { Layout } from '../../../angular-commons/services/layout.service';
import { RoutingState } from '../../../angular-commons/services/common-routing.service';
import { ErrorResolver } from '../../resolver/error.resolver';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { CommonDocAlbumResolver } from '../../resolver/cdoc-album.resolver';
import { AbstractPageComponent } from '../../../angular-commons/components/abstract-page.component';
import { AngularHtmlService } from '../../../angular-commons/services/angular-html.service';
var CommonDocAlbumpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocAlbumpageComponent, _super);
    function CommonDocAlbumpageComponent(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr, pageUtils, cd, trackingProvider, fb, cdocAlbumService, appService, platformService, layoutService, searchFormUtils, cdocSearchFormUtils, playlistService, multiActionManager, environment) {
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
        _this.fb = fb;
        _this.cdocAlbumService = cdocAlbumService;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocSearchFormUtils = cdocSearchFormUtils;
        _this.playlistService = playlistService;
        _this.multiActionManager = multiActionManager;
        _this.environment = environment;
        _this.idCsvValidationRule = new IdCsvValidationRule(true);
        _this.idValidationRule = new IdValidationRule(true);
        _this.mode = 'show';
        _this.layout = Layout.FLAT;
        _this.curRecordNr = 0;
        _this.albumKey = 'Current';
        _this.autoPlayAllowed = false;
        _this.maxAllowedItems = -1;
        _this.pauseAutoPlay = false;
        _this.m3uAvailable = false;
        _this.multiActionSelectValueMap = new Map();
        _this.editFormGroup = _this.fb.group({
            albumIds: ''
        });
        _this.searchForm = cdocDataService.newSearchForm({});
        _this.listSearchForm = cdocDataService.newSearchForm({});
        _this.searchResult = cdocDataService.newSearchResult(_this.searchForm, 0, [], new Facets());
        _this.listSearchResult = cdocDataService.newSearchResult(_this.listSearchForm, 0, [], new Facets());
        return _this;
    }
    CommonDocAlbumpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        if (this.maxAllowedItems <= 0) {
            console.warn('album not allowed');
            this.record = undefined;
            this.searchForm = undefined;
            this.listSearchForm = undefined;
            this.errorResolver.redirectAfterRouterError(ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            this.cd.markForCheck();
            return;
        }
        this.route.data.subscribe(function (data) {
            _this.commonRoutingService.setRoutingState(RoutingState.DONE);
            _this.configureProcessingOfResolvedData(_this.config);
            if (_this.processError(data)) {
                return;
            }
            _this.baseSearchUrl = (data.baseSearchUrl.data ? data.baseSearchUrl.data : _this.baseSearchUrl);
            if (data.flgDoEdit === true) {
                _this.mode = 'edit';
                _this.setEditPageLayoutAndStyles();
            }
            else {
                _this.setShowPageLayoutAndStyles();
            }
            // console.log('route: search for ', data);
            _this.searchForm = _this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);
            _this.listSearchForm = _this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);
            _this.setMetaTags(_this.config, null, null);
            _this.trackingProvider.trackPageView();
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
        this.redirectToSearch();
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
        if (layout.toString() === Layout.PAGE.toString()) {
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
    CommonDocAlbumpageComponent.prototype.redirectToSearch = function () {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/show', this.albumKey, this.listSearchForm.sort, 1,
            this.curRecordNr].join('/'));
        return false;
    };
    CommonDocAlbumpageComponent.prototype.redirectToEdit = function () {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/edit', this.albumKey, this.listSearchForm.sort,
            this.listSearchForm.perPage, this.listSearchForm.pageNum].join('/'));
        return false;
    };
    CommonDocAlbumpageComponent.prototype.doSaveAsFile = function () {
        var albumEntry = { key: this.albumKey, ids: this.editFormGroup.getRawValue()['albumIds'] };
        var filename = this.albumKey + '.mytbalbum.json';
        AngularHtmlService.browserSaveTextAsFile(JSON.stringify(albumEntry, null, 2), filename, 'application/json');
        return true;
    };
    CommonDocAlbumpageComponent.prototype.doSaveAsM3U = function () {
        if (this.m3uAvailable !== true) {
            return true;
        }
        var filename = this.albumKey + '.mytbalbum.m3u';
        var ids = this.searchForm.moreFilter.replace(/id:/g, '').split(',');
        var m3uSearchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        m3uSearchForm.perPage = 99999;
        m3uSearchForm.pageNum = 1;
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        var me = this;
        this.cdocDataService.doMultiSearch(m3uSearchForm, ids).then(function doneSearch(cdocSearchResult) {
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
            AngularHtmlService.browserSaveTextAsFile(me.playlistService.generateM3uForRecords('', cdocSearchResult.currentRecords), filename, 'application/m3u');
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
        });
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
        this.redirectToSearch();
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
    CommonDocAlbumpageComponent.prototype.onSubmitSelectedMultiActions = function (event) {
        var _this = this;
        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        this.multiActionManager.processActionTags().then(function (value) {
            _this.toastr.info('Aktionen wurden erfolgreich ausgeführt.', 'Juhu!');
            _this.searchForm.moreFilter = 'id:' + _this.cdocAlbumService.getDocIds(_this.albumKey).join(',');
            _this.doSearch();
        }).catch(function (reason) {
            _this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            _this.showLoadingSpinner = false;
            _this.cd.markForCheck();
        });
        return false;
    };
    CommonDocAlbumpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseAlbumUrl = componentConfig.baseAlbumUrl;
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.autoPlayAllowed = componentConfig.autoPlayAllowed;
        this.maxAllowedItems = componentConfig.maxAllowedItems;
        this.m3uAvailable = componentConfig.m3uAvailable;
    };
    CommonDocAlbumpageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    CommonDocAlbumpageComponent.prototype.processError = function (data) {
        var flgSearchFormError = ErrorResolver.isResolverError(data.searchForm);
        var flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
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
            case CommonDocAlbumResolver.ERROR_INVALID_DOC_ID:
                code = ErrorResolver.ERROR_INVALID_DATA;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
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
        return;
    };
    CommonDocAlbumpageComponent.prototype.setMetaTags = function (config, pdoc, record) {
        this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSearchPage', {}, 'Search');
        this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSearchPage', {}, 'Search');
        this.pageUtils.setRobots(false, false);
        this.pageUtils.setMetaLanguage();
    };
    CommonDocAlbumpageComponent.prototype.setPageLayoutAndStyles = function () {
    };
    CommonDocAlbumpageComponent.prototype.setShowPageLayoutAndStyles = function () {
        this.pageUtils.setGlobalStyle('', 'sectionStyle');
        this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
            '.show-on-fullpage-block { display: block; } ' +
            'body { background: #130b0b; } ' +
            '.image-content-container {background: #130b0b !important; border: none !important;} ', 'fullPageStyle');
    };
    CommonDocAlbumpageComponent.prototype.setEditPageLayoutAndStyles = function () {
        this.pageUtils.setGlobalStyle('', 'fullPageStyle');
    };
    CommonDocAlbumpageComponent.prototype.processFile = function (file) {
        var me = this;
        var reader = new FileReader();
        var maxLength = 10000000;
        if (file.size > maxLength) {
            me.toastr.warning('Die Album-Datei darf höchstes ' + maxLength / 1000000 + 'MB sein.', 'Oje!');
            return;
        }
        if (!file.name.toLowerCase().endsWith('.json')) {
            me.toastr.warning('Es dürfen nur .json Dateien geladen werden.', 'Oje!');
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
                if (id !== '') {
                    this.cdocAlbumService.addIdToAlbum(this.albumKey, id);
                }
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
        if (ids.length <= 0 || ids[0] === '') {
            me.doCheckSearchResultAfterSearch(me.searchResult);
            me.loadListResult();
            me.loadRecord(me.curRecordNr);
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
            return;
        }
        me.showLoadingSpinner = true;
        me.cd.markForCheck();
        me.cdocDataService.doMultiSearch(me.searchForm, ids).then(function doneSearch(cdocSearchResult) {
            me.initialized = true;
            me.searchResult = cdocSearchResult;
            me.doCheckSearchResultAfterSearch(cdocSearchResult);
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
    CommonDocAlbumpageComponent.prototype.generateMultiActionSelectValueMapFromSearchResult = function (searchResult, valueMap) {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    };
    CommonDocAlbumpageComponent.prototype.doCheckSearchResultAfterSearch = function (searchResult) {
        var valueMap = new Map();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;
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
}(AbstractPageComponent));
export { CommonDocAlbumpageComponent };
//# sourceMappingURL=cdoc-albumpage.component.js.map