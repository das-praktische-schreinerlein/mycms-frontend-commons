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
import { TranslateService } from '@ngx-translate/core';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
var SearchFormUtils = /** @class */ (function () {
    function SearchFormUtils(translateService, searchParameterUtils) {
        this.translateService = translateService;
        this.searchParameterUtils = searchParameterUtils;
    }
    SearchFormUtils.prototype.getIMultiSelectOptionsFromExtractedFacetValuesList = function (values, withCount, removements, translate) {
        if (values === undefined) {
            return [];
        }
        var me = this;
        return values.map(function (value) {
            var name = value[1];
            if (value.length >= 5 && value[4] !== undefined) {
                name = value[4];
            }
            else {
                if (name && translate) {
                    name = me.translateService.instant(name) || name;
                }
                if (name && removements && (Array.isArray(removements))) {
                    for (var _i = 0, removements_1 = removements; _i < removements_1.length; _i++) {
                        var replacement = removements_1[_i];
                        name = name.replace(replacement, '');
                    }
                }
                if (name && translate) {
                    name = me.translateService.instant(name) || name;
                }
            }
            var label = value[0] + name;
            if (label && translate) {
                label = me.translateService.instant(label) || label;
            }
            var result = { id: value[2] + value[1], name: label, count: value[3] };
            if (withCount && value[3] > 0) {
                result.name += ' (' + value[3] + ')';
            }
            return result;
        });
    };
    SearchFormUtils.prototype.getFacetValues = function (searchResult, facetName, valuePrefix, labelPrefix) {
        if (searchResult === undefined || searchResult.facets === undefined || searchResult.facets.facets.size === 0) {
            return [];
        }
        return [].concat(this.searchParameterUtils.extractFacetValues(searchResult.facets, facetName, valuePrefix, labelPrefix));
    };
    SearchFormUtils.prototype.moveSelectedToTop = function (options, selected) {
        if (selected === undefined || selected === null || selected.length < 1) {
            return options;
        }
        var selectedOptions = [];
        var otherOptions = [];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (selected.indexOf(option.id) >= 0) {
                selectedOptions.push(option);
            }
            else {
                otherOptions.push(option);
            }
        }
        return [].concat(selectedOptions, otherOptions);
    };
    SearchFormUtils.prototype.extractSelected = function (options, selected) {
        if (selected === undefined || selected === null || selected.length < 1) {
            return [];
        }
        var selectedOptions = [];
        for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
            var option = options_2[_i];
            if (selected.indexOf(option.id) >= 0) {
                selectedOptions.push(option);
            }
        }
        return selectedOptions;
    };
    SearchFormUtils.prototype.prepareExtendedSelectValues = function (src) {
        var values = [];
        for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
            var value = src_1[_i];
            // use value as label if not set
            if (!value[4]) {
                value[4] = value[1];
            }
            // use id as value instead of name
            if (value[5]) {
                value[1] = value[5];
            }
            values.push(value);
        }
        return values;
    };
    SearchFormUtils.prototype.searchFormToHumanReadableMarkup = function (filters, textOnly, objCache, hrdIds) {
        var str = [];
        for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
            var filter = filters_1[_i];
            if (filter && filter.values && filter.values.length > 0) {
                var resolvedValues = [];
                if (objCache) {
                    for (var _a = 0, _b = filter.values; _a < _b.length; _a++) {
                        var value = _b[_a];
                        var resolvedValue = objCache.get(hrdIds[filter.id.replace('hrt_', '')] + '_' + value);
                        resolvedValues.push(resolvedValue ? resolvedValue : value);
                    }
                }
                else {
                    resolvedValues = filter.values;
                }
                if (textOnly) {
                    str.push([(filter.prefix ? filter.prefix + ' ' : ''), '"', resolvedValues.join(', '), '"'].join(' '));
                }
                else {
                    str.push(['<div class="filter filter_' + filter.id + '">',
                        '<span class="filterPrefix filterPrefix_' + filter.id + '">', (filter.prefix ? filter.prefix + ' ' : ''), '</span>',
                        '<span class="filterValue filterValue_' + filter.id + '">', '"', resolvedValues.join(', '), '"', '</span>', '</div>'
                    ].join(''));
                }
            }
        }
        return str.join(' ');
    };
    SearchFormUtils.prototype.extractResolvableFilters = function (filters, hrdIds) {
        var res = [];
        for (var _i = 0, filters_2 = filters; _i < filters_2.length; _i++) {
            var filter = filters_2[_i];
            if (!filter || !filter.values || filter.values.length <= 0 || !hrdIds[filter.id.replace('hrt_', '')]) {
                continue;
            }
            res.push(filter);
        }
        return res;
    };
    SearchFormUtils.prototype.extractResolvableIds = function (filters, hrdIds) {
        var obJCache = new Map();
        for (var _i = 0, filters_3 = filters; _i < filters_3.length; _i++) {
            var filter = filters_3[_i];
            if (!filter || !filter.values || filter.values.length <= 0) {
                continue;
            }
            for (var _a = 0, _b = filter.values; _a < _b.length; _a++) {
                var value = _b[_a];
                obJCache.set(hrdIds[filter.id.replace('hrt_', '')] + '_' + value, undefined);
            }
        }
        return obJCache;
    };
    SearchFormUtils.prototype.valueToHumanReadableText = function (valueString, prefix, defaultValue, translate, valuePrefix) {
        var res;
        var valueTranslatePrefix = valuePrefix !== undefined ? valuePrefix + '' : '';
        if (valueString && valueString.toString() !== '') {
            res = {
                id: prefix,
                prefix: undefined,
                values: []
            };
            if (prefix) {
                res.prefix = (translate ? this.translateService.instant(prefix) : prefix);
            }
            var values = valueString.toString().split(',');
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                var safeValue = this.searchParameterUtils.escapeHtml(value);
                if (safeValue) {
                    res.values.push((translate ? this.translateService.instant(valueTranslatePrefix + safeValue) || safeValue : safeValue));
                }
            }
        }
        else if (defaultValue) {
            res = {
                id: prefix,
                prefix: undefined,
                values: []
            };
            if (prefix) {
                res.prefix = (translate ? this.translateService.instant(prefix) : prefix);
            }
            res.values.push((translate ? this.translateService.instant(valueTranslatePrefix + defaultValue) : defaultValue));
        }
        return res;
    };
    SearchFormUtils = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TranslateService, SearchParameterUtils])
    ], SearchFormUtils);
    return SearchFormUtils;
}());
export { SearchFormUtils };
//# sourceMappingURL=searchform-utils.service.js.map