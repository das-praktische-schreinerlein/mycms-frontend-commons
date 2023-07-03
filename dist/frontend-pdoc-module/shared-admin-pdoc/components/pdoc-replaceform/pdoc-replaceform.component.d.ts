import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDocReplaceFormComponent } from '../../../../frontend-cdoc-commons/components/cdoc-replaceform/cdoc-replaceform.component';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
export declare class PDocReplaceFormComponent extends CommonDocReplaceFormComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, pdocDataService: PDocDataService, toastr: ToastrService);
    onCancel(): boolean;
    onSubmitAssignKey(): boolean;
    protected getReferenceNameForRecordType(type: string): string;
    protected getSearchTypeForRecordType(type: string): string;
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
    protected generateComparatorName(name: string): string;
}
