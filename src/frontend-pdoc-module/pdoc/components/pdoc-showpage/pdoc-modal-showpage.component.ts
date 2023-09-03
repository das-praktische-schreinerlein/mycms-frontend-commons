import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject} from '@angular/core';
import {PDocShowPageComponent} from './pdoc-showpage.component';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {ToastrService} from 'ngx-toastr';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {PDocSearchFormConverter} from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {COMMON_APP_ENVIRONMENT, CommonEnvironment} from '../../../../frontend-section-commons/common-environment';
import {PrintService} from '../../../../angular-commons/services/print.service';
import {PdfPrintService} from '../../../../angular-commons/services/pdf-print.service';

@Component({
    selector: 'app-pdoc-modal-showpage',
    templateUrl: './pdoc-showpage.component.html',
    styleUrls: ['./pdoc-showpage.component.css', './pdoc-modal-showpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocModalShowpageComponent extends PDocShowPageComponent {
    constructor(route: ActivatedRoute, cdocRoutingService: PDocRoutingService,
                toastr: ToastrService, contentUtils: PDocContentUtils,
                errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService,
                angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, protected searchFormConverter: PDocSearchFormConverter,
                layoutService: LayoutService, protected elRef: ElementRef, protected router: Router,
                @Inject(COMMON_APP_ENVIRONMENT) protected environment: CommonEnvironment,
                protected printService: PrintService, protected pdfPrintService: PdfPrintService) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService,
            angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService,
            searchFormConverter, layoutService, elRef, router, environment, printService, pdfPrintService);
        this.modal = true;
    }

    protected configureProcessingOfResolvedData(): void {
        const me = this;
        super.configureProcessingOfResolvedData();
        me.availableTabs = {};
    }

}
