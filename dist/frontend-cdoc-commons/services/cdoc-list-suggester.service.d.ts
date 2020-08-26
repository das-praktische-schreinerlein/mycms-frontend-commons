import { SuggesterEnvironment, SuggesterService } from './suggester.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
export interface CommonDocListSuggesterEnvironment extends SuggesterEnvironment {
}
export interface CommonDocListSuggesterConfiguration {
    headingTemplate: string;
    footerTemplate: string;
    listItemTemplate: string;
    listItemsFallbackTemplate: string;
    nameReplacements?: [RegExp, string][];
}
export declare abstract class CommonDocListSuggesterService<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>> implements SuggesterService {
    protected commonDocDataService: CommonDocDataService<R, F, S>;
    protected DEFAULT_NAME_REPLACEMENTS: [RegExp, string][];
    protected constructor(commonDocDataService: CommonDocDataService<R, F, S>);
    suggest(form: {}, environment: CommonDocListSuggesterEnvironment): Promise<string>;
    protected abstract getConfiguration(environment: CommonDocListSuggesterEnvironment): CommonDocListSuggesterConfiguration;
    protected abstract appendFiltersToListItemSearchForm(searchForm: F, form: {}, environment: CommonDocListSuggesterEnvironment): any;
    protected generateHeading(form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected generateFooter(form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected generateListFallback(form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected generateListItem(item: R, form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected createListItemSearchForm(form: {}, environment: CommonDocListSuggesterEnvironment): F;
    protected doReplacements(template: string, form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected replaceDefaultPlaceholder(template: string, form: {}, environment: CommonDocListSuggesterEnvironment): string;
    protected getCommonReplacements(environment: CommonDocListSuggesterEnvironment): [RegExp, string][];
    protected doNameReplacements(template: string, form: {}, environment: CommonDocListSuggesterEnvironment): string;
}
