import { SearchFormUtils } from '../../angular-commons/services/searchform-utils.service';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
export declare class CommonDocSearchFormUtils {
    protected searchFormUtils: SearchFormUtils;
    protected searchParameterUtils: SearchParameterUtils;
    constructor(searchFormUtils: SearchFormUtils, searchParameterUtils: SearchParameterUtils);
    getWhenValues(searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>): any[];
    getWhatValues(searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>): any[];
    getTypeValues(searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>): any[];
    getTypeLimit(searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>): number;
    getPlaylistValues(searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>): any[];
}
