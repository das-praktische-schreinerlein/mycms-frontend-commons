import { ChangeDetectorRef, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { ActionTagFormResultType } from '../cdoc-actiontags/cdoc-actiontags.component';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
export interface CommonDocAssignJoinFormComponentResultType extends ActionTagFormResultType {
    action: 'assignjoin' | string;
    ids: string[];
    referenceField: string;
    newId: string;
}
export declare abstract class CommonDocAssignJoinFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent implements OnInit {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    protected searchFormUtils: SearchFormUtils;
    protected cdocDataService: D;
    protected toastr: ToastrService;
    private lastRecords;
    private facetValues;
    protected newId: string;
    validForSubmit: boolean;
    recordType: string;
    showLoadingSpinner: boolean;
    assignFormGroup: FormGroup;
    optionsSelectNewId: IMultiSelectOption[];
    settingsSelectNewId: IMultiSelectSettings;
    textsSelectNewId: IMultiSelectTexts;
    optionsSelectReferenceField: IMultiSelectOption[];
    settingsSelectReferenceField: IMultiSelectSettings;
    textsSelectReferenceField: IMultiSelectTexts;
    records: CommonDocRecord[];
    resultObservable: Subject<CommonDocAssignJoinFormComponentResultType>;
    protected constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, cdocDataService: D, toastr: ToastrService);
    ngOnInit(): void;
    onCancel(): boolean;
    onSubmitAssignKey(): boolean;
    updateData(): void;
    protected checkForm(): boolean;
    protected onUpdateReferenceField(): boolean;
    protected onUpdateNewIdSelect(): boolean;
    protected checkFormAndSetValidFlag(event?: any): boolean;
    protected abstract getReferenceNamesForRecordType(type: string): string[];
    protected getSearchTypeForRecordType(type: string): string;
    protected updateSelectFields(): void;
    protected getCurrentReferenceField(): string;
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
}
