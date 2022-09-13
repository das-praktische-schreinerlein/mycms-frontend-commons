import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
var CommonSectionSearchFormResolver = /** @class */ (function () {
    function CommonSectionSearchFormResolver(appService, searchFormConverter) {
        this.appService = appService;
        this.searchFormConverter = searchFormConverter;
        this.idValidationRule = new IdValidationRule(true);
    }
    CommonSectionSearchFormResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            var id = route.params['section'] || route.parent.params['section'];
            var searchForm = _this.searchFormConverter.newSearchForm({});
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === AppState.Ready) {
                    _this.searchFormConverter.paramsToSearchForm(route.params, route.data['searchFormDefaults'], searchForm, route.queryParams);
                    searchForm.theme = _this.idValidationRule.sanitize(id);
                    if (!_this.searchFormConverter.isValid(searchForm)) {
                        result.error = new ResolverError(CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM, searchForm, undefined);
                        return resolve(result);
                    }
                    if (!_this.idValidationRule.isValid(id)) {
                        result.error = new ResolverError(CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID, searchForm, undefined);
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
    CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID = 'ERROR_INVALID_SEARCHFORM_SECTION_ID';
    CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM = 'ERROR_INVALID_SEARCHFORM';
    return CommonSectionSearchFormResolver;
}());
export { CommonSectionSearchFormResolver };
//# sourceMappingURL=cdoc-section-searchform.resolver.js.map