import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { CommonDocEditpageComponent, CommonDocEditpageComponentConfig } from '../../../../frontend-cdoc-commons/components/cdoc-editpage.component';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { CommonEnvironment } from '../../../../frontend-section-commons/common-environment';
export declare class PDocEditpageComponent extends CommonDocEditpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    protected route: ActivatedRoute;
    protected cdocRoutingService: PDocRoutingService;
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
    protected pdocDataService: PDocDataService;
    protected environment: CommonEnvironment;
    showResultListTrigger: {
        PAGE: boolean | number;
    };
    availableTabs: {
        'PAGE': boolean;
    };
    constructor(route: ActivatedRoute, cdocRoutingService: PDocRoutingService, toastr: ToastrService, contentUtils: PDocContentUtils, errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService, angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService, pdocDataService: PDocDataService, environment: CommonEnvironment);
    protected getComponentConfig(config: {}): CommonDocEditpageComponentConfig;
    getFiltersForType(record: PDocRecord, type: string): any;
}
