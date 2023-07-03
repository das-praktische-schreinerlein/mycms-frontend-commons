import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { ToastrService } from 'ngx-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { CommonDocAssignJoinFormComponent } from '../../../../frontend-cdoc-commons/components/cdoc-assignjoinform/cdoc-assignjoinform.component';
export declare class PDocAssignJoinFormComponent extends CommonDocAssignJoinFormComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, pdocDataService: PDocDataService, toastr: ToastrService);
    protected getReferenceNamesForRecordType(type: string): string[];
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
}
