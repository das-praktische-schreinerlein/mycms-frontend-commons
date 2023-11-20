import {ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {
    IdCsvValidationRule,
    IdValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {Layout, LayoutService} from '../../../angular-commons/services/layout.service';
import {CommonRoutingService, RoutingState} from '../../../angular-commons/services/common-routing.service';
import {ErrorResolver} from '../../resolver/error.resolver';
import {CommonDocRoutingService} from '../../services/cdoc-routing.service';
import {GenericSearchFormConverter} from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import {PageUtils} from '../../../angular-commons/services/page.utils';
import {GenericTrackingService} from '../../../angular-commons/services/generic-tracking.service';
import {CommonDocAlbumService} from '../../services/cdoc-album.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {ResolvedData} from '../../../angular-commons/resolver/resolver.utils';
import {CommonDocAlbumResolver} from '../../resolver/cdoc-album.resolver';
import {AbstractPageComponent} from '../../../angular-commons/components/abstract-page.component';
import {PlatformService} from '../../../angular-commons/services/platform.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {CommonEnvironment} from '../../../frontend-section-commons/common-environment';
import {CommonDocPlaylistService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-playlist.service';
import {AngularHtmlService} from '../../../angular-commons/services/angular-html.service';
import {CommonDocMultiActionManager} from '../../services/cdoc-multiaction.manager';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocSearchFormUtils} from '../../services/cdoc-searchform-utils.service';

export interface CommonDocAlbumpageComponentConfig {
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    baseAlbumUrl: string;
    autoPlayAllowed: boolean;
    maxAllowedItems: number;
    m3uAvailable?: boolean;
}

export abstract class CommonDocAlbumpageComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    protected idCsvValidationRule = new IdCsvValidationRule(true);

    idValidationRule = new IdValidationRule(true);

    searchResult: S;
    listSearchResult: S;
    record: R;
    searchForm: F;
    listSearchForm: F;
    baseAlbumUrl: string;
    mode = 'show';
    layout = Layout.FLAT;
    curRecordNr = 0;
    albumKey = 'Current';
    autoPlayAllowed = false;
    maxAllowedItems = -1;
    pauseAutoPlay = false;
    m3uAvailable = false;
    multiActionSelectValueMap = new Map<string, IMultiSelectOption[]>();

    public editFormGroup: FormGroup = this.fb.group({
        albumIds: ''
    });

    constructor(protected route: ActivatedRoute, protected commonRoutingService: CommonRoutingService,
                protected errorResolver: ErrorResolver, protected cdocDataService: D,
                protected searchFormConverter: GenericSearchFormConverter<F>,
                protected cdocRoutingService: CommonDocRoutingService, protected toastr: ToastrService,
                protected pageUtils: PageUtils, protected cd: ChangeDetectorRef, protected trackingProvider: GenericTrackingService,
                public fb: FormBuilder, protected cdocAlbumService: CommonDocAlbumService, protected appService: GenericAppService,
                protected platformService: PlatformService, protected layoutService: LayoutService,
                protected searchFormUtils: SearchFormUtils, protected cdocSearchFormUtils: CommonDocSearchFormUtils,
                protected playlistService: CommonDocPlaylistService<R>,
                protected multiActionManager: CommonDocMultiActionManager<R, F, S, D>,
                protected environment: CommonEnvironment) {
        super(route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment);
        this.searchForm = cdocDataService.newSearchForm({});
        this.listSearchForm = cdocDataService.newSearchForm({});
        this.searchResult = cdocDataService.newSearchResult(this.searchForm, 0, [], new Facets());
        this.listSearchResult = cdocDataService.newSearchResult(this.listSearchForm, 0, [], new Facets());
    }

    protected configureProcessing() {
        if (this.maxAllowedItems <= 0) {
            console.warn('album not allowed');
            this.record = undefined;
            this.searchForm = undefined;
            this.listSearchForm = undefined;

            this.errorResolver.redirectAfterRouterError(ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            this.cd.markForCheck();
            return;
        }

        this.route.data.subscribe(
            (data: { searchForm: ResolvedData<F>, flgDoEdit: boolean, baseSearchUrl: ResolvedData<string> }) => {
                this.commonRoutingService.setRoutingState(RoutingState.DONE);

                this.configureProcessingOfResolvedData(this.config);
                if (this.processError(data)) {
                    return;
                }

                this.baseSearchUrl = (data.baseSearchUrl.data ? data.baseSearchUrl.data : this.baseSearchUrl);

                if (data.flgDoEdit === true) {
                    this.mode = 'edit';
                    this.setEditPageLayoutAndStyles();
                } else {
                    this.setShowPageLayoutAndStyles();
                }

                // console.log('route: search for ', data);
                this.searchForm = this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);
                this.listSearchForm = this.cdocDataService.cloneSanitizedSearchForm(data.searchForm.data);


                this.setMetaTags(this.config, null, null);
                this.trackingProvider.trackPageView();

                this.curRecordNr = this.listSearchForm.pageNum;
                return this.doSearch();
            });
    }

    onCurRecordChange(page: number) {
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
    }

    onShowDoc(cdoc: R) {
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrlDefault);
        this.cdocRoutingService.navigateToShow(cdoc, this.cdocRoutingService.getLastSearchUrl());
        return false;
    }

    onPageChange(page: number) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.listSearchForm.pageNum = +page;
        this.loadListResult();
        this.cd.markForCheck();
        this.pageUtils.scrollToTop();

        return false;
    }

    onPerPageChange(perPage: number) {
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
    }

    onSortChange(sort: string) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.listSearchForm.sort = sort;
        this.listSearchForm.pageNum = 1;
        this.searchForm.sort = sort;
        this.doSearch();

        return false;
    }

    onLayoutChange(layout: Layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.layout = layout;
        if (layout.toString() === Layout.PAGE.toString()) {
            this.doShow();
        } else if (this.listSearchForm.perPage === 1) {
            this.onPerPageChange(10);
        }

        this.loadListResult();
        this.cd.markForCheck();
        this.pageUtils.scrollToTop();

        return false;
    }

    onPlayerStarted(cdoc: R) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.pauseAutoPlay = true;
    }

    onPlayerStopped(cdoc: R) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.pauseAutoPlay = false;
    }

    submitSave(event: Event): boolean {
        if (this.doSave() === true) {
            return this.doShow();
        }

        return false;
    }

    doEdit(): boolean {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/edit', this.albumKey, this.listSearchForm.sort, 10,
            Math.round(this.curRecordNr / 10) || 1].join('/'));
        return false;
    }

    doShow(): boolean {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/show', this.albumKey, this.listSearchForm.sort, 1,
            ((this.listSearchForm.pageNum - 1) * this.listSearchForm.perPage) + 1].join('/'));
        return false;
    }

    redirectToSearch(): boolean {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/show', this.albumKey, this.listSearchForm.sort, 1,
            this.curRecordNr].join('/'));
        return false;
    }

    redirectToEdit(): boolean {
        this.commonRoutingService.navigateByUrl([this.baseAlbumUrl + '/edit', this.albumKey, this.listSearchForm.sort,
            this.listSearchForm.perPage, this.listSearchForm.pageNum].join('/'));
        return false;
    }

    doSaveAsFile(): boolean {
        const albumEntry = { key: this.albumKey, ids: this.editFormGroup.getRawValue()['albumIds']};
        const filename = this.albumKey + '.mytbalbum.json';
        AngularHtmlService.browserSaveTextAsFile(JSON.stringify(albumEntry, null, 2), filename, 'application/json');

        return true;
    }

    doSaveAsM3U(): boolean {
        if (this.m3uAvailable !== true) {
            return true;
        }

        const filename = this.albumKey + '.mytbalbum.m3u';
        const ids = this.searchForm.moreFilter.replace(/id:/g, '').split(',');
        const m3uSearchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        m3uSearchForm.perPage = 99999;
        m3uSearchForm.pageNum = 1;

        this.showLoadingSpinner = true;
        this.cd.markForCheck();

        const me = this;
        this.cdocDataService.doMultiSearch(m3uSearchForm, ids).then(function doneSearch(cdocSearchResult: S) {
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
            AngularHtmlService.browserSaveTextAsFile(
                me.playlistService.generateM3uForRecords('', cdocSearchResult.currentRecords), filename, 'application/m3u');
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.cd.markForCheck();
        });

        return true;
    }

    onFileSelected(event: any) {
        for (const file of event.srcElement.files) {
            this.processFile(file);
        }
    }

    onFileDropped(event: UploadEvent) {
        const me = this;
        for (const droppedFile of event.files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    me.processFile(file);
                });

                return;
            }
        }
    }

    onAlbumIntervalNext(): boolean {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        const me = this;
        if (me.pauseAutoPlay) {
            return false;
        }

        me.onCurRecordChange(me.curRecordNr + 1);
        this.redirectToSearch();

        return false;
    }

    onAlbumIntervalStarted(): boolean {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        const me = this;
        me.listSearchForm.pageNum = me.curRecordNr;

        return false;
    }

    onAlbumReset(): boolean {
        this.editFormGroup.patchValue({albumIds:  ''});
        return this.doSave() && this.doShow();
    }

    onSubmitSelectedMultiActions(event): boolean {
        this.showLoadingSpinner = true;
        this.cd.markForCheck();

        this.multiActionManager.processActionTags().then(value => {
            this.toastr.info('Aktionen wurden erfolgreich ausgeführt.', 'Juhu!');
            this.searchForm.moreFilter = 'id:' + this.cdocAlbumService.getDocIds(this.albumKey).join(',');
            this.doSearch();
        }).catch(reason => {
            this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            this.showLoadingSpinner = false;
            this.cd.markForCheck();
        });

        return false;
    }

    protected abstract getComponentConfig(config: {}): CommonDocAlbumpageComponentConfig;

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.baseAlbumUrl = componentConfig.baseAlbumUrl;
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.autoPlayAllowed = componentConfig.autoPlayAllowed;
        this.maxAllowedItems = componentConfig.maxAllowedItems;
        this.m3uAvailable = componentConfig.m3uAvailable;
    }

    protected configureProcessingOfResolvedData(config: {}): void {
    }

    protected processError(data: { searchForm: ResolvedData<F>, flgDoEdit: boolean, baseSearchUrl: ResolvedData<string> }): boolean {
        const flgSearchFormError = ErrorResolver.isResolverError(data.searchForm);
        const flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgSearchFormError && !flgBaseSearchUrlError) {
            return false;
        }

        let newUrl, msg, code;
        const errorCode = (flgSearchFormError ? data.searchForm.error.code : data.baseSearchUrl.error.code);
        let searchForm = undefined;
        if (flgSearchFormError) {
            if (data.searchForm.error.data) {
                searchForm = this.cdocDataService.createSanitizedSearchForm(data.searchForm.error.data);
            } else {
                searchForm = this.cdocDataService.newSearchForm({});
            }
        } else if (data.searchForm.data) {
            searchForm = data.searchForm.data;
        }

        switch (errorCode) {
            case CommonDocAlbumResolver.ERROR_INVALID_DOC_ID:
                code = ErrorResolver.ERROR_INVALID_DATA;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = this.searchFormConverter.searchFormToUrl(
                    this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
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
    }

    protected setMetaTags(config: {}, pdoc: PDocRecord, record: CommonDocRecord): void {
        this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSearchPage',
            {}, 'Search');
        this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSearchPage',
            {}, 'Search');
        this.pageUtils.setRobots(false, false);
        this.pageUtils.setMetaLanguage();
    }

    protected setPageLayoutAndStyles(): void {
    }


    protected setShowPageLayoutAndStyles(): void {
        this.pageUtils.setGlobalStyle('', 'sectionStyle');
        this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
            '.show-on-fullpage-block { display: block; } ' +
            'body { background: #130b0b; } ' +
            '.image-content-container {background: #130b0b !important; border: none !important;} ', 'fullPageStyle');
    }

    protected setEditPageLayoutAndStyles(): void {
        this.pageUtils.setGlobalStyle('', 'fullPageStyle');
    }

    protected processFile(file: File): boolean {
        const me = this;
        const reader = new FileReader();
        const maxLength = 10000000;
        if (file.size > maxLength) {
            me.toastr.warning('Die Album-Datei darf höchstes ' + maxLength / 1000000 + 'MB sein.', 'Oje!');
            return;
        }
        if (!file.name.toLowerCase().endsWith('.mytbalbum.json')) {
            me.toastr.warning('Es dürfen nur .mytbalbum.json Dateien geladen werden.', 'Oje!');
            return;
        }

        reader.onload = (function(theFile) {
            return function(e) {
                const src = e.target.result;
                const albumEntry = JSON.parse(src);
                me.editFormGroup.patchValue({albumIds:  albumEntry.ids || ''});
                return me.doSave() && me.doShow();
            };
        })(file);

        // Read in the file as a data URL.
        reader.readAsText(file);
    }

    protected doSave(): boolean {
        const ids = this.editFormGroup.getRawValue()['albumIds'];
        if (this.idCsvValidationRule.isValid(ids)) {
            this.cdocAlbumService.removeDocIds(this.albumKey);
            for (const id of ids.split(',')) {
                if (id !== '') {
                    this.cdocAlbumService.addIdToAlbum(this.albumKey, id);
                }
            }
            return true;
        } else {
            this.toastr.warning('Leider stimmt in der Liste was nicht. Hast du die Ids nur mit "," getrennt?', 'Oje!');
            return false;
        }
    }

    protected doSearch() {
        this.initialized = false;
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrl);
        this.cdocRoutingService.setLastSearchUrl(this.route.toString());

        const ids = this.searchForm.moreFilter.replace(/id:/g, '').split(',');
        this.editFormGroup = this.fb.group({
            albumIds: [ids.join(',')]
        });

        const me = this;
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
        me.cdocDataService.doMultiSearch(me.searchForm, ids).then(function doneSearch(cdocSearchResult: S) {
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
    }

    protected generateMultiActionSelectValueMapFromSearchResult(searchResult: S, valueMap: Map<string, IMultiSelectOption[]>): void {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
                this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    }

    protected doCheckSearchResultAfterSearch(searchResult: S): void {
        const valueMap = new Map<string, IMultiSelectOption[]>();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;
    }

    protected loadRecord(nr: number): void {
        this.curRecordNr = nr;
        this.pauseAutoPlay = false;
        if (this.searchResult !== undefined && this.searchResult.currentRecords.length >= nr) {
            this.record = this.searchResult.currentRecords[nr - 1];
        } else {
            this.record = undefined;
        }
    }

    protected loadListResult(): void {
        const listRecords = [];
        for (let i = (this.listSearchForm.pageNum - 1) * this.listSearchForm.perPage;
             (i < this.listSearchForm.pageNum * this.listSearchForm.perPage &&
                 i < this.searchResult.recordCount); i++) {
            listRecords.push(this.searchResult.currentRecords[i]);
        }
        const listCdocSearchResult = this.cdocDataService.newSearchResult(this.listSearchForm, this.searchResult.recordCount,
            listRecords, undefined);

        this.listSearchResult = listCdocSearchResult;
        this.curRecordNr = this.listSearchForm.pageNum;
    }
}
