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
import { isArray } from 'util';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
var PDocNameSuggesterService = /** @class */ (function () {
    function PDocNameSuggesterService(searchFormUtils) {
        this.searchFormUtils = searchFormUtils;
    }
    PDocNameSuggesterService.prototype.suggest = function (form, environment) {
        var suggestion = '';
        var actiontype = form['subtype'];
        if (actiontype !== undefined) {
            if (!isArray(actiontype)) {
                actiontype = [actiontype];
            }
            var selectedActionTypes = this.searchFormUtils.extractSelected(environment.optionsSelectSubTypePageType, actiontype);
            if (selectedActionTypes.length > 0) {
                suggestion += selectedActionTypes[0].name;
            }
        }
        return new Promise(function (resolve) {
            resolve(suggestion);
        });
    };
    PDocNameSuggesterService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SearchFormUtils])
    ], PDocNameSuggesterService);
    return PDocNameSuggesterService;
}());
export { PDocNameSuggesterService };
//# sourceMappingURL=pdoc-name-suggester.service.js.map