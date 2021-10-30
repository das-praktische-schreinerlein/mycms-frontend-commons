import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocAssignFormComponentResultType} from '../cdoc-assignform/cdoc-assignform.component';
import {
    GenericCommonDocAssignFormComponent,
    GenericCommonDocAssignFormComponentResultType
} from '../cdoc-assignform/generic-cdoc-assignform.component';

export interface CommonDocAssignJoinFormComponentResultType extends GenericCommonDocAssignFormComponentResultType {
    action: 'assignjoin' | string;
}

export abstract class CommonDocAssignJoinFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>>
    extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignJoinFormComponentResultType> {

    protected facetNamePrefix = 'label.assignjoin.reference.';

    protected createResultObject(): CommonDocAssignFormComponentResultType {
        return {
            action: 'assignjoin',
            ids: this.records.map(value => value.id),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        };
    }
}
