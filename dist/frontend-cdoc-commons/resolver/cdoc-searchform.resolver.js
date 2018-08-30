"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var CommonDocSearchFormResolver = /** @class */ (function () {
    function CommonDocSearchFormResolver(appService, searchFormConverter) {
        this.appService = appService;
        this.searchFormConverter = searchFormConverter;
    }
    CommonDocSearchFormResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            var searchForm = _this.searchFormConverter.newSearchForm({});
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    _this.searchFormConverter.paramsToSearchForm(route.params, route.data['searchFormDefaults'], searchForm);
                    if (!_this.searchFormConverter.isValid(searchForm)) {
                        result.error = new resolver_utils_1.ResolverError(CommonDocSearchFormResolver.ERROR_INVALID_SEARCHFORM, searchForm, undefined);
                        return resolve(result);
                    }
                    result.data = searchForm;
                    return resolve(result);
                }
                else if (appState === generic_app_service_1.AppState.Failed) {
                    result.error = new resolver_utils_1.ResolverError(generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    CommonDocSearchFormResolver.ERROR_INVALID_SEARCHFORM = 'ERROR_INVALID_SEARCHFORM';
    return CommonDocSearchFormResolver;
}());
exports.CommonDocSearchFormResolver = CommonDocSearchFormResolver;
//# sourceMappingURL=cdoc-searchform.resolver.js.map