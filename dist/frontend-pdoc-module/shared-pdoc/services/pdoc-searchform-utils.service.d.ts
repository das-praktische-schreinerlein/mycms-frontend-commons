import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { CommonDocSearchFormUtils } from '../../../frontend-cdoc-commons/services/cdoc-searchform-utils.service';
export declare class PDocSearchFormUtils extends CommonDocSearchFormUtils {
    protected searchFormUtils: SearchFormUtils;
    protected searchParameterUtils: SearchParameterUtils;
    constructor(searchFormUtils: SearchFormUtils, searchParameterUtils: SearchParameterUtils);
    getFlagsValues(searchResult: PDocSearchResult): any[];
    getSubTypeValues(searchResult: PDocSearchResult): any[];
    getKeyValues(searchResult: PDocSearchResult): any[];
    getLangkeysValues(searchResult: PDocSearchResult): any[];
    getProfilesValues(searchResult: PDocSearchResult): any[];
    getThemeValues(searchResult: PDocSearchResult): any[];
    getSortkeyValues(searchResult: PDocSearchResult): any[];
}
