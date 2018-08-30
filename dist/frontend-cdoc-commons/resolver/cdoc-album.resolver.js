"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var log_utils_1 = require("@dps/mycms-commons/dist/commons/utils/log.utils");
var CommonDocAlbumResolver = /** @class */ (function () {
    function CommonDocAlbumResolver(appService, cdocAlbumService, dataService) {
        this.appService = appService;
        this.cdocAlbumService = cdocAlbumService;
        this.dataService = dataService;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        this.idCsvValidationRule = new generic_validator_util_1.IdCsvValidationRule(false);
    }
    CommonDocAlbumResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    var albumKey = route.params['album'];
                    if (!_this.idValidationRule.isValid(albumKey)) {
                        console.warn('warning no id for album:', log_utils_1.LogUtils.sanitizeLogMsg(albumKey));
                        result.error = new resolver_utils_1.ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, albumKey, undefined);
                        return resolve(result);
                    }
                    var ids = _this.cdocAlbumService.getDocIds(albumKey).join(',');
                    if (ids === undefined || ids.length === 0) {
                        ids = route.params['ids'] || '';
                    }
                    if (!_this.idCsvValidationRule.isValid(ids)) {
                        console.warn('warning no ids for cdoc:', log_utils_1.LogUtils.sanitizeLogMsg(ids));
                        result.error = new resolver_utils_1.ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, ids, undefined);
                        return resolve(result);
                    }
                    var perPage = route.params['perPage'];
                    var pageNum = route.params['pageNum'];
                    var sort = route.params['sort'];
                    ids = _this.idCsvValidationRule.sanitize(ids);
                    var searchForm = _this.dataService.createSanitizedSearchForm({
                        moreFilter: 'id:' + ids,
                        sort: sort,
                        perPage: perPage,
                        pageNum: pageNum
                    });
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
    CommonDocAlbumResolver.ERROR_INVALID_DOC_ID = 'ERROR_INVALID_DOC_ID';
    return CommonDocAlbumResolver;
}());
exports.CommonDocAlbumResolver = CommonDocAlbumResolver;
//# sourceMappingURL=cdoc-album.resolver.js.map