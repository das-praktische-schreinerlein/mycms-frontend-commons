import {ChangeDetectorRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {CommonRoutingService, RoutingState} from '../../angular-commons/services/common-routing.service';
import {PlatformService} from '../../angular-commons/services/platform.service';
import {PageUtils} from '../../angular-commons/services/page.utils';
import {LogUtils} from '@dps/mycms-commons/dist/commons/utils/log.utils';
import {LayoutService} from '../../angular-commons/services/layout.service';
import {CommonEnvironment} from '../common-environment';
import {PdfPrintOptions, PdfPrintService} from '../../angular-commons/services/pdf-print.service';
import {PrintOptions, PrintService} from '../../angular-commons/services/print.service';
import {ElementFilterType} from '../../angular-commons/services/layout.utils';
import {NameUtils} from '@dps/mycms-commons/dist/commons/utils/name.utils';

export abstract class AbstractAppComponent {

    showLoadingSpinner = true;
    loadingSpinnerRunning = false;
    showLaw = false;
    hideCopyrightFooter = false;
    cookieLawSeenName: string;

    constructor(protected appService: GenericAppService, protected toastr: ToastrService,
                protected translate: TranslateService, protected router: Router, protected locale: string,
                protected http: HttpClient, protected commonRoutingService: CommonRoutingService,
                protected cd: ChangeDetectorRef, protected platformService: PlatformService,
                protected pageUtils: PageUtils, protected layoutService: LayoutService,
                protected environment: CommonEnvironment,
                protected printService: PrintService, protected pdfPrintService: PdfPrintService) {
        this.hideCopyrightFooter = environment.hideCopyrightFooter;
        this.cookieLawSeenName = environment.cookieLawSeenName;

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(locale);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(locale);

        this.showInitState();

        if (this.platformService.isClient()) {
            this.showLaw = true;
        }

        // load overrides
        const url = this.platformService.getAssetsUrl(
            `./assets/locales/locale-${locale}-overrides` + environment.assetsPathVersionSnippet + `.json` +
            environment.assetsPathVersionSuffix);
        // console.log('load locale-override', url);
        this.http.get(url).toPromise()
            .then(function onDocsLoaded(res: any) {
                const i18n: any[] = res;
                translate.setTranslation(locale, i18n, true);
                appService.initApp();
            }).catch(function onError(reason: any) {
                console.error('loading locale-overrides failed:' + LogUtils.sanitizeLogMsg(url), reason);
                appService.initApp();
            });

        this.doBrowserCheck();
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
        const suggestedFileBase = NameUtils.normalizeFileNames(document.title || 'document');

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
            fileName: suggestedFileBase + '.pdf',
            pdfOptions: {
                orientation: 'portrait',
                format: 'a4'
            },
            waitForRenderingMs: 1000
        };
        this.pdfPrintService.printPdf(options);

        return false;
    }

    onScrollToTop() {
        this.pageUtils.scrollToTop();
    }

    showInitState() {
        this.appService.getAppState().subscribe(
            appState => {
                if (appState === AppState.Ready && this.platformService.isClient()) {
                    this.toastr.info('App wurde initialisiert. Viel Spaß :-)', 'Fertig');
                    const tmpHideCopyrightFooter = BeanUtils.getValue(this.appService.getAppConfig(), 'services.global.hideCopyrightFooter')
                    if (tmpHideCopyrightFooter !== undefined) {
                        this.hideCopyrightFooter = tmpHideCopyrightFooter;
                    }
                } else if (appState === AppState.Failed) {
                    this.router.navigateByUrl('errorpage');
                }
            }
        );

        this.commonRoutingService.getRoutingState().subscribe(
            routingState => {
                if (routingState === RoutingState.RUNNING) {
                    this.showLoadingSpinner = true;
                } else {
                    this.showLoadingSpinner = false;
                }

                this.cd.markForCheck();
                this.doLoadingSpinnerCheck();
            }
        );
    }

    setShowLoadingSpinner(flag: boolean) {
        this.loadingSpinnerRunning = flag;
    }

    doLoadingSpinnerCheck() {
        const me = this;
        setTimeout(function () {
            if (me.loadingSpinnerRunning && !me.showLoadingSpinner) {
                console.warn('showLoadingSpinner && loadingSpinnerRunning are inconsistent: markForCheck');
                me.cd.markForCheck();
                me.doLoadingSpinnerCheck();
                return;
            }
        }, 1000);
    }

    private doBrowserCheck() {
        // check ie
        const browser = this.layoutService.getBrowser();
        switch (browser && browser['name']) { // NOSONAR more possible :-)
            case 'ie':
                this.toastr.warning('<h4>Auweia</h4>\n' +
                    'Dieser Browser ist leider etwas "..." und wird die Seite wahrscheinlich nicht richtig darstellen können :-(<br />\n' +
                    'Am besten du probierst es mal mit dem neusten Chrome, Firefox, Edge oder Safari. Die sind getestet :-)', 'AuWaia',
                    { positionClass: 'toast-top-full-width', timeOut: 99999999, closeButton: true, tapToDismiss: true,
                        enableHtml: true});
                this.pageUtils.setGlobalStyle('.flg-browser-not-compatible { display: none !important; } ', 'browserCompatible');
                break;

            default:
        }
    }
}
