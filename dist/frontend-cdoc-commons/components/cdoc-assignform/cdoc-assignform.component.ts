import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {
    GenericCommonDocAssignFormComponent,
    GenericCommonDocAssignFormComponentResultType
} from './generic-cdoc-assignform.component';

export interface CommonDocAssignFormComponentResultType extends GenericCommonDocAssignFormComponentResultType {
    action: 'assign' | string;
}

export abstract class CommonDocAssignFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>>
    extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignFormComponentResultType> {

    protected createResultObject(): CommonDocAssignFormComponentResultType {
        return {
            action: 'assign',
            ids: this.records.map(value => value.id),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        };
    }
}
