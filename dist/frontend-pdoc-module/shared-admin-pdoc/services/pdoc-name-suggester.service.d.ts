import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SuggesterEnvironment, SuggesterService } from '../../../frontend-cdoc-commons/services/suggester.service';
export interface PDocNameSuggesterEnvironment extends SuggesterEnvironment {
    optionsSelectSubTypePageType: IMultiSelectOption[];
    optionsSelectPageId: IMultiSelectOption[];
}
export declare class PDocNameSuggesterService implements SuggesterService {
    protected searchFormUtils: SearchFormUtils;
    constructor(searchFormUtils: SearchFormUtils);
    suggest(form: {}, environment: PDocNameSuggesterEnvironment): Promise<string>;
}
