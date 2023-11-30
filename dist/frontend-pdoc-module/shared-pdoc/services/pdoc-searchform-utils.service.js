var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { CommonDocSearchFormUtils } from '../../../frontend-cdoc-commons/services/cdoc-searchform-utils.service';
var PDocSearchFormUtils = /** @class */ (function (_super) {
    __extends(PDocSearchFormUtils, _super);
    function PDocSearchFormUtils(searchFormUtils, searchParameterUtils) {
        var _this = _super.call(this, searchFormUtils, searchParameterUtils) || this;
        _this.searchFormUtils = searchFormUtils;
        _this.searchParameterUtils = searchParameterUtils;
        return _this;
    }
    PDocSearchFormUtils.prototype.getFlagsValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'flags_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getSubTypeValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'subtype_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getKeyValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'key_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getLangkeysValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'langkeys_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getProfilesValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'profiles_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getThemeValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'theme_ss', '', '');
    };
    PDocSearchFormUtils.prototype.getSortkeyValues = function (searchResult) {
        return this.searchFormUtils.getFacetValues(searchResult, 'sortkey_ss', '', '');
    };
    PDocSearchFormUtils = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SearchFormUtils, SearchParameterUtils])
    ], PDocSearchFormUtils);
    return PDocSearchFormUtils;
}(CommonDocSearchFormUtils));
export { PDocSearchFormUtils };
//# sourceMappingURL=pdoc-searchform-utils.service.js.map