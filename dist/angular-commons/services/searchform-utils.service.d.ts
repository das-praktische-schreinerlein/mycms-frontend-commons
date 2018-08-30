import { TranslateService } from '@ngx-translate/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { GenericSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/generic-searchresult';
import { GenericSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-searchform';
import { BaseEntityRecord } from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';
import { HumanReadableFilter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
export declare class SearchFormUtils {
    private translateService;
    private searchParameterUtils;
    constructor(translateService: TranslateService, searchParameterUtils: SearchParameterUtils);
    getIMultiSelectOptionsFromExtractedFacetValuesList(values: any[][], withCount: boolean, removements: RegExp[], translate: boolean): IMultiSelectOption[];
    getFacetValues(searchResult: GenericSearchResult<BaseEntityRecord, GenericSearchForm>, facetName: string, valuePrefix: string, labelPrefix: string): any[];
    moveSelectedToTop(options: IMultiSelectOption[], selected: any[]): IMultiSelectOption[];
    extractSelected(options: IMultiSelectOption[], selected: any[]): IMultiSelectOption[];
    prepareExtendedSelectValues(src: any[]): any[];
    searchFormToHumanReadableMarkup(filters: HumanReadableFilter[], textOnly: boolean, objCache: Map<string, string>, hrdIds: {}): string;
    extractResolvableFilters(filters: HumanReadableFilter[], hrdIds: {}): HumanReadableFilter[];
    extractResolvableIds(filters: HumanReadableFilter[], hrdIds: {}): Map<string, string>;
    valueToHumanReadableText(valueString: any, prefix: string, defaultValue: string, translate: boolean): HumanReadableFilter;
}
