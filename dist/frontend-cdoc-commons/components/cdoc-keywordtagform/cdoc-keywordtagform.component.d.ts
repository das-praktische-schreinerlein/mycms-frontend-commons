import { ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { ActionTagFormResultType } from '../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';
export interface CommonDocKeywordTagFormComponentResultType extends ActionTagFormResultType {
    action: 'keyword' | string;
    ids: string[];
    keywords: string;
    keywordAction: string;
}
export interface CommonDocKeywordTagFormComponentConfig {
    editPrefix: any;
}
export declare abstract class CommonDocKeywordTagFormComponent<R extends CommonDocRecord> extends AbstractInlineComponent implements OnInit {
    fb: FormBuilder;
    activeModal: NgbActiveModal;
    protected cd: ChangeDetectorRef;
    protected toastr: ToastrService;
    private lastRecords;
    protected config: {};
    editPrefix: string;
    keywordSuggestions: string[];
    validForSubmit: boolean;
    showLoadingSpinner: boolean;
    keywordFormGroup: FormGroup;
    records: CommonDocRecord[];
    resultObservable: Subject<CommonDocKeywordTagFormComponentResultType>;
    protected constructor(fb: FormBuilder, activeModal: NgbActiveModal, cd: ChangeDetectorRef, toastr: ToastrService);
    ngOnInit(): void;
    onCancel(): boolean;
    onSubmitKeywordKey(set: boolean): boolean;
    setKeyword(keyword: string): void;
    unsetKeyword(keyword: string): void;
    updateData(): void;
    protected getComponentConfig(config: {}): CommonDocKeywordTagFormComponentConfig;
    protected updateKeywordSuggestions(): boolean;
    protected checkForm(): boolean;
    protected checkFormAndSetValidFlag(event?: any): boolean;
}
