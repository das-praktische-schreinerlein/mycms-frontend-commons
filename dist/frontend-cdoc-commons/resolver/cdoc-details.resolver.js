import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
import { LogUtils } from '@dps/mycms-commons/dist/commons/utils/log.utils';
var CommonDocRecordResolver = /** @class */ (function () {
    function CommonDocRecordResolver(appService, dataService) {
        this.appService = appService;
        this.dataService = dataService;
        this.idValidationRule = new IdValidationRule(true);
    }
    CommonDocRecordResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === AppState.Ready) {
                    var id_1 = route.params['id'];
                    if (!_this.idValidationRule.isValid(id_1)) {
                        console.warn('warning no id for cdoc:', LogUtils.sanitizeLogMsg(id_1));
                        result.error = new ResolverError(CommonDocRecordResolver.ERROR_INVALID_DOC_ID, id_1, undefined);
                        return resolve(result);
                    }
                    id_1 = _this.idValidationRule.sanitize(id_1);
                    _this.dataService.getById(id_1).then(function doneGetById(cdoc) {
                        if (cdoc === undefined) {
                            console.log('no cdoc for id:' + LogUtils.sanitizeLogMsg(id_1));
                            result.error = new ResolverError(CommonDocRecordResolver.ERROR_UNKNOWN_DOC_ID, id_1, undefined);
                            return resolve(result);
                        }
                        result.data = cdoc;
                        return resolve(result);
                    }).catch(function errorGetById(reason) {
                        console.error('error cdoc for id:' + LogUtils.sanitizeLogMsg(id_1), reason);
                        result.error = new ResolverError(CommonDocRecordResolver.ERROR_READING_DOC_ID, id_1, reason);
                        return resolve(result);
                    });
                }
                else if (appState === AppState.Failed) {
                    result.error = new ResolverError(GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    CommonDocRecordResolver.ERROR_UNKNOWN_DOC_ID = 'ERROR_UNKNOWN_DOC_ID';
    CommonDocRecordResolver.ERROR_INVALID_DOC_ID = 'ERROR_INVALID_DOC_ID';
    CommonDocRecordResolver.ERROR_READING_DOC_ID = 'ERROR_READING_DOC_ID';
    return CommonDocRecordResolver;
}());
export { CommonDocRecordResolver };
//# sourceMappingURL=cdoc-details.resolver.js.map