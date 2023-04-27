import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
export declare class PDocDataServiceStub {
    static defaultSearchResult(): PDocSearchResult;
    static defaultRecord(): PDocRecord;
    cloneSanitizedSearchForm(values: PDocSearchForm): PDocSearchForm;
    newSearchForm(values: {}): PDocSearchForm;
    search(searchForm: PDocSearchForm): Promise<PDocSearchResult>;
    newSearchResult(tdocSearchForm: PDocSearchForm, recordCount: number, currentRecords: PDocRecord[], facets: Facets): PDocSearchResult;
    getById(id: any): Promise<PDocRecord>;
    getSubDocuments(pdoc: any): PDocRecord[];
}
