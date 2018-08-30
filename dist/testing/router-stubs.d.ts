import { Observable } from 'rxjs/Observable';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
export declare class ActivatedRouteStub {
    params: Observable<{
        id: number;
    }>;
    data: Observable<{
        record: {
            data: CommonDocRecord;
        };
        pdoc: {
            data: PDocRecord;
        };
        searchForm: {
            data: CommonDocSearchForm;
        };
        flgDoSearch: boolean;
        baseSearchUrl: {
            data: string;
        };
    }>;
    queryParamMap: {};
    fragment: {};
}
