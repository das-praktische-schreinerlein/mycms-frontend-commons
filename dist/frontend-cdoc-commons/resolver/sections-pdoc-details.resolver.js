"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var pdoc_data_service_1 = require("@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service");
var cdoc_routing_service_1 = require("../services/cdoc-routing.service");
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var log_utils_1 = require("@dps/mycms-commons/dist/commons/utils/log.utils");
var SectionsPDocRecordResolver = /** @class */ (function () {
    function SectionsPDocRecordResolver(appService, dataService, routingService) {
        this.appService = appService;
        this.dataService = dataService;
        this.routingService = routingService;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
    }
    SectionsPDocRecordResolver_1 = SectionsPDocRecordResolver;
    SectionsPDocRecordResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var me = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    var id_1 = route.params['section'] || route.parent.params['section'];
                    if (!_this.idValidationRule.isValid(id_1)) {
                        // console.warn('error no id for pdoc:', LogUtils.sanitizeLogMsg(id));
                        result.error = new resolver_utils_1.ResolverError(SectionsPDocRecordResolver_1.ERROR_INVALID_SECTION_ID, id_1, undefined);
                        return resolve(result);
                    }
                    id_1 = _this.idValidationRule.sanitize(id_1);
                    _this.dataService.getById(id_1).then(function doneGetById(pdoc) {
                        if (pdoc === undefined) {
                            console.log('warning no pdoc for id:' + log_utils_1.LogUtils.sanitizeLogMsg(id_1));
                            result.error = new resolver_utils_1.ResolverError(SectionsPDocRecordResolver_1.ERROR_UNKNOWN_SECTION_ID, id_1, undefined);
                            return resolve(result);
                        }
                        if (pdoc.id !== undefined) {
                            me.routingService.setLastBaseUrl('sections/' + pdoc.id + '/');
                        }
                        result.data = pdoc;
                        return resolve(result);
                    }).catch(function errorGetById(reason) {
                        console.error('error pdoc for id:' + log_utils_1.LogUtils.sanitizeLogMsg(id_1), reason);
                        result.error = new resolver_utils_1.ResolverError(SectionsPDocRecordResolver_1.ERROR_READING_SECTION_ID, id_1, reason);
                        return resolve(result);
                    });
                }
                else if (appState === generic_app_service_1.AppState.Failed) {
                    result.error = new resolver_utils_1.ResolverError(generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    };
    var SectionsPDocRecordResolver_1;
    SectionsPDocRecordResolver.ERROR_UNKNOWN_SECTION_ID = 'ERROR_UNKNOWN_SECTION_ID';
    SectionsPDocRecordResolver.ERROR_INVALID_SECTION_ID = 'ERROR_INVALID_SECTION_ID';
    SectionsPDocRecordResolver.ERROR_READING_SECTION_ID = 'ERROR_READING_SECTION_ID';
    SectionsPDocRecordResolver = SectionsPDocRecordResolver_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, pdoc_data_service_1.PDocDataService,
            cdoc_routing_service_1.CommonDocRoutingService])
    ], SectionsPDocRecordResolver);
    return SectionsPDocRecordResolver;
}());
exports.SectionsPDocRecordResolver = SectionsPDocRecordResolver;
//# sourceMappingURL=sections-pdoc-details.resolver.js.map