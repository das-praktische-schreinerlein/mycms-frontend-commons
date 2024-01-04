import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SchemaValidationError } from 'js-data';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { CommonDocEditformComponent, CommonDocEditformComponentConfig } from '../../../../frontend-cdoc-commons/components/cdoc-editform/cdoc-editform.component';
import { PDocNameSuggesterService } from '../../services/pdoc-name-suggester.service';
import { Router } from '@angular/router';
import { Layout } from '../../../../angular-commons/services/layout.service';
import { CommonDocEditorCommandComponentConfig } from '../../../../angular-commons/components/text-editor/text-editor.component';
import { PDocDescSuggesterService } from '../../services/pdoc-desc-suggester.service';
import { PDocSearchFormUtils } from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import { ElementFilterType } from '../../../../angular-commons/services/layout.utils';
import { PrintService } from '../../../../angular-commons/services/print.service';
import { PdfPrintService } from '../../../../angular-commons/services/pdf-print.service';
export interface PageDocEditformComponentConfig extends CommonDocEditformComponentConfig {
    editorCommands: CommonDocEditorCommandComponentConfig;
    sampleDesc: string;
}
export declare class PDocEditformComponent extends CommonDocEditformComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    fb: FormBuilder;
    protected toastr: ToastrService;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected pdocSearchFormUtils: PDocSearchFormUtils;
    protected searchFormUtils: SearchFormUtils;
    protected pdocDataService: PDocDataService;
    contentUtils: PDocContentUtils;
    private document;
    protected pdocNameSuggesterService: PDocNameSuggesterService;
    protected pdocDescSuggesterService: PDocDescSuggesterService;
    protected printService: PrintService;
    protected pdfPrintService: PdfPrintService;
    Layout: typeof Layout;
    optionsSelect: {
        'pageId': IMultiSelectOption[];
        'flags': IMultiSelectOption[];
        'subType': IMultiSelectOption[];
        'langkeys': IMultiSelectOption[];
        'profiles': IMultiSelectOption[];
        'subSectionIds': IMultiSelectOption[];
        'subTypePageType': IMultiSelectOption[];
    };
    settingsSelectPageType: IMultiSelectSettings;
    settingsSelectFlags: IMultiSelectSettings;
    settingsSelectLangkeys: IMultiSelectSettings;
    settingsSelectProfiles: IMultiSelectSettings;
    settingsSelectSubSectionIds: IMultiSelectSettings;
    textsSelectPageType: IMultiSelectTexts;
    textsSelectFlags: IMultiSelectTexts;
    textsSelectLangkeys: IMultiSelectTexts;
    textsSelectProfiles: IMultiSelectTexts;
    textsSelectSubSectionIds: IMultiSelectTexts;
    editorCommands: CommonDocEditorCommandComponentConfig;
    suggestedFileBase: string;
    descMdRecommended: string;
    sampleDesc: string;
    renderedDescId: string;
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef, appService: GenericAppService, pdocSearchFormUtils: PDocSearchFormUtils, searchFormUtils: SearchFormUtils, pdocDataService: PDocDataService, contentUtils: PDocContentUtils, document: any, pdocNameSuggesterService: PDocNameSuggesterService, pdocDescSuggesterService: PDocDescSuggesterService, router: Router, printService: PrintService, pdfPrintService: PdfPrintService);
    onInputChanged(value: any, field: string): boolean;
    recommendName(): void;
    recommendDesc(): void;
    setRenderedDescId(renderedDescId: string): void;
    isPdfPrintAvailable(): boolean;
    isPrintAvailable(): boolean;
    onOpenPrintPreview(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number, printCssIdRegExp?: string): boolean;
    onPrintPdf(elementFilterType: ElementFilterType, filter: string, width?: number, height?: number, printCssIdRegExp?: string): boolean;
    protected validateSchema(record: PDocRecord): SchemaValidationError[];
    protected validateValues(record: PDocRecord): string[];
    protected getComponentConfig(config: {}): PageDocEditformComponentConfig;
    protected configureComponent(config: {}): void;
    protected prepareSubmitValues(values: {}): void;
    protected createDefaultFormValueConfig(record: PDocRecord): {};
    protected postProcessFormValueConfig(record: PDocRecord, formValueConfig: {}): void;
    protected updateFormComponents(): void;
    protected updateOptionValues(pdocSearchResult: PDocSearchResult): boolean;
    protected updateKeywordSuggestions(): boolean;
}
