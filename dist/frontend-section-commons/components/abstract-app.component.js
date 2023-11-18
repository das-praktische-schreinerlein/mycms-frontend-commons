import { AppState } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { RoutingState } from '../../angular-commons/services/common-routing.service';
import { LogUtils } from '@dps/mycms-commons/dist/commons/utils/log.utils';
var AbstractAppComponent = /** @class */ (function () {
    function AbstractAppComponent(appService, toastr, translate, router, locale, http, commonRoutingService, cd, platformService, pageUtils, layoutService, environment, printService, pdfPrintService) {
        this.appService = appService;
        this.toastr = toastr;
        this.translate = translate;
        this.router = router;
        this.locale = locale;
        this.http = http;
        this.commonRoutingService = commonRoutingService;
        this.cd = cd;
        this.platformService = platformService;
        this.pageUtils = pageUtils;
        this.layoutService = layoutService;
        this.environment = environment;
        this.printService = printService;
        this.pdfPrintService = pdfPrintService;
        this.showLoadingSpinner = true;
        this.loadingSpinnerRunning = false;
        this.showLaw = false;
        this.hideCopyrightFooter = false;
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
        var url = this.platformService.getAssetsUrl("./assets/locales/locale-" + locale + "-overrides" + environment.assetsPathVersionSnippet + ".json" +
            environment.assetsPathVersionSuffix);
        // console.log('load locale-override', url);
        this.http.get(url).toPromise()
            .then(function onDocsLoaded(res) {
            var i18n = res;
            translate.setTranslation(locale, i18n, true);
            appService.initApp();
        }).catch(function onError(reason) {
            console.error('loading locale-overrides failed:' + LogUtils.sanitizeLogMsg(url), reason);
            appService.initApp();
        });
        this.doBrowserCheck();
    }
    AbstractAppComponent.prototype.isPdfPrintAvailable = function () {
        return this.pdfPrintService.isPrintPdfAvailable();
    };
    AbstractAppComponent.prototype.isPrintAvailable = function () {
        return this.printService.isPrintAvailable();
    };
    AbstractAppComponent.prototype.onOpenPrintPreview = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
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
    };
    AbstractAppComponent.prototype.onPrintPdf = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
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
    };
    AbstractAppComponent.prototype.onScrollToTop = function () {
        this.pageUtils.scrollToTop();
    };
    AbstractAppComponent.prototype.showInitState = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready && _this.platformService.isClient()) {
                _this.toastr.info('App wurde initialisiert. Viel Spaß :-)', 'Fertig');
                var tmpHideCopyrightFooter = BeanUtils.getValue(_this.appService.getAppConfig(), 'services.global.hideCopyrightFooter');
                if (tmpHideCopyrightFooter !== undefined) {
                    _this.hideCopyrightFooter = tmpHideCopyrightFooter;
                }
            }
            else if (appState === AppState.Failed) {
                _this.router.navigateByUrl('errorpage');
            }
        });
        this.commonRoutingService.getRoutingState().subscribe(function (routingState) {
            if (routingState === RoutingState.RUNNING) {
                _this.showLoadingSpinner = true;
            }
            else {
                _this.showLoadingSpinner = false;
            }
            _this.cd.markForCheck();
            _this.doLoadingSpinnerCheck();
        });
    };
    AbstractAppComponent.prototype.setShowLoadingSpinner = function (flag) {
        this.loadingSpinnerRunning = flag;
    };
    AbstractAppComponent.prototype.doLoadingSpinnerCheck = function () {
        var me = this;
        setTimeout(function () {
            if (me.loadingSpinnerRunning && !me.showLoadingSpinner) {
                console.warn('showLoadingSpinner && loadingSpinnerRunning are inconsistent: markForCheck');
                me.cd.markForCheck();
                me.doLoadingSpinnerCheck();
                return;
            }
        }, 1000);
    };
    AbstractAppComponent.prototype.doBrowserCheck = function () {
        // check ie
        var browser = this.layoutService.getBrowser();
        switch (browser && browser['name']) { // NOSONAR more possible :-)
            case 'ie':
                this.toastr.warning('<h4>Auweia</h4>\n' +
                    'Dieser Browser ist leider etwas "..." und wird die Seite wahrscheinlich nicht richtig darstellen können :-(<br />\n' +
                    'Am besten du probierst es mal mit dem neusten Chrome, Firefox, Edge oder Safari. Die sind getestet :-)', 'AuWaia', { positionClass: 'toast-top-full-width', timeOut: 99999999, closeButton: true, tapToDismiss: true,
                    enableHtml: true });
                this.pageUtils.setGlobalStyle('.flg-browser-not-compatible { display: none !important; } ', 'browserCompatible');
                break;
            default:
        }
    };
    return AbstractAppComponent;
}());
export { AbstractAppComponent };
//# sourceMappingURL=abstract-app.component.js.map