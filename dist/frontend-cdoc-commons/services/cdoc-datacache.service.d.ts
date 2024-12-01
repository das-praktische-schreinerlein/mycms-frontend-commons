import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { GenericSearchOptions } from '@dps/mycms-commons/dist/search-commons/services/generic-search.service';
export declare class CommonDocDataCacheService<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> {
    private cdocDataService;
    protected recordCache: Map<string, R>;
    protected nameCache: Map<string, string>;
    protected searchOptions: GenericSearchOptions;
    constructor(cdocDataService: D);
    resolveNamesForIds(ids: string[]): Promise<Map<string, string>>;
}
