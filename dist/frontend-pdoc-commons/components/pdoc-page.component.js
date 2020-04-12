import { AppState } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var AbstractPageComponent = /** @class */ (function () {
    function AbstractPageComponent(route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment) {
        this.route = route;
        this.toastr = toastr;
        this.pageUtils = pageUtils;
        this.cd = cd;
        this.trackingProvider = trackingProvider;
        this.appService = appService;
        this.platformService = platformService;
        this.layoutService = layoutService;
        this.environment = environment;
        this.initialized = false;
        this.showLoadingSpinner = false;
    }
    AbstractPageComponent.prototype.ngOnInit = function () {
        // reset initialized
        this.initialized = false;
        var me = this;
        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(function (layoutSizeData) {
            me.onResize(layoutSizeData);
        });
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                me.config = me.appService.getAppConfig();
                me.configureComponent(me.config);
                me.configureProcessing(me.config);
            }
        });
    };
    AbstractPageComponent.prototype.ngOnDestroy = function () {
    };
    AbstractPageComponent.prototype.onScrollToTop = function () {
        this.pageUtils.scrollToTop();
    };
    AbstractPageComponent.prototype.onResize = function (layoutSizeData) {
    };
    return AbstractPageComponent;
}());
export { AbstractPageComponent };
//# sourceMappingURL=pdoc-page.component.js.map