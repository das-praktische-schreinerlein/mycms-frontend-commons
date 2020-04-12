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
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ResolverError } from '../../angular-commons/resolver/resolver.utils';
var SectionsBaseUrlResolver = /** @class */ (function () {
    function SectionsBaseUrlResolver() {
        this.idValidationRule = new IdValidationRule(true);
    }
    SectionsBaseUrlResolver_1 = SectionsBaseUrlResolver;
    SectionsBaseUrlResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var result = {
            route: route,
            state: state
        };
        return new Promise(function (resolve) {
            var id = route.params['section'] || route.parent.params['section'];
            if (!_this.idValidationRule.isValid(id)) {
                result.error = new ResolverError(SectionsBaseUrlResolver_1.ERROR_INVALID_SECTION_ID, id, undefined);
                return resolve(result);
            }
            id = _this.idValidationRule.sanitize(id);
            result.data = 'sections/' + id + '/';
            return resolve(result);
        });
    };
    var SectionsBaseUrlResolver_1;
    SectionsBaseUrlResolver.ERROR_INVALID_SECTION_ID = 'ERROR_INVALID_SECTION_ID';
    SectionsBaseUrlResolver = SectionsBaseUrlResolver_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], SectionsBaseUrlResolver);
    return SectionsBaseUrlResolver;
}());
export { SectionsBaseUrlResolver };
//# sourceMappingURL=sections-baseurl.resolver.js.map