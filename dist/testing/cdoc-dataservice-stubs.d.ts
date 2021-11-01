import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
export declare class CommonDocDataServiceStub {
    static defaultSearchResult(): CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    static defaultRecord(): CommonDocRecord;
    cloneSanitizedSearchForm(values: CommonDocSearchForm): CommonDocSearchForm;
    newSearchForm(values: {}): CommonDocSearchForm;
    search(searchForm: CommonDocSearchForm): Promise<CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>>;
    newSearchResult(cdocSearchForm: CommonDocSearchForm, recordCount: number, currentRecords: CommonDocRecord[], facets: Facets): CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
}
