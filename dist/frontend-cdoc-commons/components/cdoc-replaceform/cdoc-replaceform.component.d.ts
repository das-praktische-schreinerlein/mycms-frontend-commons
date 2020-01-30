import { ChangeDetectorRef } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocAssignFormComponent, CommonDocAssignFormComponentResultType } from '../cdoc-assignform/cdoc-assignform.component';
export interface CommonDocReplaceFormComponentResultType extends CommonDocAssignFormComponentResultType {
    action: 'replace';
    ids: string[];
    newId: string;
    newIdSetNull: boolean;
}
export declare abstract class CommonDocReplaceFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends CommonDocAssignFormComponent<R, F, S, D> {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    records: CommonDocRecord[];
    resultObservable: Subject<CommonDocReplaceFormComponentResultType>;
    protected constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, cdocDataService: D, toastr: ToastrService);
    onSubmitAssignKey(): boolean;
    protected abstract getReferenceNameForRecordType(type: string): string;
    protected abstract getSearchTypeForRecordType(type: string): string;
    protected getReferenceNamesForRecordType(type: string): string[];
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
    protected generateComparatorName(name: string): string;
    protected getCurrentReferenceField(): string;
}
