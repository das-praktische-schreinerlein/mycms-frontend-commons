import { FormGroup } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { GenericCommonDocAssignFormComponent, GenericCommonDocAssignFormComponentResultType } from '../cdoc-assignform/generic-cdoc-assignform.component';
import { CommonDocAssignJoinFormComponentResultType } from '../cdoc-assignjoinform/cdoc-assignjoinform.component';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
export interface CommonDocAssignPlaylistFormComponentResultType extends GenericCommonDocAssignFormComponentResultType {
    action: 'assignplaylist' | string;
    playlistkey: string;
    position: number;
}
export declare abstract class CommonDocAssignPlaylistFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignJoinFormComponentResultType> {
    actionTagEvent: ActionTagEvent;
    protected facetNamePrefix: string;
    protected position: number;
    protected createResultObject(): CommonDocAssignPlaylistFormComponentResultType;
    protected createFormGroup(): FormGroup;
    protected getReferenceNamesForRecordType(type: string): string[];
    protected abstract getReferenceNameForRecordType(type: string): any;
    protected onUpdateReferenceField(): boolean;
    protected onUpdateNewIdSelect(): boolean;
    updateData(): void;
    protected updateSelectFields(): void;
    protected processFacetResults(searchForm: F, cdocSearchResult: S): void;
    protected checkForm(): boolean;
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
}
