import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
export declare class PDocDataServiceStub {
    static defaultSearchResult(): PDocSearchResult;
    static defaultRecord(): PDocRecord;
    search(searchForm: PDocSearchForm): Promise<PDocSearchResult>;
    getById(id: any): Promise<PDocRecord>;
    getSubDocuments(pdoc: any): PDocRecord[];
}
