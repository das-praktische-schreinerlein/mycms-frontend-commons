import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
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
                if (appState === AppState.Ready) {
                    _this.searchFormConverter.paramsToSearchForm(route.params, route.data['searchFormDefaults'], searchForm, route.queryParams);
                    if (!_this.searchFormConverter.isValid(searchForm)) {
                        result.error = new ResolverError(CommonDocSearchFormResolver.ERROR_INVALID_SEARCHFORM, searchForm, undefined);
                        return resolve(result);
                    }
                    result.data = searchForm;
                    return resolve(result);
                }
                else if (appState === AppState.Failed) {
                    result.error = new ResolverError(GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    CommonDocSearchFormResolver.ERROR_INVALID_SEARCHFORM = 'ERROR_INVALID_SEARCHFORM';
    return CommonDocSearchFormResolver;
}());
export { CommonDocSearchFormResolver };
//# sourceMappingURL=cdoc-searchform.resolver.js.map