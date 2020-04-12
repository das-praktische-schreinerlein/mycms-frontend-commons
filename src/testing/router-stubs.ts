import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';

@Injectable()
export class ActivatedRouteStub {
    params = of({
        id: 1
    });
    data = of({
        record: {
            data: new CommonDocRecord({id: '1', name: 'Test'})
        },
        pdoc: {
            data: new PDocRecord({id: '1', name: 'Test'})
        },
        searchForm: {
            data: new CommonDocSearchForm({})
        },
        flgDoSearch: false,
        baseSearchUrl: {
            data: '/sections'
        }
    });

    public queryParamMap: {} = {
        subscribe: function () {}
    };

    public fragment: {} = {
        subscribe: function () {}
    };
}
