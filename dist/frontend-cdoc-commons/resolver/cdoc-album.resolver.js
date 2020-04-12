import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
import { IdCsvValidationRule, IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { LogUtils } from '@dps/mycms-commons/dist/commons/utils/log.utils';
var CommonDocAlbumResolver = /** @class */ (function () {
    function CommonDocAlbumResolver(appService, cdocAlbumService, dataService) {
        this.appService = appService;
        this.cdocAlbumService = cdocAlbumService;
        this.dataService = dataService;
        this.idValidationRule = new IdValidationRule(true);
        this.idCsvValidationRule = new IdCsvValidationRule(false);
    }
    CommonDocAlbumResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === AppState.Ready) {
                    var albumKey = route.params['album'];
                    if (!_this.idValidationRule.isValid(albumKey)) {
                        console.warn('warning no id for album:', LogUtils.sanitizeLogMsg(albumKey));
                        result.error = new ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, albumKey, undefined);
                        return resolve(result);
                    }
                    var ids = _this.cdocAlbumService.getDocIds(albumKey).join(',');
                    if (ids === undefined || ids.length === 0) {
                        ids = route.params['ids'] || '';
                    }
                    if (!_this.idCsvValidationRule.isValid(ids)) {
                        console.warn('warning no ids for cdoc:', LogUtils.sanitizeLogMsg(ids));
                        result.error = new ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, ids, undefined);
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
                else if (appState === AppState.Failed) {
                    result.error = new ResolverError(GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    CommonDocAlbumResolver.ERROR_INVALID_DOC_ID = 'ERROR_INVALID_DOC_ID';
    return CommonDocAlbumResolver;
}());
export { CommonDocAlbumResolver };
//# sourceMappingURL=cdoc-album.resolver.js.map