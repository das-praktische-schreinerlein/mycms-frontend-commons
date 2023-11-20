import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { GenericSearchFormConverter, HumanReadableFilter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { TranslateService } from '@ngx-translate/core';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { Layout } from '../../../angular-commons/services/layout.service';
export declare class PDocSearchFormConverter implements GenericSearchFormConverter<PDocSearchForm> {
    private searchParameterUtils;
    private translateService;
    private searchFormUtils;
    readonly splitter = "_,_";
    HRD_IDS: {
        pageid_i: string;
        page_id_is: string;
    };
    constructor(searchParameterUtils: SearchParameterUtils, translateService: TranslateService, searchFormUtils: SearchFormUtils);
    isValid(searchForm: PDocSearchForm): boolean;
    newSearchForm(values: {}): PDocSearchForm;
    parseLayoutParams(values: {}, pdocSearchForm: PDocSearchForm): Layout;
    joinMoreFilterParams(pdocSearchForm: PDocSearchForm): string;
    joinWhatParams(pdocSearchForm: PDocSearchForm): string;
    searchFormToValueMap(pdocSearchForm: PDocSearchForm): {
        [key: string]: string;
    };
    searchFormToUrl(baseUrl: string, pdocSearchForm: PDocSearchForm): string;
    paramsToSearchForm(params: any, defaults: {}, searchForm: PDocSearchForm, queryParams?: {}): void;
    searchFormToHumanReadableText(filters: HumanReadableFilter[], textOnly: boolean, obJCache: Map<string, string>): string;
    searchFormToHumanReadableFilter(searchForm: PDocSearchForm): HumanReadableFilter[];
    getHrdIds(): {};
}
