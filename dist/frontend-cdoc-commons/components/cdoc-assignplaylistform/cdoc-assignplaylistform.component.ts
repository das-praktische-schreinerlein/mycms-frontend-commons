import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {
    GenericCommonDocAssignFormComponent,
    GenericCommonDocAssignFormComponentResultType
} from '../cdoc-assignform/generic-cdoc-assignform.component';
import {CommonDocAssignJoinFormComponentResultType} from '../cdoc-assignjoinform/cdoc-assignjoinform.component';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {ActionTagEvent} from '../cdoc-actiontags/cdoc-actiontags.component';

export interface CommonDocAssignPlaylistFormComponentResultType extends GenericCommonDocAssignFormComponentResultType {
    action: 'assignplaylist' | string;
    playlistkey: string;
    position: number;
}

export abstract class CommonDocAssignPlaylistFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>>
extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignJoinFormComponentResultType> {

    @Input()
    public actionTagEvent: ActionTagEvent;

    protected facetNamePrefix = 'label.assignplaylist.reference.';
    protected position: number = undefined;

    protected createResultObject(): CommonDocAssignPlaylistFormComponentResultType {
        return {
            action: 'assignplaylist',
            ids: this.records.map(value => value.id),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            playlistkey: this.newId,
            position: this.position
        }
    }

    protected createFormGroup(): FormGroup {
        return this.fb.group({
            referenceField: this.getReferenceNameForRecordType(undefined),
            newIdOption: 'select',
            newIdInput: '',
            position: '',
            newIdSelect: ''
        });
    }

    protected getReferenceNamesForRecordType(type: string): string[] {
        const referenceName = this.getReferenceNameForRecordType(type);
        if (referenceName !== undefined) {
            return [referenceName];
        }

        return undefined;
    }

    protected abstract getReferenceNameForRecordType(type: string);

    protected onUpdateReferenceField(): boolean {
        return false;
    }

    protected onUpdateNewIdSelect(): boolean {
        this.checkFormAndSetValidFlag();

        return false;
    }

    public updateData(): void {
        this.position = undefined;
        super.updateData();
    }

    protected updateSelectFields() {
        this.assignFormGroup.patchValue({
            newIdOption: 'select',
            referenceField: this.getReferenceNameForRecordType(undefined)});

        super.updateSelectFields();
    }

    protected processFacetResults(searchForm: F, cdocSearchResult: S): void {
        super.processFacetResults(searchForm, cdocSearchResult);
        if (this.records !== undefined && this.records.length === 1) {
            this.assignFormGroup.patchValue({
                newIdOption: 'select',
                referenceField: this.getReferenceNameForRecordType(this.records[0].type),
                newIdSelect: this.actionTagEvent.config.payload['playlistkey'],
                position: this.actionTagEvent.config.payload['position'] });
        }
    }

    protected checkForm(): boolean {
        const values = this.assignFormGroup.getRawValue();
        this.newId = undefined;
        this.position = undefined;
        this.newId = Array.isArray(values['newIdSelect'])
            ? values['newIdSelect'][0]
            : values['newIdSelect'];
        this.position = Array.isArray(values['position'])
            ? values['position'][0]
            : values['position'];
        this.position = this.position === null || this.position <= 0
            ? undefined
            : this.position;

        if (this.newId === undefined || this.newId === null || this.newId === 'null' || this.newId === '') {
            return false;
        }

        return true;
    }

    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[] {
        const values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            keyValues, true, [], false);

        values.map(value => {
            value.name = value.name + ' - ID: ' + value.id;
        });

        return values;
    }
}
