import {ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '../services/cdoc-routing.service';
import {
    Layout,
    LayoutService,
    LayoutSize,
    LayoutSizeData,
    SearchFormLayout
} from '../../angular-commons/services/layout.service';
import {ResolvedData} from '../../angular-commons/resolver/resolver.utils';
import {ErrorResolver} from '../resolver/error.resolver';
import {IdValidationRule} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '../../angular-commons/services/page.utils';
import {CommonRoutingService, RoutingState} from '../../angular-commons/services/common-routing.service';
import {GenericTrackingService} from '../../angular-commons/services/generic-tracking.service';
import {PlatformService} from '../../angular-commons/services/platform.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {GenericSearchFormSearchFormConverter} from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import {CommonSectionSearchFormResolver} from '../resolver/cdoc-section-searchform.resolver';
import {AbstractPageComponent} from '../../frontend-pdoc-commons/components/pdoc-page.component';
import {CommonEnvironment} from '../../frontend-pdoc-commons/common-environment';
import {CommonDocMultiActionManager} from '../services/cdoc-multiaction.manager';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {SearchFormUtils} from '../../angular-commons/services/searchform-utils.service';
import {AngularHtmlService} from '../../angular-commons/services/angular-html.service';
import {CommonDocSearchFormUtils} from '../services/cdoc-searchform-utils.service';

export interface CommonDocSearchpageComponentConfig {
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    maxAllowedM3UExportItems: number;
    availableCreateActionTypes: String[];
}

export abstract class CommonDocSearchpageComponent<R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    idValidationRule = new IdValidationRule(true);
    Layout = Layout;
    SearchFormLayout = SearchFormLayout;
    LayoutSize = LayoutSize;

    pdoc: PDocRecord;
    searchResult: S;
    searchForm: F;
    layout = Layout.FLAT;
    sort = 'relevance';
    perPage = 10;
    searchFormLayout: SearchFormLayout = SearchFormLayout.GRID;
    showSearchFormElements = true;
    pauseAutoPlay = false;
    anchor = '';
    m3uExportAvailable = false;
    maxAllowedM3UExportItems = -1;
    availableCreateActionType: String;
    availableCreateActionTypes: String[] = [];

    multiActionSelectValueMap = new Map<string, IMultiSelectOption[]>();

    constructor(protected route: ActivatedRoute, protected commonRoutingService: CommonRoutingService,
                protected errorResolver: ErrorResolver, protected cdocDataService: D,
                protected searchFormConverter: GenericSearchFormSearchFormConverter<F>,
                protected cdocRoutingService: CommonDocRoutingService, protected toastr: ToastrService,
                protected pageUtils: PageUtils, protected cd: ChangeDetectorRef,
                protected trackingProvider: GenericTrackingService, protected appService: GenericAppService,
                protected platformService: PlatformService, protected layoutService: LayoutService,
                protected searchFormUtils: SearchFormUtils, protected cdocSearchFormUtils: CommonDocSearchFormUtils,
                protected multiActionManager: CommonDocMultiActionManager<R, F, S, D>, protected environment: CommonEnvironment) {
        super(route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment);
        this.searchForm = cdocDataService.newSearchForm({});
        this.searchResult = cdocDataService.newSearchResult(this.searchForm, 0, [], new Facets());
    }

    protected configureProcessing() {
        const me = this;
        this.route.fragment.subscribe(value => {
            this.anchor = this.idValidationRule.sanitize(value);
        });
        this.route.data.subscribe(
            (data: { searchForm: ResolvedData<F>, pdoc: ResolvedData<PDocRecord>,
                flgDoSearch: boolean, baseSearchUrl: ResolvedData<string> }) => {
                me.commonRoutingService.setRoutingState(RoutingState.DONE);
                this.availableCreateActionType = undefined;
                me.onResize(this.layoutSizeObservable.getValue());

                me.configureProcessingOfResolvedData(me.config);
                if (me.processError(data)) {
                    return;
                }

                me.pdoc = data.pdoc ? data.pdoc.data : undefined;
                me.baseSearchUrl = (data.baseSearchUrl.data ? data.baseSearchUrl.data : me.baseSearchUrl);
                if (!data.flgDoSearch) {
                    // console.log('ngOnInit: redirect for ', data);
                    return this.redirectToSearch();
                }

                // console.log('route: search for ', data);
                this.searchForm = data.searchForm.data;
                this.setPageLayoutAndStyles();
                this.perPage = this.searchForm.perPage;
                this.sort = this.searchForm.sort;

                this.doProcessAfterResolvedData({});

                this.setMetaTags(me.config, me.pdoc, null);

                this.pageUtils.setMetaLanguage();

                this.trackingProvider.trackPageView();

                return this.doSearch();
            }
        );
    }

    onShowDoc(cdoc: R) {
        let predecessor = undefined;
        let successor = undefined;
        const lastSeachUrl = this.cdocRoutingService.getLastSearchUrl();
        if (this.searchResult && this.searchResult.recordCount > 0) {
            const records = this.searchResult.currentRecords;
            const index = records.findIndex(value => value.id === cdoc.id);
            if (index > -1) {
                if (index > 0) {
                    predecessor = lastSeachUrl + '#redirect' + records[index - 1].id;
                } else {
                    if (this.searchForm.pageNum > 1) {
                        const predecessorSearchForm = this.cdocDataService.createSanitizedSearchForm(this.searchForm);
                        predecessorSearchForm.pageNum = this.searchForm.pageNum - 1;
                        predecessor = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, predecessorSearchForm) + '#redirectLast';
                    }
                }
                if (index >= 0 && index < records.length - 1) {
                    successor = lastSeachUrl + '#redirect' + records[index + 1].id;
                } else {
                    if (this.searchForm.pageNum < this.searchResult.recordCount / this.searchForm.perPage) {
                        const successorSearchForm = this.cdocDataService.createSanitizedSearchForm(this.searchForm);
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
    }

    onPageChange(page: number, scroll: boolean) {
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
    }

    onPerPageChange(perPage: number) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.searchForm.perPage = perPage;
        this.searchForm.pageNum = 1;
        // console.log('onPerPageChange: redirect to perPage', perPage);
        this.redirectToSearch();

        return false;
    }

    onSortChange(sort: string) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.searchForm.sort = sort;
        this.searchForm.pageNum = 1;
        // console.log('onSortChange: redirect to sort', sort);
        this.redirectToSearch();

        return false;
    }

    onLayoutChange(layout: Layout) {
        if (!this.initialized) {
            // ignore changes if not initialized
            return;
        }

        this.layout = layout;
        if (layout.toString() === Layout.PAGE.toString()) {
            this.onPerPageChange(1);
        } else if (this.perPage === 1) {
            this.onPerPageChange(10);
        }
//        this.redirectToSearch();
        this.cd.markForCheck();
        return false;
    }

    onSearchDoc(searchForm: F) {
        const origSearchForm = this.searchForm;
        this.searchForm = searchForm;
        this.searchForm.perPage = origSearchForm.perPage;
        this.searchForm.sort = origSearchForm.sort;
        this.searchForm.pageNum = 1;
        // console.log('onSearchDoc: redirect to ', searchForm);
        this.redirectToSearch();
        return false;
    }

    onShowFormChanged(showForm: boolean) {
        this.showSearchFormElements = showForm;
        this.onResize(this.layoutSizeObservable.getValue());
        return false;
    }

    onTimeTableColumnClicked(month: string) {
        this.searchForm.when = month;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    }
    onTypeTableColumnClicked(type: string) {
        this.searchForm.type = type;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    }

    onInitialTableColumnClicked(initial: string) {
        this.searchForm.initial = initial;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();
        return false;
    }

    onTagcloudClicked(filterValue: any, filter: string) {
        this.searchForm[filter] = filterValue;
        this.searchForm.pageNum = 1;
        this.redirectToSearch();

        return false;
    }

    onPlayerStarted(cdoc: R) {
        this.pauseAutoPlay = true;
    }

    onPlayerStopped(cdoc: R) {
        this.pauseAutoPlay = false;
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

    protected redirectToSearch() {
        // reset initialized
        this.initialized = false;

        const url = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm);
        // console.log('redirectToSearch: redirect to ', url);

        this.commonRoutingService.navigateByUrl(url);
        return false;
    }

    protected onResize(layoutSizeData: LayoutSizeData): void {
        if (this.platformService.isClient() && layoutSizeData.layoutSize >= LayoutSize.VERYBIG && this.showSearchFormElements &&
            !this.layoutService.isPrintMode()) {
            this.searchFormLayout = SearchFormLayout.STACKED;
        } else {
            this.searchFormLayout = SearchFormLayout.GRID;
        }

        this.cd.markForCheck();
    }

    protected abstract getComponentConfig(config: {}): CommonDocSearchpageComponentConfig;

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.maxAllowedM3UExportItems = componentConfig.maxAllowedM3UExportItems;
        this.availableCreateActionTypes = componentConfig.availableCreateActionTypes || [];
    }

    protected configureProcessingOfResolvedData(config: {}): void {
    }

    protected doProcessAfterResolvedData(config: {}): void {
    }

    protected setMetaTags(config: {}, pdoc: PDocRecord, record: CommonDocRecord): void {
        if (pdoc) {
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSectionSearchPage',
                {title: pdoc.heading}, pdoc.heading);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSectionSearchPage',
                {title: pdoc.heading, teaser: pdoc.teaser}, pdoc.teaser);
            this.pageUtils.setRobots(false, false);
        } else {
            this.pageUtils.setGlobalStyle('', 'sectionStyle');
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSearchPage',
                {}, 'Search');
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSearchPage',
                {}, 'Search');
            this.pageUtils.setRobots(false, false);
        }
    }

    protected setPageLayoutAndStyles(): void {
        if (this.searchForm.perPage === 1) {
            this.layout = Layout.PAGE;
            this.pageUtils.setGlobalStyle('.hide-on-fullpage { display: none; } ' +
                '.show-on-fullpage-block { display: block; } ' +
                '.content-container, .list-container, .card-deck, .card { background: #130b0b !IMPORTANT; border: none !IMPORTANT;} ' +
                '.other-content-container, .map-container { background: white !IMPORTANT; border: 2px !IMPORTANT;} ' +
                '.list-header-container { background: #dadada; opacity: 0.1; } ' +
                'div:hover { opacity: 1 }', 'fullPageStyle');
        } else {
            this.pageUtils.setGlobalStyle('.show-on-fullpage-block { display: none; }', 'fullPageStyle');
        }

    }

    protected processError(data: { searchForm: ResolvedData<F>, pdoc: ResolvedData<PDocRecord>,
        flgDoSearch: boolean, baseSearchUrl: ResolvedData<string> }): boolean {
        const flgSearchFormError = ErrorResolver.isResolverError(data.searchForm);
        const flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgSearchFormError && !flgBaseSearchUrlError) {
            return false;
        }

        let newUrl, msg, code;
        const errorCode = (flgSearchFormError ? data.searchForm.error.code : data.baseSearchUrl.error.code);
        let sectionId = undefined;
        let searchForm = undefined;
        if (flgSearchFormError) {
            if (data.searchForm.error.data) {
                sectionId = data.searchForm.error.data.theme;
            }
            if (data.searchForm.error.data) {
                searchForm = this.cdocDataService.createSanitizedSearchForm(data.searchForm.error.data);
            } else {
                searchForm = this.cdocDataService.newSearchForm({});
            }
        } else if (data.searchForm.data) {
            sectionId = data.searchForm.data.theme;
            searchForm = data.searchForm.data;
        }
        switch (errorCode) {
            case CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM:
                code = ErrorResolver.ERROR_INVALID_DATA;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                } else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = this.searchFormConverter.searchFormToUrl(
                    this.baseSearchUrl + '/', this.cdocDataService.cloneSanitizedSearchForm(searchForm));
                msg = undefined;
                break;
            case CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID:
                code = ErrorResolver.ERROR_INVALID_ID;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                } else {
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
    }

    protected doPreChecksBeforeSearch(): boolean {
        if ((this.searchForm.type === undefined || this.searchForm.type === '')
            && this.environment.emptyDefaultSearchTypes !== undefined && this.environment.emptyDefaultSearchTypes !== '') {
            this.searchForm.type = this.environment.emptyDefaultSearchTypes;
            return this.redirectToSearch();
        }
    }

    protected generateMultiActionSelectValueMapFromSearchResult(searchResult: S, valueMap: Map<string, IMultiSelectOption[]>): void {
        if (searchResult !== undefined) {
            valueMap.set('playlists', this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
                this.cdocSearchFormUtils.getPlaylistValues(searchResult), true, [], true));
        }
    }

    protected doCheckSearchResultAfterSearch(searchResult: S): void {
        this.pauseAutoPlay = false;

        if (this.maxAllowedM3UExportItems > 0 && searchResult && searchResult.recordCount > 0 &&
            this.maxAllowedM3UExportItems > searchResult.recordCount) {
            this.m3uExportAvailable = true;
        } else {
            this.m3uExportAvailable = false;
        }

        const valueMap = new Map<string, IMultiSelectOption[]>();
        this.generateMultiActionSelectValueMapFromSearchResult(searchResult, valueMap);
        this.multiActionSelectValueMap = valueMap;

        this.availableCreateActionType = undefined;
        if (this.searchForm.type && this.searchForm.type.split(',').length === 1
            && this.availableCreateActionTypes && this.availableCreateActionTypes.includes(this.searchForm.type.toUpperCase())) {
            this.availableCreateActionType = this.searchForm.type.toUpperCase();
        }
    }

    protected doSearch() {
        this.doPreChecksBeforeSearch();

        // console.log('doSearch form:', this.searchForm);
        this.cdocRoutingService.setLastBaseUrl(this.baseSearchUrl);
        this.cdocRoutingService.setLastSearchUrl(this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, this.searchForm));

        this.showLoadingSpinner = true;
        this.cd.markForCheck();
        const me = this;
        this.cdocDataService.search(this.searchForm, {
            showFacets: true,
            loadTrack: true,
            showForm: true
        }).then(function doneSearch(cdocSearchResult) {
            if (cdocSearchResult === undefined) {
                // console.log('empty searchResult', mdocSearchResult);
                me.initialized = true;
                me.searchResult = me.cdocDataService.newSearchResult(me.searchForm, 0, [], new Facets());
            } else {
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
    }

    protected doCheckRedirectToShowAfterSearch(anchor: string, cdocSearchResult: S): boolean {
        if (anchor != undefined && anchor.startsWith('redirect')) {
            if (cdocSearchResult.currentRecords && cdocSearchResult.currentRecords.length > 0) {
                if (anchor === 'redirectFirst') {
                    this.onShowDoc(cdocSearchResult.currentRecords[0]);
                    return true;
                }
                if (anchor === 'redirectLast') {
                    this.onShowDoc(cdocSearchResult.currentRecords[cdocSearchResult.currentRecords.length-1]);
                    return true;
                }
                const index = cdocSearchResult.currentRecords.findIndex(value => 'redirect' + value.id === anchor);
                if (index > 0) {
                    this.onShowDoc(cdocSearchResult.currentRecords[index]);
                    return true;
                }
            }
        }

        return false;
    }
}
