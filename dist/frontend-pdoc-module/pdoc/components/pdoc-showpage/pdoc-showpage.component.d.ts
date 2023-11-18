import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService, LayoutSizeData } from '../../../../angular-commons/services/layout.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocShowpageComponent, CommonDocShowpageComponentConfig } from '../../../../frontend-cdoc-commons/components/cdoc-showpage.component';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { PDocSearchFormConverter } from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import { CommonEnvironment } from '../../../../frontend-section-commons/common-environment';
import { ElementFilterType } from '../../../../angular-commons/services/layout.utils';
import { PrintService } from '../../../../angular-commons/services/print.service';
import { PdfPrintService } from '../../../../angular-commons/services/pdf-print.service';
export interface PDocShowpageComponentAvailableTabs {
    ALL_ENTRIES?: boolean;
    PAGE?: boolean;
    ALL?: boolean;
}
export declare class PDocShowPageComponent extends CommonDocShowpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    protected searchFormConverter: PDocSearchFormConverter;
    protected elRef: ElementRef;
    protected environment: CommonEnvironment;
    protected printService: PrintService;
    protected pdfPrintService: PdfPrintService;
    tagcloudSearchResult: PDocSearchResult;
    showResultListTrigger: {
        ALL_ENTRIES?: boolean | number;
        PAGE?: boolean | number;
    };
    availableTabs: PDocShowpageComponentAvailableTabs;
    private layoutSize;
    constructor(route: ActivatedRoute, cdocRoutingService: PDocRoutingService, toastr: ToastrService, contentUtils: PDocContentUtils, errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService, angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, searchFormConverter: PDocSearchFormConverter, layoutService: LayoutService, elRef: ElementRef, router: Router, environment: CommonEnvironment, printService: PrintService, pdfPrintService: PdfPrintService);
    getFiltersForType(record: PDocRecord, type: string): any;
    renderDesc(): string;
    isPdfPrintAvailable(): boolean;
    isPrintAvailable(): boolean;
    onOpenPrintPreview(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number, printCssIdRegExp?: string): boolean;
    onPrintPdf(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number, printCssIdRegExp?: string): boolean;
    protected onResize(layoutSizeData: LayoutSizeData): void;
    protected getComponentConfig(config: {}): CommonDocShowpageComponentConfig;
    protected configureProcessingOfResolvedData(): void;
    protected getConfiguredIndexableTypes(config: {}): string[];
    protected doProcessAfterResolvedData(): void;
}
