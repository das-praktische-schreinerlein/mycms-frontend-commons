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
var searchform_utils_service_1 = require("../../angular-commons/services/searchform-utils.service");
var searchparameter_utils_1 = require("@dps/mycms-commons/dist/search-commons/services/searchparameter.utils");
var CommonDocSearchFormUtils = /** @class */ (function () {
    function CommonDocSearchFormUtils(searchFormUtils, searchParameterUtils) {
        this.searchFormUtils = searchFormUtils;
        this.searchParameterUtils = searchParameterUtils;
    }
    CommonDocSearchFormUtils.prototype.getWhenValues = function (searchResult) {
        return [].concat(this.searchFormUtils.getFacetValues(searchResult, 'year_is', 'year', ''), this.searchFormUtils.getFacetValues(searchResult, 'month_is', 'month', 'Monat'), this.searchFormUtils.getFacetValues(searchResult, 'week_is', 'week', 'Woche'));
    };
    CommonDocSearchFormUtils.prototype.getWhatValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'keywords_txt', '', '');
    };
    CommonDocSearchFormUtils.prototype.getTypeValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'type_txt', '', '');
    };
    CommonDocSearchFormUtils.prototype.getTypeLimit = function (searchResult) {
        if (searchResult === undefined || searchResult.facets === undefined || searchResult.facets.facets.size === 0) {
            return 0;
        }
        return this.searchParameterUtils.extractFacetSelectLimit(searchResult.facets, 'type_txt');
    };
    CommonDocSearchFormUtils.prototype.getPlaylistValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'playlists_txt', '', '');
    };
    CommonDocSearchFormUtils.prototype.getInitialValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'initial_s', '', '');
    };
    CommonDocSearchFormUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [searchform_utils_service_1.SearchFormUtils, searchparameter_utils_1.SearchParameterUtils])
    ], CommonDocSearchFormUtils);
    return CommonDocSearchFormUtils;
}());
exports.CommonDocSearchFormUtils = CommonDocSearchFormUtils;
//# sourceMappingURL=cdoc-searchform-utils.service.js.map