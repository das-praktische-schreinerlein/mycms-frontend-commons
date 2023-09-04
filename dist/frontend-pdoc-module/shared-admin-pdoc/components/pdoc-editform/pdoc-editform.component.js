var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PDocRecordValidator } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { FormBuilder } from '@angular/forms';
import { PDocRecordSchema } from '@dps/mycms-commons/dist/pdoc-commons/model/schemas/pdoc-record-schema';
import { ToastrService } from 'ngx-toastr';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { CommonDocEditformComponent } from '../../../../frontend-cdoc-commons/components/cdoc-editform/cdoc-editform.component';
import { DOCUMENT } from '@angular/common';
import { PDocNameSuggesterService } from '../../services/pdoc-name-suggester.service';
import { Router } from '@angular/router';
import { Layout } from '../../../../angular-commons/services/layout.service';
import { PDocDescSuggesterService } from '../../services/pdoc-desc-suggester.service';
import { PDocSearchFormUtils } from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import { ObjectUtils } from '@dps/mycms-commons/dist/commons/utils/object.utils';
import { PrintService } from '../../../../angular-commons/services/print.service';
import { PdfPrintService } from '../../../../angular-commons/services/pdf-print.service';
var PDocEditformComponent = /** @class */ (function (_super) {
    __extends(PDocEditformComponent, _super);
    function PDocEditformComponent(fb, toastr, cd, appService, pdocSearchFormUtils, searchFormUtils, pdocDataService, contentUtils, document, pdocNameSuggesterService, pdocDescSuggesterService, router, printService, pdfPrintService) {
        var _this = _super.call(this, fb, toastr, cd, appService, pdocSearchFormUtils, searchFormUtils, pdocDataService, contentUtils, router) || this;
        _this.fb = fb;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.pdocSearchFormUtils = pdocSearchFormUtils;
        _this.searchFormUtils = searchFormUtils;
        _this.pdocDataService = pdocDataService;
        _this.contentUtils = contentUtils;
        _this.document = document;
        _this.pdocNameSuggesterService = pdocNameSuggesterService;
        _this.pdocDescSuggesterService = pdocDescSuggesterService;
        _this.printService = printService;
        _this.pdfPrintService = pdfPrintService;
        _this.Layout = Layout;
        _this.settingsSelectPageType = _this.defaultSelectSetting;
        _this.settingsSelectFlags = __assign({}, _this.defaultSelectSetting, { selectionLimit: 9999 });
        _this.settingsSelectLangkeys = __assign({}, _this.defaultSelectSetting, { selectionLimit: 9999 });
        _this.settingsSelectProfiles = __assign({}, _this.defaultSelectSetting, { selectionLimit: 9999 });
        _this.settingsSelectSubSectionIds = __assign({}, _this.defaultSelectSetting, { selectionLimit: 9999 });
        _this.textsSelectPageType = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Action ausgewählt',
            checkedPlural: 'Aktion ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'alles' };
        _this.textsSelectFlags = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Flag ausgewählt',
            checkedPlural: 'Flags ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'alles' };
        _this.textsSelectLangkeys = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Sprache ausgewählt',
            checkedPlural: 'Sprachen ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'alles' };
        _this.textsSelectProfiles = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Profil ausgewählt',
            checkedPlural: 'Profile ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'alles' };
        _this.textsSelectSubSectionIds = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Unterseite ausgewählt',
            checkedPlural: 'Unterseiten ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'alles' };
        _this.editorCommands = {
            singleCommands: [],
            rangeCommands: [],
            commandBlocks: []
        };
        _this.descMdRecommended = '';
        return _this;
    }
    PDocEditformComponent.prototype.onInputChanged = function (value, field) {
        return false;
    };
    PDocEditformComponent.prototype.recommendName = function () {
        var _this = this;
        this.pdocNameSuggesterService.suggest(this.editFormGroup.getRawValue(), {
            optionsSelectPageId: this.optionsSelect.pageId,
            optionsSelectSubTypePageType: this.optionsSelect.subTypePageType
        }).then(function (name) {
            _this.setValue('name', name);
        });
    };
    PDocEditformComponent.prototype.recommendDesc = function () {
        var _this = this;
        this.pdocDescSuggesterService.suggest(this.editFormGroup.getRawValue(), {}).then(function (desc) {
            _this.descMdRecommended = desc;
            _this.cd.markForCheck();
        }).catch(function (reason) {
            _this.descMdRecommended = undefined;
            _this.cd.markForCheck();
        });
    };
    PDocEditformComponent.prototype.onOpenPrintPreview = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp)
        };
        this.printService.openPrintPreview(options);
        return false;
    };
    PDocEditformComponent.prototype.onPrintPdf = function (elementFilterType, filter, width, height, printCssIdRegExp) {
        var options = {
            printElementFilter: {
                type: elementFilterType,
                value: filter
            },
            previewWindow: {
                width: width,
                height: height
            },
            printStyleIdFilter: new RegExp(printCssIdRegExp),
            fileName: 'filename.pdf',
            pdfOptions: {
                orientation: 'portrait',
                format: 'a4'
            },
            waitForRenderingMs: 1000
        };
        this.pdfPrintService.printPdf(options);
        return false;
    };
    PDocEditformComponent.prototype.validateSchema = function (record) {
        return PDocRecordSchema.validate(record);
    };
    PDocEditformComponent.prototype.validateValues = function (record) {
        var errors = [];
        return errors.concat(PDocRecordValidator.instance.validateValues(record));
    };
    PDocEditformComponent.prototype.getComponentConfig = function (config) {
        var prefix = '';
        var suggestionConfig = [];
        if (BeanUtils.getValue(config, 'components.pdoc-keywords.keywordSuggestions')) {
            suggestionConfig = BeanUtils.getValue(config, 'components.pdoc-keywords.keywordSuggestions');
            prefix = BeanUtils.getValue(config, 'components.pdoc-keywords.editPrefix');
        }
        var editorCommands = {
            rangeCommands: [],
            singleCommands: [],
            commandBlocks: []
        };
        if (BeanUtils.getValue(config, 'components.pdoc-editor-commands.singleCommands')) {
            editorCommands.singleCommands = BeanUtils.getValue(config, 'components.pdoc-editor-commands.singleCommands');
        }
        if (BeanUtils.getValue(config, 'components.pdoc-editor-commands.rangeCommands')) {
            editorCommands.rangeCommands = BeanUtils.getValue(config, 'components.pdoc-editor-commands.rangeCommands');
        }
        if (BeanUtils.getValue(config, 'components.pdoc-editor-commands.commandBlocks')) {
            editorCommands.commandBlocks = BeanUtils.getValue(config, 'components.pdoc-editor-commands.commandBlocks');
        }
        var defaultConfig = {
            editorCommands: editorCommands,
            suggestionConfigs: suggestionConfig,
            editPrefix: prefix,
            numBeanFieldConfig: {},
            stringBeanFieldConfig: {
                'css': {},
                'heading': {},
                'image': {},
                'key': {},
                'subtype': {},
                'subTypePageType': {
                    labelPrefix: '',
                    values: ['SectionOverviewPage', 'SimplePage', 'SectionPage']
                },
                'teaser': {},
                'theme': {}
            },
            stringArrayBeanFieldConfig: {
                'flags': {
                    labelPrefix: '',
                    values: ['flg_ShowSearch', 'flg_ShowNews', 'flg_ShowTopTen', 'flg_ShowAdminArea', 'flg_ShowDashboard', 'flg_ShowStatisticBoard']
                },
                'langkeys': {
                    labelPrefix: '',
                    values: ['lang_de', 'lang_en']
                },
                'profiles': {
                    labelPrefix: '',
                    values: ['profile_dev', 'profile_import', 'profile_beta', 'profile_prod', 'profile_viewer', 'profile_handout']
                },
                'subSectionIds': {
                    labelPrefix: '',
                    values: []
                },
            },
            inputSuggestionValueConfig: {},
            optionsSelect: {
                'pageId': [],
                'subType': [],
                'flags': [],
                'langkeys': [],
                'profiles': [],
                'subSectionIds': [],
                'subTypePageType': []
            },
            modalEditOutletName: 'pdocmodaledit',
            modalShowOutletName: 'pdocmodalshow'
        };
        return defaultConfig;
    };
    PDocEditformComponent.prototype.configureComponent = function (config) {
        _super.prototype.configureComponent.call(this, config);
        var componentConfig = this.getComponentConfig(config);
        this.editorCommands = componentConfig.editorCommands;
    };
    PDocEditformComponent.prototype.prepareSubmitValues = function (values) {
        return _super.prototype.prepareSubmitValues.call(this, values);
    };
    PDocEditformComponent.prototype.createDefaultFormValueConfig = function (record) {
        var valueConfig = {
            descMdRecommended: []
        };
        return valueConfig;
    };
    PDocEditformComponent.prototype.postProcessFormValueConfig = function (record, formValueConfig) {
        if (formValueConfig['subtype'] && formValueConfig['subtype'].length > 0 && formValueConfig['subtype'][0]) {
            formValueConfig['subtype'][0] =
                (formValueConfig['subtype'][0] + '')
                    .replace(/p_/g, '');
        }
        if (record.flags) {
            formValueConfig['flags'] = [ObjectUtils.uniqueArray(record.flags.replace(/ /g, '').split(','))];
        }
        if (record.profiles) {
            formValueConfig['profiles'] = [ObjectUtils.uniqueArray(record.profiles.replace(/ /g, '').split(','))];
        }
        if (record.langkeys) {
            formValueConfig['langkeys'] = [ObjectUtils.uniqueArray(record.langkeys.replace(/ /g, '').split(','))];
        }
        if (record.subSectionIds) {
            formValueConfig['subSectionIds'] = [ObjectUtils.uniqueArray(record.subSectionIds.replace(/ /g, '').split(','))];
        }
    };
    PDocEditformComponent.prototype.updateFormComponents = function () {
        _super.prototype.updateFormComponents.call(this);
    };
    PDocEditformComponent.prototype.updateOptionValues = function (pdocSearchResult) {
        _super.prototype.updateOptionValues.call(this, pdocSearchResult);
        var me = this;
        if (pdocSearchResult !== undefined) {
            var rawValues = this.editFormGroup.getRawValue();
            me.optionsSelect['subSectionIds'] = me.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(me.pdocSearchFormUtils.getKeyValues(pdocSearchResult), true, [], false);
            // console.log('update searchResult', pdocSearchResult);
        }
        else {
            // console.log('empty searchResult', pdocSearchResult);
        }
        return true;
    };
    PDocEditformComponent.prototype.updateKeywordSuggestions = function () {
        _super.prototype.updateKeywordSuggestions.call(this);
        return true;
    };
    PDocEditformComponent = __decorate([
        Component({
            selector: 'app-pdoc-editform',
            templateUrl: './pdoc-editform.component.html',
            styleUrls: ['./pdoc-editform.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(8, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [FormBuilder, ToastrService, ChangeDetectorRef,
            GenericAppService, PDocSearchFormUtils,
            SearchFormUtils, PDocDataService,
            PDocContentUtils, Object, PDocNameSuggesterService,
            PDocDescSuggesterService,
            Router, PrintService, PdfPrintService])
    ], PDocEditformComponent);
    return PDocEditformComponent;
}(CommonDocEditformComponent));
export { PDocEditformComponent };
//# sourceMappingURL=pdoc-editform.component.js.map