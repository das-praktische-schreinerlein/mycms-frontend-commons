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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Input, Output } from '@angular/core';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { DateUtils } from '@dps/mycms-commons/dist/commons/utils/date.utils';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export var CommonDocEditformComponentForwardMode;
(function (CommonDocEditformComponentForwardMode) {
    CommonDocEditformComponentForwardMode[CommonDocEditformComponentForwardMode["SHOW"] = 0] = "SHOW";
    CommonDocEditformComponentForwardMode[CommonDocEditformComponentForwardMode["BACK_TO_SEARCH"] = 1] = "BACK_TO_SEARCH";
    CommonDocEditformComponentForwardMode[CommonDocEditformComponentForwardMode["BACK_TO_SOURCE_SHOW"] = 2] = "BACK_TO_SOURCE_SHOW";
    CommonDocEditformComponentForwardMode[CommonDocEditformComponentForwardMode["BACK_TO_SOURCE_EDIT"] = 3] = "BACK_TO_SOURCE_EDIT";
})(CommonDocEditformComponentForwardMode || (CommonDocEditformComponentForwardMode = {}));
var CommonDocEditformComponent = /** @class */ (function (_super) {
    __extends(CommonDocEditformComponent, _super);
    function CommonDocEditformComponent(fb, toastr, cd, appService, cdocSearchFormUtils, searchFormUtils, cdocDataService, contentUtils, router) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.cdocSearchFormUtils = cdocSearchFormUtils;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocDataService = cdocDataService;
        _this.contentUtils = contentUtils;
        _this.router = router;
        _this.suggestionConfigs = [];
        _this.editPrefix = '';
        _this.defaultSelectSetting = { dynamicTitleMaxItems: 5,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm',
            containerClasses: 'dropdown-inline fullwidth',
            enableSearch: true,
            showUncheckAll: false,
            autoUnselect: true,
            selectionLimit: 1 };
        _this.numBeanFieldConfig = {};
        _this.stringBeanFieldConfig = {};
        _this.stringArrayBeanFieldConfig = {};
        _this.inputSuggestionValueConfig = {};
        _this.searchOptions = {
            loadDetailsMode: 'none',
            showFacets: true,
            loadTrack: false,
            showForm: false
        };
        _this.optionsSelect = {};
        _this.inputSuggestionValues = {};
        _this.CommonDocEditformComponentForwardMode = CommonDocEditformComponentForwardMode;
        _this.textsSelectPlaylists = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Typ ausgewählt',
            checkedPlural: 'Typen ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'Alle' };
        // empty default
        _this.editFormGroup = _this.fb.group({
            id: '',
            name: '',
            desc: '',
            keywords: ''
        });
        _this.keywordSuggestions = [];
        _this.backToSearch = false;
        _this.save = new EventEmitter();
        _this.saveAndSearch = new EventEmitter();
        _this.saveAndForward = new EventEmitter();
        _this.modal = false;
        _this.cancelModal = new EventEmitter();
        return _this;
    }
    CommonDocEditformComponent.prototype.setKeyword = function (keyword) {
        var keywords = this.editFormGroup.getRawValue()['keywords'];
        if (keywords && keywords.length > 0) {
            keywords = keywords + ', ' + keyword;
        }
        else {
            keywords = keyword;
        }
        this.editFormGroup.patchValue({ keywords: keywords });
    };
    CommonDocEditformComponent.prototype.unsetKeyword = function (keyword) {
        var keywords = this.editFormGroup.getRawValue()['keywords'];
        if (keywords.length > 0) {
            keywords = keywords.replace(new RegExp(' ' + keyword + ','), '')
                .replace(new RegExp('^' + keyword + ', '), '')
                .replace(new RegExp(', ' + keyword + '$'), '')
                .replace(new RegExp('^' + keyword + '$'), '');
        }
        this.editFormGroup.patchValue({ keywords: keywords });
    };
    CommonDocEditformComponent.prototype.setValue = function (field, value) {
        var config = {};
        config[field] = value;
        this.editFormGroup.patchValue(config);
    };
    CommonDocEditformComponent.prototype.formatInputDate = function (value) {
        return DateUtils.dateToLocalISOString(value);
    };
    CommonDocEditformComponent.prototype.recommendName = function () {
        var name = '';
        this.setValue('name', name);
    };
    CommonDocEditformComponent.prototype.submitSave = function (event, backToSearch) {
        var values = this.editFormGroup.getRawValue();
        this.prepareSubmitValues(values);
        if (!this.validateSubmitValues(values)) {
            return false;
        }
        if (backToSearch) {
            this.saveAndSearch.emit(values);
        }
        else {
            this.save.emit(values);
        }
        return false;
    };
    CommonDocEditformComponent.prototype.submitSaveAndForward = function (event, returnMode) {
        var values = this.editFormGroup.getRawValue();
        this.prepareSubmitValues(values);
        if (!this.validateSubmitValues(values)) {
            return false;
        }
        this.saveAndForward.emit({ returnMode: returnMode, result: values });
        return false;
    };
    CommonDocEditformComponent.prototype.submitCancelModal = function (event) {
        this.cancelModal.emit(false);
        return false;
    };
    CommonDocEditformComponent.prototype.onCreateNewLink = function (key, id) {
        var me = this;
        // open modal dialog
        var outlets = {};
        outlets[me.modalEditOutletName] = [me.modalEditOutletName, 'create', key, id];
        me.router.navigate([{ outlets: outlets }]).then(function (value) {
            // check for closing modal dialog and routechange -> update facets
            var subscription = me.router.events.subscribe(function (val) {
                subscription.unsubscribe();
                me.fillFacets(me.record);
            });
        });
        return false;
    };
    CommonDocEditformComponent.prototype.onShowEntityLink = function (key, id) {
        var me = this;
        // open modal dialog
        var outlets = {};
        outlets[me.modalShowOutletName] = [me.modalShowOutletName, 'show', key, key + '_' + id];
        me.router.navigate([{ outlets: outlets }]).then(function (value) {
            // check for closing modal dialog and routechange -> update facets
            var subscription = me.router.events.subscribe(function (val) {
                subscription.unsubscribe();
                me.fillFacets(me.record);
            });
        });
        return false;
    };
    CommonDocEditformComponent.prototype.getComponentConfig = function (config) {
        var prefix = '';
        var suggestionConfig = [];
        if (BeanUtils.getValue(config, 'components.cdoc-keywords.keywordSuggestions')) {
            suggestionConfig = BeanUtils.getValue(config, 'components.cdoc-keywords.keywordSuggestions');
            prefix = BeanUtils.getValue(config, 'components.cdoc-keywords.editPrefix');
        }
        return {
            suggestionConfigs: suggestionConfig,
            editPrefix: prefix,
            numBeanFieldConfig: {},
            stringBeanFieldConfig: {
                'subtype': {},
            },
            stringArrayBeanFieldConfig: {
                'playlists': {},
            },
            inputSuggestionValueConfig: {},
            optionsSelect: { 'playlists': [],
                'subType': []
            },
            modalEditOutletName: undefined,
            modalShowOutletName: undefined
        };
    };
    CommonDocEditformComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.suggestionConfigs = componentConfig.suggestionConfigs;
        this.editPrefix = componentConfig.editPrefix;
        this.numBeanFieldConfig = componentConfig.numBeanFieldConfig;
        this.stringBeanFieldConfig = componentConfig.stringBeanFieldConfig;
        this.stringArrayBeanFieldConfig = componentConfig.stringArrayBeanFieldConfig;
        this.inputSuggestionValueConfig = componentConfig.inputSuggestionValueConfig;
        this.optionsSelect = componentConfig.optionsSelect;
        this.modalEditOutletName = componentConfig.modalEditOutletName;
        this.modalShowOutletName = componentConfig.modalShowOutletName;
    };
    CommonDocEditformComponent.prototype.prepareSubmitValues = function (values) {
        // delete empty key
        for (var key in values) {
            if (values.hasOwnProperty(key) && values[key] === undefined || values[key] === null) {
                delete values[key];
            }
        }
        for (var key in this.numBeanFieldConfig) {
            var formKey = key.replace(/\./g, '_');
            if (!values[formKey]) {
                continue;
            }
            if (Array.isArray(values[formKey])) {
                values[key] = Number(values[formKey][0]);
            }
            else {
                values[key] = Number(values[formKey]);
            }
        }
        for (var key in this.stringBeanFieldConfig) {
            var formKey = key.replace(/\./g, '_');
            if (!values[formKey]) {
                continue;
            }
            if (Array.isArray(values[formKey])) {
                values[key] = values[formKey][0] + '';
            }
            else {
                values[key] = values[formKey] + '';
            }
        }
        for (var key in this.stringArrayBeanFieldConfig) {
            var formKey = key.replace(/\./g, '_');
            if (!values[formKey]) {
                continue;
            }
            if (Array.isArray(values[formKey])) {
                values[key] = values[formKey].join(',');
            }
            else {
                values[key] = values[formKey] + '';
            }
        }
    };
    CommonDocEditformComponent.prototype.validateSubmitValues = function (values) {
        var schemaErrors = this.validateSchema(values);
        if (schemaErrors !== undefined && schemaErrors.length > 0) {
            var msg_1 = '';
            schemaErrors.map(function (value, index, array) {
                msg_1 += '- ' + value.path + ':' + value.expected + '<br>';
            });
            console.warn('warning while schema-validating values' + msg_1, values);
            this.toastr.warning('Leider passen nicht alle Eingaben - Fehler:' + msg_1, 'Oje!');
            return false;
        }
        var errors = this.validateValues(values);
        if (errors !== undefined && errors.length > 0) {
            var msg_2 = '';
            errors.map(function (value, index, array) {
                msg_2 += '- ' + value + '<br>';
            });
            console.warn('warning while validation values' + msg_2, values);
            this.toastr.warning('Leider passen nicht alle Eingaben - Fehler:' + msg_2, 'Oje!');
            return false;
        }
        return true;
    };
    CommonDocEditformComponent.prototype.updateData = function () {
        if (this.record === undefined) {
            return;
        }
        this.config = this.appService.getAppConfig();
        this.configureComponent(this.config);
        var formValueConfig = this.createDefaultFormValueConfig(this.record);
        var fields = this.record.toJSON();
        for (var key in fields) {
            if (fields.hasOwnProperty(key) && !formValueConfig.hasOwnProperty(key)) {
                formValueConfig[key] = [fields[key]];
            }
        }
        this.createSelectOptions(this.stringBeanFieldConfig, formValueConfig, this.optionsSelect);
        this.createSelectOptions(this.numBeanFieldConfig, formValueConfig, this.optionsSelect);
        this.createSelectOptions(this.stringArrayBeanFieldConfig, formValueConfig, this.optionsSelect);
        this.postProcessFormValueConfig(this.record, formValueConfig);
        this.editFormGroup = this.fb.group(formValueConfig);
        this.updateFormComponents();
        this.fillFacets(this.record);
    };
    CommonDocEditformComponent.prototype.createDefaultFormValueConfig = function (record) {
        return {
            dateshow: [DateUtils.dateToLocalISOString(record.dateshow)],
        };
    };
    CommonDocEditformComponent.prototype.postProcessFormValueConfig = function (record, formValueConfig) {
    };
    CommonDocEditformComponent.prototype.updateFormComponents = function () {
        this.updateKeywordSuggestions();
    };
    CommonDocEditformComponent.prototype.fillFacets = function (record) {
        var me = this;
        var searchForm = this.cdocDataService.newSearchForm({ type: record.type });
        this.cdocDataService.search(searchForm, this.searchOptions).then(function doneSearch(cdocSearchResult) {
            me.updateOptionValues(cdocSearchResult);
            me.updateSuggestionValues(cdocSearchResult);
            me.cd.markForCheck();
            me.editFormGroup.valueChanges.subscribe(function (data) {
                me.updateKeywordSuggestions();
            });
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.cd.markForCheck();
        });
    };
    CommonDocEditformComponent.prototype.updateOptionValues = function (cdocSearchResult) {
        var me = this;
        if (cdocSearchResult !== undefined) {
            // for debug only: const rawValues = this.editFormGroup.getRawValue();
            // for debug only: console.log('update searchResult', cdocSearchResult);
            me.optionsSelect['playlists'] = me.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(me.cdocSearchFormUtils.getPlaylistValues(cdocSearchResult), true, [], true);
        }
        else {
            // console.log('empty searchResult', cdocSearchResult);
            me.optionsSelect['playlists'] = me.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList([], true, [], true);
        }
        return true;
    };
    CommonDocEditformComponent.prototype.updateSuggestionValues = function (cdocSearchResult) {
        for (var suggestionName in this.inputSuggestionValueConfig) {
            var suggestionConfig = this.inputSuggestionValueConfig[suggestionName];
            var values = [];
            if (suggestionConfig.facetName) {
                if (cdocSearchResult !== undefined && cdocSearchResult.facets !== undefined && cdocSearchResult.facets.facets.size > 0) {
                    var facets = this.searchFormUtils.getFacetValues(cdocSearchResult, suggestionConfig.facetName, '', '');
                    for (var _i = 0, facets_1 = facets; _i < facets_1.length; _i++) {
                        var value = facets_1[_i];
                        values.push(value[1]);
                    }
                }
            }
            this.inputSuggestionValues[suggestionName.replace(/\./g, '_')] = values;
        }
        return true;
    };
    CommonDocEditformComponent.prototype.updateKeywordSuggestions = function () {
        if (this.suggestionConfigs.length > 0) {
            this.keywordSuggestions = this.contentUtils.getSuggestedKeywords(this.suggestionConfigs, this.editPrefix, this.editFormGroup.getRawValue());
            this.cd.markForCheck();
        }
        else {
            console.warn('no valid keywordSuggestions found');
            this.keywordSuggestions = [];
        }
        return true;
    };
    CommonDocEditformComponent.prototype.createSelectOptions = function (definitions, values, optionsSelect) {
        for (var key in definitions) {
            var definition = definitions[key];
            var value = BeanUtils.getValue(this.record, key);
            if (value === null || value === 'null' || value === undefined || value === 'undefined') {
                value = undefined;
            }
            else {
                value = value + '';
            }
            values[key.replace(/\./g, '_')] = [[value]];
            var options = [];
            if (definition['values']) {
                for (var _i = 0, _a = definition['values']; _i < _a.length; _i++) {
                    var optionValue = _a[_i];
                    options.push([definition['labelPrefix'], '' + optionValue, '', 0]);
                }
            }
            optionsSelect[key] =
                this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(options, false, [], true);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocEditformComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocEditformComponent.prototype, "backToSearch", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CommonDocEditformComponent.prototype, "availableForwardModes", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocEditformComponent.prototype, "save", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocEditformComponent.prototype, "saveAndSearch", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocEditformComponent.prototype, "saveAndForward", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocEditformComponent.prototype, "modal", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocEditformComponent.prototype, "cancelModal", void 0);
    return CommonDocEditformComponent;
}(AbstractInlineComponent));
export { CommonDocEditformComponent };
//# sourceMappingURL=cdoc-editform.component.js.map