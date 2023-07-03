import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocAssignFormComponent } from '../../../../frontend-cdoc-commons/components/cdoc-assignform/cdoc-assignform.component';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { ToastrService } from 'ngx-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
export declare class PDocAssignFormComponent extends CommonDocAssignFormComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, searchFormUtils: SearchFormUtils, pdocDataService: PDocDataService, toastr: ToastrService);
    protected getReferenceNamesForRecordType(type: string): string[];
    protected generateSelectIdValues(facetName: string, keyValues: any[]): IMultiSelectOption[];
}
