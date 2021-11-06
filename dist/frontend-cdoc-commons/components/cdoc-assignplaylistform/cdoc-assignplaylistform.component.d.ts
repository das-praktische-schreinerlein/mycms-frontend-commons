import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { GenericCommonDocAssignFormComponent, GenericCommonDocAssignFormComponentResultType } from '../cdoc-assignform/generic-cdoc-assignform.component';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export interface DetailsFieldConfigType {
    type: 'plain' | 'json' | 'property';
}
export interface CommonDocAssignPlaylistFormComponentConfigType {
    detailsField?: DetailsFieldConfigType;
}
export interface CommonDocAssignPlaylistFormComponentResultType extends GenericCommonDocAssignFormComponentResultType {
    action: 'assignplaylist' | string;
    playlistkey: string;
    position?: number;
    set?: number;
    details?: string;
}
export declare abstract class CommonDocAssignPlaylistFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignPlaylistFormComponentResultType> implements OnInit {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    actionTagEvent: ActionTagEvent;
    protected facetNamePrefix: string;
    protected position: number;
    protected set: number;
    protected details: string;
    protected detailsFieldConfig: DetailsFieldConfigType;
    protected constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, cdocDataService: D, toastr: ToastrService, appService: GenericAppService);
    ngOnInit(): void;
    protected createResultObject(): CommonDocAssignPlaylistFormComponentResultType;
    protected createFormGroup(): FormGroup;
    protected configureComponent(config: {}): void;
    protected getComponentConfig(config: {}): CommonDocAssignPlaylistFormComponentConfigType;
    protected getReferenceNamesForRecordType(type: string): string[];
    protected abstract getReferenceNameForRecordType(type: string): any;
    protected onUpdateReferenceField(): boolean;
    protected onUpdateNewIdSelect(): boolean;
    protected onUpdateSet(): boolean;
    protected onUpdatePosition(): boolean;
    updateData(): void;
    protected updateSelectFields(): void;
    protected processFacetResults(searchForm: F, cdocSearchResult: S): void;
    protected checkForm(): boolean;
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
}
