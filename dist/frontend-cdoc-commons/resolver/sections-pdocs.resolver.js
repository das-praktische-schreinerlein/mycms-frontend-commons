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
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var SectionsPDocsResolver = /** @class */ (function () {
    function SectionsPDocsResolver(appService, dataService) {
        this.appService = appService;
        this.dataService = dataService;
    }
    SectionsPDocsResolver_1 = SectionsPDocsResolver;
    SectionsPDocsResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            _this.appService.getAppState().subscribe(function (appState) {
                if (appState === generic_app_service_1.AppState.Ready) {
                    _this.dataService.getAll(undefined).then(function doneGetAll(pdocs) {
                        result.data = pdocs;
                        return resolve(result);
                    }).catch(function errorGetAll(reason) {
                        console.error('error loading pdocs', reason);
                        result.error = new resolver_utils_1.ResolverError(SectionsPDocsResolver_1.ERROR_READING_SECTIONS, undefined, reason);
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
    var SectionsPDocsResolver_1;
    SectionsPDocsResolver.ERROR_READING_SECTIONS = 'ERROR_READING_SECTIONS';
    SectionsPDocsResolver = SectionsPDocsResolver_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, pdoc_data_service_1.PDocDataService])
    ], SectionsPDocsResolver);
    return SectionsPDocsResolver;
}());
exports.SectionsPDocsResolver = SectionsPDocsResolver;
//# sourceMappingURL=sections-pdocs.resolver.js.map