import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRoutingService } from '../services/cdoc-routing.service';
import { Layout, LayoutService, LayoutSize, LayoutSizeData, SearchFormLayout } from '../../angular-commons/services/layout.service';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { ErrorResolver } from '../resolver/error.resolver';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../angular-commons/services/platform.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { GenericSearchFormSearchFormConverter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import { AbstractPageComponent } from '../../frontend-pdoc-commons/components/pdoc-page.component';
import { CommonEnvironment } from '../../frontend-pdoc-commons/common-environment';
import { CommonDocMultiActionManager } from '../services/cdoc-multiaction.manager';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SearchFormUtils } from '../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchFormUtils } from '../services/cdoc-searchform-utils.service';
export interface CommonDocSearchpageComponentConfig {
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    maxAllowedM3UExportItems: number;
    availableCreateActionTypes: String[];
}
export declare abstract class CommonDocSearchpageComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    protected route: ActivatedRoute;
    protected commonRoutingService: CommonRoutingService;
    protected errorResolver: ErrorResolver;
    protected cdocDataService: D;
    protected searchFormConverter: GenericSearchFormSearchFormConverter<F>;
    protected cdocRoutingService: CommonDocRoutingService;
    protected toastr: ToastrService;
    protected pageUtils: PageUtils;
    protected cd: ChangeDetectorRef;
    protected trackingProvider: GenericTrackingService;
    protected appService: GenericAppService;
    protected platformService: PlatformService;
    protected layoutService: LayoutService;
    protected searchFormUtils: SearchFormUtils;
    protected cdocSearchFormUtils: CommonDocSearchFormUtils;
    protected multiActionManager: CommonDocMultiActionManager<R, F, S, D>;
    protected environment: CommonEnvironment;
    idValidationRule: IdValidationRule;
    Layout: typeof Layout;
    SearchFormLayout: typeof SearchFormLayout;
    LayoutSize: typeof LayoutSize;
    pdoc: PDocRecord;
    searchResult: S;
    searchForm: F;
    layout: Layout;
    sort: string;
    perPage: number;
    searchFormLayout: SearchFormLayout;
    showSearchFormElements: boolean;
    pauseAutoPlay: boolean;
    anchor: string;
    m3uExportAvailable: boolean;
    maxAllowedM3UExportItems: number;
    availableCreateActionType: String;
    availableCreateActionTypes: String[];
    multiActionSelectValueMap: Map<string, IMultiSelectOption[]>;
    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService, errorResolver: ErrorResolver, cdocDataService: D, searchFormConverter: GenericSearchFormSearchFormConverter<F>, cdocRoutingService: CommonDocRoutingService, toastr: ToastrService, pageUtils: PageUtils, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService, searchFormUtils: SearchFormUtils, cdocSearchFormUtils: CommonDocSearchFormUtils, multiActionManager: CommonDocMultiActionManager<R, F, S, D>, environment: CommonEnvironment);
    protected configureProcessing(): void;
    onShowDoc(cdoc: R): boolean;
    onPageChange(page: number, scroll: boolean): boolean;
    onPerPageChange(perPage: number): boolean;
    onSortChange(sort: string): boolean;
    onLayoutChange(layout: Layout): boolean;
    onSearchDoc(searchForm: F): boolean;
    onShowFormChanged(showForm: boolean): boolean;
    onTimeTableColumnClicked(month: string): boolean;
    onTypeTableColumnClicked(type: string): boolean;
    onInitialTableColumnClicked(initial: string): boolean;
    onTagcloudClicked(filterValue: any, filter: string): boolean;
    onPlayerStarted(cdoc: R): void;
    onPlayerStopped(cdoc: R): void;
    onSubmitSelectedMultiActions(event: any): boolean;
    onM3UExport(): boolean;
    protected redirectToSearch(): boolean;
    protected onResize(layoutSizeData: LayoutSizeData): void;
    protected abstract getComponentConfig(config: {}): CommonDocSearchpageComponentConfig;
    protected configureComponent(config: {}): void;
    protected configureProcessingOfResolvedData(config: {}): void;
    protected doProcessAfterResolvedData(config: {}): void;
    protected setMetaTags(config: {}, pdoc: PDocRecord, record: CommonDocRecord): void;
    protected setPageLayoutAndStyles(): void;
    protected processError(data: {
        searchForm: ResolvedData<F>;
        pdoc: ResolvedData<PDocRecord>;
        flgDoSearch: boolean;
        baseSearchUrl: ResolvedData<string>;
    }): boolean;
    protected doPreChecksBeforeSearch(): boolean;
    protected generateMultiActionSelectValueMapFromSearchResult(searchResult: S, valueMap: Map<string, IMultiSelectOption[]>): void;
    protected doCheckSearchResultAfterSearch(searchResult: S): void;
    protected doSearch(): void;
    protected doCheckRedirectToShowAfterSearch(anchor: string, cdocSearchResult: S): boolean;
}
