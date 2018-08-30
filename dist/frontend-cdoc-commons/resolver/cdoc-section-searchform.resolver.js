"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var CommonSectionSearchFormResolver = /** @class */ (function () {
    function CommonSectionSearchFormResolver(appService, searchFormConverter) {
        this.appService = appService;
        this.searchFormConverter = searchFormConverter;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
    }
    CommonSectionSearchFormResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var me = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            var id = route.params['section'] || route.parent.params['section'];
            var searchForm = _this.searchFormConverter.newSearchForm({});
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    _this.searchFormConverter.paramsToSearchForm(route.params, route.data['searchFormDefaults'], searchForm);
                    searchForm.theme = _this.idValidationRule.sanitize(id);
                    if (!_this.searchFormConverter.isValid(searchForm)) {
                        result.error = new resolver_utils_1.ResolverError(CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM, searchForm, undefined);
                        return resolve(result);
                    }
                    if (!_this.idValidationRule.isValid(id)) {
                        result.error = new resolver_utils_1.ResolverError(CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID, searchForm, undefined);
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
    CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM_SECTION_ID = 'ERROR_INVALID_SEARCHFORM_SECTION_ID';
    CommonSectionSearchFormResolver.ERROR_INVALID_SEARCHFORM = 'ERROR_INVALID_SEARCHFORM';
    return CommonSectionSearchFormResolver;
}());
exports.CommonSectionSearchFormResolver = CommonSectionSearchFormResolver;
//# sourceMappingURL=cdoc-section-searchform.resolver.js.map