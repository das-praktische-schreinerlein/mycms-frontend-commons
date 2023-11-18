import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject} from '@angular/core';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LayoutService, LayoutSizeData} from '../../../../angular-commons/services/layout.service';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {PDocSearchResult} from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {PDocSearchForm} from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {isArray, isNumber} from 'util';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {
    CommonDocShowpageComponent,
    CommonDocShowpageComponentConfig
} from '../../../../frontend-cdoc-commons/components/cdoc-showpage.component';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {PDocSearchFormConverter} from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import {COMMON_APP_ENVIRONMENT, CommonEnvironment} from '../../../../frontend-section-commons/common-environment';
import {ElementFilterType} from '../../../../angular-commons/services/layout.utils';
import {PrintOptions, PrintService} from '../../../../angular-commons/services/print.service';
import {PdfPrintOptions, PdfPrintService} from '../../../../angular-commons/services/pdf-print.service';

export interface PDocShowpageComponentAvailableTabs {
    ALL_ENTRIES?: boolean;
    PAGE?: boolean;
    ALL?: boolean;
}

@Component({
    selector: 'app-pdoc-showpage',
    templateUrl: './pdoc-showpage.component.html',
    styleUrls: ['./pdoc-showpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocShowPageComponent extends CommonDocShowpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult,
    PDocDataService> {
    tagcloudSearchResult = new PDocSearchResult(new PDocSearchForm({}), 0, undefined, new Facets());
    showResultListTrigger: {
        ALL_ENTRIES?: boolean|number;
        PAGE?: boolean|number;
    } = {
        ALL_ENTRIES: true,
        PAGE: false
    };
    availableTabs: PDocShowpageComponentAvailableTabs = {
        ALL_ENTRIES: false,
        PAGE: true
    };
    private layoutSize: LayoutSizeData;

    constructor(route: ActivatedRoute, cdocRoutingService: PDocRoutingService,
                toastr: ToastrService, contentUtils: PDocContentUtils,
                errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService,
                angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, protected searchFormConverter: PDocSearchFormConverter,
                layoutService: LayoutService, protected elRef: ElementRef, router: Router,
                @Inject(COMMON_APP_ENVIRONMENT) protected environment: CommonEnvironment,
                protected printService: PrintService, protected pdfPrintService: PdfPrintService) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService,
            angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService,
            environment, router);
    }

    getFiltersForType(record: PDocRecord, type: string): any {
        const minPerPage = isNumber(this.showResultListTrigger[type]) ? this.showResultListTrigger[type] : 0;

        const theme = this.pdoc ? this.pdoc.theme : undefined;
        const filters = (<PDocContentUtils>this.contentUtils).getPDocSubItemFiltersForType(record, type, theme, minPerPage);

        return filters;
    }

    renderDesc(): string {
        if (this.record && (this.record.descMd === undefined || this.record.descMd.toLowerCase() === 'tododesc')) {
            this.setDesc(this.descSelector, '');
            this.flgDescRendered = false;
            return '';
        }

        return super.renderDesc();
    }

    isPdfPrintAvailable(): boolean {
        return this.pdfPrintService.isPrintPdfAvailable();
    }

    isPrintAvailable(): boolean {
        return this.printService.isPrintAvailable();
    }

    onOpenPrintPreview(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number,
                       printCssIdRegExp?: string) {
        const options: PrintOptions = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp)
        };
        this.printService.openPrintPreview(options);

        return false;
    }

    onPrintPdf(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number,
               printCssIdRegExp?: string) {
        const options: PdfPrintOptions = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp),
            fileName: 'filename.pdf',
            pdfOptions: {
                orientation: 'portrait',
                format: 'a4'
            },
            waitForRenderingMs: 1000
        };
        this.pdfPrintService.printPdf(options);

        return false;
    }

    protected onResize(layoutSizeData: LayoutSizeData): void {
        super.onResize(layoutSizeData);
        this.layoutSize = layoutSizeData;
        this.cd.markForCheck();
    }

    protected getComponentConfig(config: {}): CommonDocShowpageComponentConfig {
        return {
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            modalOutletName: 'pdocmodalshow'
        };
    }

    protected configureProcessingOfResolvedData(): void {
        const me = this;
        const config = me.appService.getAppConfig();
        if (BeanUtils.getValue(config, 'components.pdoc-showpage.availableTabs') !== undefined) {
            me.availableTabs = BeanUtils.getValue(config, 'components.pdoc-showpage.availableTabs');
        }

        const allowedParams = BeanUtils.getValue(config, 'components.pdoc-showpage.allowedQueryParams');
        if (me.queryParamMap && isArray(allowedParams)) {
            for (const type in me.showResultListTrigger) {
                const paramName = 'show' + type;
                const param = me.queryParamMap.get(paramName);
                if (allowedParams.indexOf(paramName) >= 0 && param) {
                    me.showResultListTrigger[type] =
                        PDocSearchForm.genericFields.perPage.validator.sanitize(param);
                }
            }
        }

        if (this.environment['hideInternalDescLinks'] === true) {
            this.pageUtils.setGlobalStyle('.show-page #desc [href*="sections/"] { cursor: not-allowed; pointer-events: none; text-decoration: none; opacity: 0.5; color: currentColor; }'
                + ' .show-page #desc a[href*="sections/"]::before { content: \'\uD83D\uDEAB\'; font-size: smaller}',
                'pdocShowpageHideInternalDescLinks');
        } else {
            this.pageUtils.setGlobalStyle('', 'pdocShowpageHideInternalDescLinks');
        }

        if (this.environment['hideInternalImages'] === true) {
            this.pageUtils.setGlobalStyle('.show-page #desc img[src*="api/static/picturestore"] {display:none;}',
                'pdocShowpageHideInternalImages');
        } else {
            this.pageUtils.setGlobalStyle('', 'pdocShowpageHideInternalImages');
        }
    }

    protected getConfiguredIndexableTypes(config: {}): string[] {
        let indexableTypes = [];
        if (BeanUtils.getValue(config, 'services.seo.pdocIndexableTypes')) {
            indexableTypes = config['services']['seo']['pdocIndexableTypes'];
        }

        return indexableTypes;
    }

    protected doProcessAfterResolvedData(): void {
        const me = this;
        me.tagcloudSearchResult = new PDocSearchResult(new PDocSearchForm({}), 0, undefined, new Facets());
    }
}
