import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons//services/pdoc-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ActivatedRoute } from '@angular/router';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { CommonDocSearchpageComponent, CommonDocSearchpageComponentConfig } from '../../../../frontend-cdoc-commons/components/cdoc-searchpage.component';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { PDocActionTagService } from '../../../shared-pdoc/services/pdoc-actiontag.service';
import { PDocSearchFormUtils } from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import { Location } from '@angular/common';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { CommonEnvironment } from '../../../../frontend-section-commons/common-environment';
export interface PDocSearchPageComponentConfig extends CommonDocSearchpageComponentConfig {
}
export declare class PDocSearchPageComponent extends CommonDocSearchpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    protected cdocRoutingService: PDocRoutingService;
    protected actionService: PDocActionTagService;
    protected elRef: ElementRef;
    protected environment: CommonEnvironment;
    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService, errorResolver: ErrorResolver, pdocDataService: PDocDataService, searchFormConverter: PDocSearchFormConverter, cdocRoutingService: PDocRoutingService, toastr: ToastrService, pageUtils: PageUtils, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService, searchFormUtils: SearchFormUtils, pdocSearchFormUtils: PDocSearchFormUtils, actionService: PDocActionTagService, elRef: ElementRef, location: Location, environment: CommonEnvironment);
    onCreateNewRecord(type: string): boolean;
    protected getComponentConfig(config: {}): PDocSearchPageComponentConfig;
    protected configureComponent(config: {}): void;
    protected doPreChecksBeforeSearch(): boolean;
}
