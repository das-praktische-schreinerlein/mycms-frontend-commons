import {ChangeDetectorRef, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '../../services/cdoc-routing.service';
import {Layout} from '../../../angular-commons/services/layout.service';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {PageUtils} from '../../../angular-commons/services/page.utils';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {GenericSearchFormConverter} from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {Subscription} from 'rxjs';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocSearchFormUtils} from '../../services/cdoc-searchform-utils.service';
import {CommonDocMultiActionManager} from '../../services/cdoc-multiaction.manager';
import {AngularHtmlService} from '../../../angular-commons/services/angular-html.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {GenericSearchOptions} from '@dps/mycms-commons/dist/search-commons/services/generic-search.service';

export interface CommonDocInlineSearchpageComponentConfig {
    maxAllowedM3UExportItems: number;
}

export class CommonDocInlineSearchpageComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent
    implements OnInit, OnDestroy {
    protected initialized = false;
    protected appStateSubscription: Subscription;
    protected searchOptions: GenericSearchOptions = {
        loadDetailsMode: undefined,
        showFacets: false,
        loadTrack: false,
        showForm: false
    }
    protected defaultLoadDetailsMode = undefined;


    showLoadingSpinner = false;
    Layout = Layout;
    m3uExportAvailable = false;
    maxAllowedM3UExportItems = -1;

    curPlayingRecord: R;
    pauseAutoPlay = false;
    playerIdPrefix = 'mdocInlineSearch_' + (Math.random() * 100).toFixed(0);

    searchResult: S;
    searchForm: F;
    multiActionSelectValueMap = new Map<string, IMultiSelectOption[]>();

    @Input()
    public params = {};

    @Input()
    public showForm = false;

    @Input()
    public showTimetable ? = false;

    @Input()
    public showLayout ? = false;

    @Input()
    public showResultList ? = false;

    @Input()
    public loadFacets ? = false;

    @Input()
    public loadTrack ? = false;

    @Input()
    public loadDetailsMode ?: string = undefined;

    @Input()
    public showOnlyIfRecordsFound = true;

    @Input()
    public showMultiActionHeader ? = false;

    @Input()
    public label: string;

    @Input()
    public baseSearchUrl ? = 'cdoc/';

    @Input()
    public searchLinkLabel?: string;

    @Input()
    public m3uLinkLabel?: string;

    @Input()
    public htmlId ?: string;

    @Input()
    public layout: Layout;

    @Input()
    public short ? = false;

    @Input()
    public perPageOnToSearchPage ? = 10;

    @Output()
    public show: EventEmitter<R> = new EventEmitter();

    @Output()
    public searchResultFound: EventEmitter<S> = new EventEmitter();

    constructor(protected appService: GenericAppService, protected commonRoutingService: CommonRoutingService,
                protected cdocDataService: D, protected searchFormConverter: GenericSearchFormConverter<F>,
                protected cdocRoutingService: CommonDocRoutingService, protected toastr: ToastrService,
                protected cd: ChangeDetectorRef, protected elRef: ElementRef, protected pageUtils: PageUtils,
                protected searchFormUtils: SearchFormUtils, protected cdocSearchFormUtils: CommonDocSearchFormUtils,
                protected multiActionManager: CommonDocMultiActionManager<R, F, S, D>) {
        super(cd);
        this.searchForm = this.cdocDataService.newSearchForm({});
        this.searchResult = this.cdocDataService.newSearchResult(this.searchForm, 0, [], new Facets());
    }

    ngOnInit() {
        // reset initialized
        this.initialized = false;

        // do search
        this.appStateSubscription = this.appService.getAppState().subscribe(appState => {
            if (appState === AppState.Ready) {
                this.configureComponent(this.appService.getAppConfig());
                return this.doSearchWithParams(this.params);
            }
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
    }

    onShowDoc(cdoc: R) {
        this.cdocRoutingService.navigateToShow(cdoc, '');
        return false;
    }

    onPageChange(page: number) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.searchForm.pageNum = +page;
        this.doSearch();
        this.pageUtils.scrollToTopOfElement(this.elRef);

        return false;
    }

    onPerPageChange(perPage: number) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.searchForm.perPage = perPage;
        this.searchForm.pageNum = 1;
        this.doSearch();

        return false;
    }

    onSortChange(sort: string) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.searchForm.sort = sort;
        this.searchForm.pageNum = 1;
        this.doSearch();

        return false;
    }

    onLayoutChange(layout: Layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.layout = layout;
        this.cd.markForCheck();

        return false;
    }

    onSearchDoc(cdocSearchForm: F) {
        this.searchForm = cdocSearchForm;
        this.doSearch();
        return false;
    }

    getToSearchUrl() {
        const lSearchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        lSearchForm.perPage = this.perPageOnToSearchPage;
        return this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, lSearchForm);
    }

    onToSearchPage(event: any) {
        this.commonRoutingService.navigateByUrl(this.getToSearchUrl());
        return false;
    }

    onPlayerStarted(cdoc: R) {
        this.pauseAutoPlay = true;
        this.onPlayingRecordChange(cdoc, true);
    }

    onPlayerStopped(cdoc: R) {
        this.pauseAutoPlay = false;
        this.onPlayingRecordChange(cdoc, false);
    }

    onPlayingRecordChange(playingRecord: R, started: boolean) {
        if (started) {
            this.curPlayingRecord = playingRecord;
            return;
        }

        const idx = this.searchResult.currentRecords.indexOf(playingRecord);
        if (idx < this.searchResult.currentRecords.length - 1) {
            this.curPlayingRecord = this.searchResult.currentRecords[idx + 1];
            this.cd.markForCheck();
        }

        return false;
    }

    onSubmitSelectedMultiActions(event): boolean {
        this.showLoadingSpinner = true;
        this.cd.markForCheck();

        this.multiActionManager.processActionTags().then(value => {
            this.toastr.info('Aktionen wurden erfolgreich ausgeführt.', 'Juhu!');
            this.doSearch();
        }).catch(reason => {
            this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            this.showLoadingSpinner = false;
            this.cd.markForCheck();
        });

        return false;
    }

    onM3UExport(): boolean {
        this.showLoadingSpinner = true;
        this.cd.markForCheck();

        this.cdocDataService.export(this.searchForm, 'm3uplaylist', undefined).then(value => {
            this.toastr.info('Export wurde erfolgreich ausgeführt.', 'Juhu!');
            this.showLoadingSpinner = false;
            this.cd.markForCheck();
            AngularHtmlService.browserSaveTextAsFile(value, 'playlist.m3u', 'application/m3u');
        }).catch(reason => {
            this.toastr.error('Leider trat ein Fehler auf :-(.', 'Oje!');
            this.showLoadingSpinner = false;
            this.cd.markForCheck();
        });

        return true;
    }

    protected getComponentConfig(config: {}): CommonDocInlineSearchpageComponentConfig {
        return {
            maxAllowedM3UExportItems: BeanUtils.getValue(config, 'services.serverItemExport.maxAllowedM3UItems')
        };
    }

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.maxAllowedM3UExportItems = componentConfig.maxAllowedM3UExportItems;
    }

    protected updateData(): void {
        if (this.initialized) {
            return this.doSearchWithParams(this.params);
        }

    }

    protected doSearchWithParams(params: any) {
        // console.log('doSearchWithParams params:', params);
        this.searchFormConverter.paramsToSearchForm(params, {}, this.searchForm);
        this.searchForm = this.cdocDataService.cloneSanitizedSearchForm(this.searchForm);
        this.doSearch();
    }

    protected doSearch(): boolean {
        // prepare searchform for consistency
        this.searchFormConverter.paramsToSearchForm(
            this.searchFormConverter.searchFormToValueMap(this.searchForm),
            {},
            this.searchForm,
            {});

        // console.log('doSearch form:', this.searchForm);
        const me = this;
        me.showLoadingSpinner = true;
        me.cd.markForCheck();

        this.searchOptions.loadDetailsMode = this.loadDetailsMode || this.defaultLoadDetailsMode;
        this.searchOptions.showFacets = this.showForm || this.loadFacets || (this.showTimetable ? ['week_is', 'month_is'] : false);
        this.searchOptions.loadTrack = this.loadTrack;
        this.searchOptions. showForm = this.showForm;

        this.cdocDataService.search(this.searchForm, this.searchOptions).then(function doneSearch(cdocSearchResult) {
            me.showLoadingSpinner = false;

            if (cdocSearchResult === undefined) {
                // console.log('empty searchResult', cdocSearchResult);
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            } else {
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
    }

    protected generateMultiActionSelectValueMapFromSearchResult(searchResult: S, valueMap: Map<string, IMultiSelectOption[]>): void {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
                this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    }

    protected doCheckSearchResultAfterSearch(searchResult: S): void {
        const config = this.appService.getAppConfig();
        const maxAllowedItems = BeanUtils.getValue(config, 'services.serverItemExport.maxAllowedM3UItems');
        if (maxAllowedItems > 0 && this.m3uLinkLabel && searchResult && searchResult.recordCount > 0 &&
            maxAllowedItems > searchResult.recordCount) {
            this.m3uExportAvailable = true;
        } else {
            this.m3uExportAvailable = false;
        }

        const valueMap = new Map<string, IMultiSelectOption[]>();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;
    }
}
