import {ChangeDetectorRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect';
import {
    GenericCommonDocAssignFormComponent,
    GenericCommonDocAssignFormComponentResultType
} from '../cdoc-assignform/generic-cdoc-assignform.component';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {ActionTagEvent} from '../cdoc-actiontags/cdoc-actiontags.component';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';

export interface DetailsFieldConfigType {
    type: 'plain' | 'json' | 'property'
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

export abstract class CommonDocAssignPlaylistFormComponent<R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>>
extends GenericCommonDocAssignFormComponent<R, F, S, D, CommonDocAssignPlaylistFormComponentResultType> implements OnInit {

    @Input()
    public actionTagEvent: ActionTagEvent;

    protected facetNamePrefix = 'label.assignplaylist.reference.';
    protected position: number = undefined;
    protected set: number = undefined;
    protected details: string = undefined;
    protected detailsFieldConfig: DetailsFieldConfigType = undefined;

    protected constructor(public fb: FormBuilder, public activeModal: NgbActiveModal, protected cd: ChangeDetectorRef,
                          searchFormUtils: SearchFormUtils, cdocDataService: D, toastr: ToastrService,
                          protected appService: GenericAppService) {
        super(fb, activeModal, cd, searchFormUtils, cdocDataService, toastr);
    }

    ngOnInit() {
        this.appService.getAppState().subscribe(appState => {
            if (appState === AppState.Ready) {
                const config = this.appService.getAppConfig();
                this.configureComponent(config);
                this.createFormGroup();
                this.updateData();
            }
        });
    }

    protected createResultObject(): CommonDocAssignPlaylistFormComponentResultType {
        return {
            action: 'assignplaylist',
            ids: this.records.map(value => value.id),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            playlistkey: this.newId,
            position: this.position,
            set: this.set,
            details: this.details
        }
    }

    protected createFormGroup(): FormGroup {
        return this.fb.group({
            referenceField: this.getReferenceNameForRecordType(undefined),
            newIdOption: 'select',
            newIdInput: '',
            position: '',
            set: true,
            details: '',
            newIdSelect: ''
        });
    }

    protected configureComponent(config: {}): void {
        const componentConfig: CommonDocAssignPlaylistFormComponentConfigType = this.getComponentConfig(config);
        this.detailsFieldConfig = componentConfig.detailsField;
    }

    protected getComponentConfig(config: {}): CommonDocAssignPlaylistFormComponentConfigType {
        const componentConfig: CommonDocAssignPlaylistFormComponentConfigType = {
        };

        if (BeanUtils.getValue(config, 'components.cdoc-assignplaylistform.detailsField.type')) {
            componentConfig.detailsField = {
                type: config['components']['cdoc-assignplaylistform']['detailsField']['type']
            }
        }

        return componentConfig;
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

    protected onUpdateSet(): boolean {
        this.checkFormAndSetValidFlag();

        return false;
    }

    protected onUpdatePosition(): boolean {
        this.assignFormGroup.patchValue({set: true});
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
                newIdSelect: this.actionTagEvent.config.payload
                    ? this.actionTagEvent.config.payload['playlistkey']
                    : undefined,
                set: this.actionTagEvent.config.payload
                    ? this.actionTagEvent.config.payload['set']
                    : true,
                position: this.actionTagEvent.config.payload
                    ? this.actionTagEvent.config.payload['position']
                    : undefined,
                details: this.actionTagEvent.config.payload
                    ? this.actionTagEvent.config.payload['details']
                    : undefined
            });
        }
    }

    protected checkForm(): boolean {
        const values = this.assignFormGroup.getRawValue();
        this.newId = undefined;
        this.position = undefined;
        this.details = undefined;
        this.set = undefined;

        this.newId = Array.isArray(values['newIdSelect'])
            ? values['newIdSelect'][0]
            : values['newIdSelect'];
        this.position = Array.isArray(values['position'])
            ? values['position'][0]
            : values['position'];
        this.details = Array.isArray(values['details'])
            ? values['details'][0]
            : values['details'];
        this.set = Array.isArray(values['set'])
            ? values['set'][0]
            : values['set'];
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
