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
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
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
                if (appState === AppState.Ready) {
                    _this.dataService.getAll(undefined).then(function doneGetAll(pdocs) {
                        result.data = pdocs;
                        return resolve(result);
                    }).catch(function errorGetAll(reason) {
                        console.error('error loading pdocs', reason);
                        result.error = new ResolverError(SectionsPDocsResolver_1.ERROR_READING_SECTIONS, undefined, reason);
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
    var SectionsPDocsResolver_1;
    SectionsPDocsResolver.ERROR_READING_SECTIONS = 'ERROR_READING_SECTIONS';
    SectionsPDocsResolver = SectionsPDocsResolver_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService, StaticPagesDataService])
    ], SectionsPDocsResolver);
    return SectionsPDocsResolver;
}());
export { SectionsPDocsResolver };
//# sourceMappingURL=sections-pdocs.resolver.js.map