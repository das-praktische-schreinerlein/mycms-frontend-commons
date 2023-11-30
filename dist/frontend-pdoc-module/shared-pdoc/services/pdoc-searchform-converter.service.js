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
import { PDocSearchForm, PDocSearchFormValidator } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { TranslateService } from '@ngx-translate/core';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { LayoutService } from '../../../angular-commons/services/layout.service';
var PDocSearchFormConverter = /** @class */ (function () {
    function PDocSearchFormConverter(searchParameterUtils, translateService, searchFormUtils) {
        this.searchParameterUtils = searchParameterUtils;
        this.translateService = translateService;
        this.searchFormUtils = searchFormUtils;
        this.splitter = '_,_';
        this.HRD_IDS = {
            pageid_i: 'PAGE',
            page_id_is: 'PAGE'
        };
    }
    PDocSearchFormConverter.prototype.isValid = function (searchForm) {
        return PDocSearchFormValidator.isValid(searchForm);
    };
    PDocSearchFormConverter.prototype.newSearchForm = function (values) {
        return new PDocSearchForm(values);
    };
    PDocSearchFormConverter.prototype.parseLayoutParams = function (values, pdocSearchForm) {
        if (!values || !values['layout']) {
            return undefined;
        }
        return LayoutService.layoutFromString(values['layout']);
    };
    PDocSearchFormConverter.prototype.joinMoreFilterParams = function (pdocSearchForm) {
        var searchForm = (pdocSearchForm ? pdocSearchForm : new PDocSearchForm({}));
        var moreFilterMap = new Map();
        var moreFilter = this.searchParameterUtils.joinParamsToOneRouteParameter(moreFilterMap, this.splitter);
        if (moreFilter !== undefined && moreFilter.length > 0) {
            if (searchForm.moreFilter !== undefined && searchForm.moreFilter.length > 0) {
                moreFilter = [moreFilter, searchForm.moreFilter].join(this.splitter);
            }
        }
        else {
            moreFilter = searchForm.moreFilter;
        }
        return moreFilter;
    };
    PDocSearchFormConverter.prototype.joinWhatParams = function (pdocSearchForm) {
        var searchForm = (pdocSearchForm ? pdocSearchForm : new PDocSearchForm({}));
        var whatMap = new Map();
        whatMap.set('keyword', searchForm.what);
        whatMap.set('subtype', searchForm.subtype);
        whatMap.set('profiles', searchForm.profiles);
        whatMap.set('flags', searchForm.flags);
        whatMap.set('langkeys', searchForm.langkeys);
        whatMap.set('profiles', searchForm.profiles);
        whatMap.set('sortkey', searchForm.sortkey);
        whatMap.set('theme', searchForm.theme);
        whatMap.set('initial', searchForm.initial);
        return this.searchParameterUtils.joinParamsToOneRouteParameter(whatMap, this.splitter);
    };
    PDocSearchFormConverter.prototype.searchFormToValueMap = function (pdocSearchForm) {
        var searchForm = (pdocSearchForm ? pdocSearchForm : new PDocSearchForm({}));
        var moreFilter = this.joinMoreFilterParams(searchForm);
        var what = this.joinWhatParams(searchForm);
        var params = {
            what: this.searchParameterUtils.joinAndUseValueOrDefault(what, 'alles'),
            fulltext: this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.fulltext, 'egal'),
            moreFilter: this.searchParameterUtils.joinAndUseValueOrDefault(moreFilter, 'ungefiltert'),
            sort: this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.sort, 'relevance'),
            type: this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.type, 'alle'),
            perPage: (+searchForm.perPage || 10) + '',
            pageNum: (+searchForm.pageNum || 1) + ''
        };
        return params;
    };
    PDocSearchFormConverter.prototype.searchFormToUrl = function (baseUrl, pdocSearchForm) {
        var url = baseUrl + 'search/';
        var searchForm = (pdocSearchForm ? pdocSearchForm : new PDocSearchForm({}));
        var moreFilter = this.joinMoreFilterParams(searchForm);
        var what = this.joinWhatParams(searchForm);
        var params = [
            this.searchParameterUtils.joinAndUseValueOrDefault(what, 'alles'),
            this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.fulltext, 'egal'),
            this.searchParameterUtils.joinAndUseValueOrDefault(moreFilter, 'ungefiltert'),
            this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.sort, 'relevance'),
            this.searchParameterUtils.joinAndUseValueOrDefault(searchForm.type, 'alle'),
            +searchForm.perPage || 10,
            +searchForm.pageNum || 1
        ];
        url += params.join('/');
        var queryParameter = [];
        if (searchForm['layout'] !== undefined) {
            queryParameter.push('layout=' + LayoutService.layoutToString(searchForm['layout']));
        }
        if (searchForm['hideForm']) {
            queryParameter.push('hideForm=true');
        }
        if (queryParameter.length > 0) {
            url += '?' + queryParameter.join('&');
        }
        return url;
    };
    PDocSearchFormConverter.prototype.paramsToSearchForm = function (params, defaults, searchForm, queryParams) {
        params = params || {};
        defaults = defaults || {};
        var moreFilterValues = this.searchParameterUtils.splitValuesByPrefixes(params.moreFilter, this.splitter, []);
        var moreFilter = '';
        if (moreFilterValues.has('unknown')) {
            moreFilter += ',' + this.searchParameterUtils.joinValuesAndReplacePrefix(moreFilterValues.get('unknown'), '', ',');
        }
        moreFilter = moreFilter.replace(/[,]+/g, ',').replace(/(^,)|(,$)/g, '');
        var whatFilterValues = this.searchParameterUtils.splitValuesByPrefixes(params.what, this.splitter, ['subtype:', 'initial:', 'flags:', 'key:', 'langkeys:', 'profiles:', 'sortkey:', 'theme:']);
        var subtype = (whatFilterValues.has('subtype:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('subtype:'), 'subtype:', ',') : '');
        var initial = (whatFilterValues.has('initial:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('initial:'), 'initial:', ',') : '');
        var flags = (whatFilterValues.has('flags:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('flags:'), 'flags:', ',') : '');
        var key = (whatFilterValues.has('key:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('key:'), 'key:', ',') : '');
        var langkeys = (whatFilterValues.has('langkeys:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('langkeys:'), 'langkeys:', ',') : '');
        var profiles = (whatFilterValues.has('profiles:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('profiles:'), 'profiles:', ',') : '');
        var sortkey = (whatFilterValues.has('sortkey:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('sortkey:'), 'sortkey:', ',') : '');
        var theme = (whatFilterValues.has('theme:') ?
            this.searchParameterUtils.joinValuesAndReplacePrefix(whatFilterValues.get('theme:'), 'theme:', ',') : '');
        searchForm.subtype = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(subtype, /^alles$/, ''), defaults['subtype'], '');
        searchForm.initial = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(initial, /^alles$/, ''), defaults['initial'], '');
        searchForm.flags = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(flags, /^alles$/, ''), defaults['flags'], '');
        searchForm.key = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(key, /^alles$/, ''), defaults['key'], '');
        searchForm.langkeys = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(langkeys, /^alles$/, ''), defaults['langkeys'], '');
        searchForm.profiles = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(profiles, /^alles$/, ''), defaults['profiles'], '');
        searchForm.sortkey = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(sortkey, /^alles$/, ''), defaults['sortkey'], '');
        searchForm.theme = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(theme, /^alles$/, ''), defaults['theme'], '');
        searchForm.fulltext = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(params['fulltext'], /^egal$/, ''), defaults['fulltext'], '');
        searchForm.moreFilter = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(moreFilter, /^ungefiltert$/, ''), defaults['moreFilter'], '');
        searchForm.sort = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(params['sort'], defaults['sort'], '');
        searchForm.type = this.searchParameterUtils.joinAndUseValueDefaultOrFallback(this.searchParameterUtils.replacePlaceHolder(params['type'], /^alle$/, ''), defaults['type'], '').toLowerCase();
        searchForm.perPage = +params['perPage'] || 10;
        searchForm.pageNum = +params['pageNum'] || 1;
        var layout = this.parseLayoutParams(queryParams, searchForm);
        if (layout !== undefined) {
            searchForm['layout'] = layout;
        }
        if (queryParams !== undefined && (queryParams['hideForm'] === true || queryParams['hideForm'] === 'true')) {
            searchForm['hideForm'] = true;
        }
    };
    PDocSearchFormConverter.prototype.searchFormToHumanReadableText = function (filters, textOnly, obJCache) {
        return this.searchFormUtils.searchFormToHumanReadableMarkup(filters, true, obJCache, this.getHrdIds());
    };
    PDocSearchFormConverter.prototype.searchFormToHumanReadableFilter = function (searchForm) {
        var _this = this;
        var pdocSearchForm = (searchForm ? searchForm : new PDocSearchForm({}));
        var res = [];
        res.push(this.translateService.instant('hrt_search') || 'search');
        res.push(this.searchFormUtils.valueToHumanReadableText(pdocSearchForm.type, 'hrt_type', 'hrt_alltypes', true));
        var moreFilterNames = Object.getOwnPropertyNames(this.getHrdIds()).concat(['noRoute']);
        var moreFilterValues = this.searchParameterUtils.splitValuesByPrefixes(pdocSearchForm.moreFilter, this.splitter, moreFilterNames);
        moreFilterValues.forEach(function (value, key) {
            var moreValue = _this.searchParameterUtils.joinValuesAndReplacePrefix(moreFilterValues.get(key), key + ':', ',');
            res.push(_this.searchFormUtils.valueToHumanReadableText(moreValue, key === 'unknown' ? 'hrt_moreFilter' : 'hrt_' + key, undefined, true));
        });
        res.push(this.searchFormUtils.valueToHumanReadableText(pdocSearchForm.fulltext, 'hrt_fulltext', undefined, true));
        res.push(this.searchFormUtils.valueToHumanReadableText(pdocSearchForm.initial, 'hrt_initial', undefined, true));
        return res;
    };
    PDocSearchFormConverter.prototype.getHrdIds = function () {
        return this.HRD_IDS;
    };
    PDocSearchFormConverter = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SearchParameterUtils, TranslateService,
            SearchFormUtils])
    ], PDocSearchFormConverter);
    return PDocSearchFormConverter;
}());
export { PDocSearchFormConverter };
//# sourceMappingURL=pdoc-searchform-converter.service.js.map