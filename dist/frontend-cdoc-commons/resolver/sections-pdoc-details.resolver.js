var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { StaticPagesDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import { CommonDocRoutingService } from '../services/cdoc-routing.service';
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { LogUtils } from '@dps/mycms-commons/dist/commons/utils/log.utils';
var SectionsPDocRecordResolver = /** @class */ (function () {
    function SectionsPDocRecordResolver(appService, dataService, routingService) {
        this.appService = appService;
        this.dataService = dataService;
        this.routingService = routingService;
        this.idValidationRule = new IdValidationRule(true);
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
                if (appState === AppState.Ready) {
                    var id_1 = route.params['section'] || route.parent.params['section'];
                    if (!_this.idValidationRule.isValid(id_1)) {
                        // console.warn('error no id for pdoc:', LogUtils.sanitizeLogMsg(id));
                        result.error = new ResolverError(SectionsPDocRecordResolver_1.ERROR_INVALID_SECTION_ID, id_1, undefined);
                        return resolve(result);
                    }
                    id_1 = _this.idValidationRule.sanitize(id_1);
                    _this.dataService.getById(id_1).then(function doneGetById(pdoc) {
                        if (pdoc === undefined) {
                            console.log('warning no pdoc for id:' + LogUtils.sanitizeLogMsg(id_1));
                            result.error = new ResolverError(SectionsPDocRecordResolver_1.ERROR_UNKNOWN_SECTION_ID, id_1, undefined);
                            return resolve(result);
                        }
                        if (pdoc.id !== undefined) {
                            me.routingService.setLastBaseUrl('sections/' + pdoc.id + '/');
                        }
                        result.data = pdoc;
                        return resolve(result);
                    }).catch(function errorGetById(reason) {
                        console.error('error pdoc for id:' + LogUtils.sanitizeLogMsg(id_1), reason);
                        result.error = new ResolverError(SectionsPDocRecordResolver_1.ERROR_READING_SECTION_ID, id_1, reason);
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
    var SectionsPDocRecordResolver_1;
    SectionsPDocRecordResolver.ERROR_UNKNOWN_SECTION_ID = 'ERROR_UNKNOWN_SECTION_ID';
    SectionsPDocRecordResolver.ERROR_INVALID_SECTION_ID = 'ERROR_INVALID_SECTION_ID';
    SectionsPDocRecordResolver.ERROR_READING_SECTION_ID = 'ERROR_READING_SECTION_ID';
    SectionsPDocRecordResolver = SectionsPDocRecordResolver_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService, StaticPagesDataService,
            CommonDocRoutingService])
    ], SectionsPDocRecordResolver);
    return SectionsPDocRecordResolver;
}());
export { SectionsPDocRecordResolver };
//# sourceMappingURL=sections-pdoc-details.resolver.js.map