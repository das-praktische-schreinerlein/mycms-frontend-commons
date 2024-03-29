import {Injectable} from '@angular/core';
import {PDocSearchForm} from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import {PDocSearchResult} from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';

@Injectable()
export class PDocDataServiceStub {
    static defaultSearchResult(): PDocSearchResult {
        return new PDocSearchResult(
            new PDocSearchForm({}), 1, [ new PDocRecord({id: '1', name: 'Test'})], new Facets());
    }

    static defaultRecord(): PDocRecord {
        return new PDocRecord({id: '1', name: 'Test'});
    }

    cloneSanitizedSearchForm(values: PDocSearchForm): PDocSearchForm {
        return new PDocSearchForm(values);
    }

    newSearchForm(values: {}): PDocSearchForm {
        return new PDocSearchForm(values);
    }

    search(searchForm: PDocSearchForm): Promise<PDocSearchResult> {
        return Promise.resolve(new PDocSearchResult(searchForm, 0, [], new Facets()));
    }

    newSearchResult(tdocSearchForm: PDocSearchForm, recordCount: number,
                    currentRecords: PDocRecord[], facets: Facets): PDocSearchResult {
        return new PDocSearchResult(tdocSearchForm, recordCount, currentRecords, facets);
    }
    getById(id: any): Promise<PDocRecord> {
        return Promise.resolve(new PDocRecord({id: '1'}));
    }

    getSubDocuments(pdoc: any): PDocRecord[] {
        return [];
    }

}

