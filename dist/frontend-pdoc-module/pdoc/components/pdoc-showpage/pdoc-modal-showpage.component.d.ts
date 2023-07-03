import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { PDocShowPageComponent } from './pdoc-showpage.component';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { ToastrService } from 'ngx-toastr';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { CommonEnvironment } from '../../../../frontend-section-commons/common-environment';
export declare class PDocModalShowpageComponent extends PDocShowPageComponent {
    protected searchFormConverter: PDocSearchFormConverter;
    protected elRef: ElementRef;
    protected router: Router;
    protected environment: CommonEnvironment;
    constructor(route: ActivatedRoute, cdocRoutingService: PDocRoutingService, toastr: ToastrService, contentUtils: PDocContentUtils, errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService, angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, searchFormConverter: PDocSearchFormConverter, layoutService: LayoutService, elRef: ElementRef, router: Router, environment: CommonEnvironment);
    protected configureProcessingOfResolvedData(): void;
}
