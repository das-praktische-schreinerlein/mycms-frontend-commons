import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { AbstractPageComponent, CommonPageComponentComponentConfig } from '../../angular-commons/components/abstract-page.component';
import { IdValidationRule, KeywordValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { CommonDocContentUtils } from '../services/cdoc-contentutils.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonDocRoutingService } from '../services/cdoc-routing.service';
import { ErrorResolver } from '../resolver/error.resolver';
import { PageUtils } from '../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../angular-commons/services/common-routing.service';
import { AngularMarkdownService } from '../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../angular-commons/services/angular-html.service';
import { GenericTrackingService } from '../../angular-commons/services/generic-tracking.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../angular-commons/services/platform.service';
import { Layout, LayoutService } from '../../angular-commons/services/layout.service';
import { CommonEnvironment } from '../../frontend-section-commons/common-environment';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { CommonDocEditformComponentForwardMode, CommonDocEditformComponentReturnType } from '../components/cdoc-editform/cdoc-editform.component';
export interface CommonDocCreatepageComponentConfig extends CommonPageComponentComponentConfig {
    editAllowed: boolean;
}
export declare abstract class CommonDocCreatepageComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    protected route: ActivatedRoute;
    protected cdocRoutingService: CommonDocRoutingService;
    protected toastr: ToastrService;
    protected errorResolver: ErrorResolver;
    protected pageUtils: PageUtils;
    protected commonRoutingService: CommonRoutingService;
    protected angularMarkdownService: AngularMarkdownService;
    protected angularHtmlService: AngularHtmlService;
    protected cd: ChangeDetectorRef;
    protected trackingProvider: GenericTrackingService;
    protected appService: GenericAppService;
    protected platformService: PlatformService;
    protected layoutService: LayoutService;
    protected environment: CommonEnvironment;
    protected cdocDataService: D;
    protected router: Router;
    idValidationRule: IdValidationRule;
    keywordsValidationRule: KeywordValidationRule;
    CommonDocEditformComponentForwardMode: typeof CommonDocEditformComponentForwardMode;
    contentUtils: CommonDocContentUtils;
    record: R;
    baseRecord: R;
    suggestedForwardModes: CommonDocEditformComponentForwardMode[];
    Layout: typeof Layout;
    pdoc: PDocRecord;
    editAllowed: boolean;
    modal: boolean;
    constructor(route: ActivatedRoute, cdocRoutingService: CommonDocRoutingService, toastr: ToastrService, contentUtils: CommonDocContentUtils, errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService, angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService, environment: CommonEnvironment, cdocDataService: D, router: Router);
    protected configureProcessing(): void;
    submitSave(values: {}): boolean;
    submitSaveAndForward(returnType: CommonDocEditformComponentReturnType<R>): boolean;
    submitCancelModal(): boolean;
    protected closeModal(): void;
    protected abstract getComponentConfig(config: {}): CommonDocCreatepageComponentConfig;
    protected configureComponent(config: {}): void;
    protected configureProcessingOfResolvedData(config: {}, resolvedData: ResolvedData<R>): void;
    protected doProcessAfterResolvedData(config: {}, resolvedData: ResolvedData<R>): void;
    protected setMetaTags(config: {}, pdoc: PDocRecord, record: CommonDocRecord): void;
    protected setPageLayoutAndStyles(): void;
    protected processError(data: {
        record: ResolvedData<R>;
        baseSearchUrl: ResolvedData<string>;
    }): boolean;
}
