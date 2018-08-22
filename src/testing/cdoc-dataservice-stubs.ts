import {Injectable} from '@angular/core';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';

@Injectable()
export class CommonDocDataServiceStub {
    static defaultSearchResult(): CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm> {
        return new CommonDocSearchResult(
            new CommonDocSearchForm({}), 1, [ new CommonDocRecord({id: '1', name: 'Test'})], new Facets());
    }

    static defaultRecord(): CommonDocRecord {
        return new CommonDocRecord({id: '1', name: 'Test'});
    }

    search(searchForm: CommonDocSearchForm): Promise<CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>> {
        return Promise.resolve(new CommonDocSearchResult(searchForm, 0, [], new Facets()));
    };
}
