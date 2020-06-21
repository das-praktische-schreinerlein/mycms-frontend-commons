"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var log_utils_1 = require("@dps/mycms-commons/dist/commons/utils/log.utils");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var cdoc_details_resolver_1 = require("./cdoc-details.resolver");
var CommonDocRecordCreateResolver = /** @class */ (function () {
    function CommonDocRecordCreateResolver(appService, dataService) {
        this.appService = appService;
        this.dataService = dataService;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
    }
    CommonDocRecordCreateResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        var me = this;
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    var type_1 = route.params['createByType'];
                    if (!_this.idValidationRule.isValid(type_1)) {
                        console.warn('warning no valid type for cdoc:', log_utils_1.LogUtils.sanitizeLogMsg(type_1));
                        result.error = new resolver_utils_1.ResolverError(CommonDocRecordCreateResolver.ERROR_UNKNOWN_DOC_TYPE, type_1, undefined);
                        return resolve(result);
                    }
                    var values_1 = { type: type_1.toUpperCase(), keywords: '' };
                    var baseId_1 = route.params['createBaseId'];
                    if (baseId_1 && _this.idValidationRule.isValid(baseId_1)) {
                        result.sourceId = baseId_1;
                        _this.dataService.getById(baseId_1).then(function doneGetById(cdoc) {
                            if (cdoc === undefined) {
                                console.log('no cdoc for id:' + log_utils_1.LogUtils.sanitizeLogMsg(baseId_1));
                                result.error = new resolver_utils_1.ResolverError(cdoc_details_resolver_1.CommonDocRecordResolver.ERROR_UNKNOWN_DOC_ID, baseId_1, undefined);
                                return resolve(result);
                            }
                            var fields = ['name', 'keywords', 'descTxt', 'descMd'];
                            me.configureDefaultFieldToSet(type_1, fields);
                            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                                var field = fields_1[_i];
                                values_1[field] = bean_utils_1.BeanUtils.getValue(cdoc, field);
                            }
                            me.copyDefaultFields(type_1, cdoc, values_1);
                            result.data = me.dataService.newRecord(values_1);
                            result.sourceData = cdoc;
                            return resolve(result);
                        }).catch(function errorGetById(reason) {
                            console.error('error cdoc for id:' + log_utils_1.LogUtils.sanitizeLogMsg(baseId_1), reason);
                            result.error = new resolver_utils_1.ResolverError(cdoc_details_resolver_1.CommonDocRecordResolver.ERROR_READING_DOC_ID, baseId_1, reason);
                            return resolve(result);
                        });
                    }
                    else {
                        me.setDefaultFields(type_1, values_1);
                        result.data = me.dataService.newRecord(values_1);
                        return resolve(result);
                    }
                }
                else if (appState === generic_app_service_1.AppState.Failed) {
                    result.error = new resolver_utils_1.ResolverError(generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    CommonDocRecordCreateResolver.prototype.configureDefaultFieldToSet = function (type, fields) {
    };
    CommonDocRecordCreateResolver.prototype.copyDefaultFields = function (type, cdoc, values) {
    };
    CommonDocRecordCreateResolver.prototype.setDefaultFields = function (type, values) {
    };
    CommonDocRecordCreateResolver.ERROR_UNKNOWN_DOC_TYPE = 'ERROR_UNKNOWN_DOC_TYPE';
    return CommonDocRecordCreateResolver;
}());
exports.CommonDocRecordCreateResolver = CommonDocRecordCreateResolver;
//# sourceMappingURL=cdoc-create.resolver.js.map