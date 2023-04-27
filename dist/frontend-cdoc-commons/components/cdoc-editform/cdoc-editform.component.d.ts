import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SchemaValidationError } from 'js-data';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocContentUtils, KeywordSuggestion } from '../../services/cdoc-contentutils.service';
import { CommonDocSearchFormUtils } from '../../services/cdoc-searchform-utils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare enum CommonDocEditformComponentForwardMode {
    SHOW = 0,
    BACK_TO_SEARCH = 1,
    BACK_TO_SOURCE_SHOW = 2,
    BACK_TO_SOURCE_EDIT = 3
}
export interface CommonDocEditformComponentReturnType<R extends CommonDocRecord> {
    returnMode: CommonDocEditformComponentForwardMode;
    result: R;
}
export interface CommonDocEditformComponentConfig {
    numBeanFieldConfig: {};
    stringBeanFieldConfig: {};
    stringArrayBeanFieldConfig: {};
    inputSuggestionValueConfig: {};
    optionsSelect: {};
    suggestionConfigs: KeywordSuggestion[];
    editPrefix: any;
}
export declare abstract class CommonDocEditformComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent {
    fb: FormBuilder;
    protected toastr: ToastrService;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected cdocSearchFormUtils: CommonDocSearchFormUtils;
    protected searchFormUtils: SearchFormUtils;
    protected cdocDataService: D;
    protected contentUtils: CommonDocContentUtils;
    protected router: Router;
    protected config: {};
    suggestionConfigs: KeywordSuggestion[];
    editPrefix: string;
    protected defaultSelectSetting: IMultiSelectSettings;
    protected numBeanFieldConfig: {};
    protected stringBeanFieldConfig: {};
    protected stringArrayBeanFieldConfig: {};
    protected inputSuggestionValueConfig: {};
    optionsSelect: {};
    inputSuggestionValues: {};
    CommonDocEditformComponentForwardMode: typeof CommonDocEditformComponentForwardMode;
    textsSelectPlaylists: IMultiSelectTexts;
    editFormGroup: FormGroup;
    keywordSuggestions: string[];
    record: R;
    backToSearch?: boolean;
    availableForwardModes: CommonDocEditformComponentForwardMode[];
    save: EventEmitter<R>;
    saveAndSearch: EventEmitter<R>;
    saveAndForward: EventEmitter<CommonDocEditformComponentReturnType<R>>;
    modal?: boolean;
    cancelModal: EventEmitter<boolean>;
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef, appService: GenericAppService, cdocSearchFormUtils: CommonDocSearchFormUtils, searchFormUtils: SearchFormUtils, cdocDataService: D, contentUtils: CommonDocContentUtils, router: Router);
    setKeyword(keyword: string): void;
    unsetKeyword(keyword: string): void;
    setValue(field: string, value: any): void;
    formatInputDate(value: Date): string;
    recommendName(): void;
    submitSave(event: Event, backToSearch: boolean): boolean;
    submitSaveAndForward(event: Event, returnMode: CommonDocEditformComponentForwardMode): boolean;
    submitCancelModal(event: Event): boolean;
    onCreateNewLink(key: string, id: string): boolean;
    onShowEntityLink(key: string, id: string): boolean;
    protected getComponentConfig(config: {}): CommonDocEditformComponentConfig;
    protected configureComponent(config: {}): void;
    protected prepareSubmitValues(values: {}): void;
    protected validateSubmitValues(values: R): boolean;
    protected abstract validateSchema(record: R): SchemaValidationError[];
    protected abstract validateValues(record: R): string[];
    protected updateData(): void;
    protected createDefaultFormValueConfig(record: R): {};
    protected postProcessFormValueConfig(record: R, formValueConfig: {}): void;
    protected updateFormComponents(): void;
    protected fillFacets(record: R): void;
    protected updateOptionValues(cdocSearchResult: S): boolean;
    protected updateSuggestionValues(cdocSearchResult: S): boolean;
    protected updateKeywordSuggestions(): boolean;
    protected createSelectOptions(definitions: {}, values: {}, optionsSelect: {}): void;
}
