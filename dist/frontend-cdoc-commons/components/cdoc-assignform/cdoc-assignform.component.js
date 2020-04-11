"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var Subject_1 = require("rxjs/Subject");
var component_utils_1 = require("../../../angular-commons/services/component.utils");
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var CommonDocAssignFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocAssignFormComponent, _super);
    function CommonDocAssignFormComponent(fb, activeModal, cd, searchFormUtils, cdocDataService, toastr) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocDataService = cdocDataService;
        _this.toastr = toastr;
        _this.lastRecords = undefined;
        _this.facetValues = {};
        _this.newId = undefined;
        _this.newIdNullFlag = undefined;
        _this.validForSubmit = false;
        _this.recordType = undefined;
        _this.showLoadingSpinner = false;
        _this.assignFormGroup = _this.fb.group({
            referenceField: '',
            newIdOption: 'id',
            newIdInput: '',
            newIdSelect: ''
        });
        _this.optionsSelectNewId = [];
        _this.settingsSelectNewId = {
            dynamicTitleMaxItems: 1,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm multiselect-highlight-value',
            containerClasses: 'dropdown-inline fullwidth',
            enableSearch: true,
            showUncheckAll: false,
            autoUnselect: true,
            selectionLimit: 1
        };
        _this.textsSelectNewId = {
            checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Id ausgewählt',
            checkedPlural: 'Id ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'Alle'
        };
        _this.optionsSelectReferenceField = [];
        _this.settingsSelectReferenceField = {
            dynamicTitleMaxItems: 1,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm multiselect-highlight-value',
            containerClasses: 'dropdown-inline fullwidth',
            enableSearch: true,
            showUncheckAll: false,
            autoUnselect: true,
            selectionLimit: 1
        };
        _this.textsSelectReferenceField = {
            checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Feld ausgewählt',
            checkedPlural: 'Feld ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'Alle'
        };
        return _this;
    }
    CommonDocAssignFormComponent.prototype.ngOnInit = function () {
        this.updateData();
    };
    CommonDocAssignFormComponent.prototype.onCancel = function () {
        this.activeModal.close('Cancel click');
        this.resultObservable.error('canceled');
        return false;
    };
    CommonDocAssignFormComponent.prototype.onSubmitAssignKey = function () {
        if (!this.checkFormAndSetValidFlag()) {
            return false;
        }
        var me = this;
        this.resultObservable.next({
            action: 'assign',
            ids: me.records.map(function (value) { return value.id; }),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        });
        this.activeModal.close('Save click');
        return false;
    };
    CommonDocAssignFormComponent.prototype.updateData = function () {
        var changes = {};
        changes['records'] = new core_1.SimpleChange(this.records, this.lastRecords, false);
        if (this.records != null && !component_utils_1.ComponentUtils.hasNgChanged(changes)) {
            return;
        }
        this.lastRecords = this.records;
        this.newId = undefined;
        this.newIdNullFlag = false;
        this.validForSubmit = false;
        this.assignFormGroup.patchValue({ referenceField: '', newIdOption: 'input', newIdInput: '', newIdSelect: '' });
        this.optionsSelectReferenceField = [];
        this.optionsSelectNewId = [];
        this.updateSelectFields();
    };
    CommonDocAssignFormComponent.prototype.checkForm = function () {
        var values = this.assignFormGroup.getRawValue();
        var newIdOption = Array.isArray(values['newIdOption']) ? values['newIdOption'][0] : values['newIdOption'];
        this.newId = undefined;
        this.newIdNullFlag = false;
        switch (newIdOption) {
            case 'null':
                this.newId = null;
                this.newIdNullFlag = true;
                break;
            case 'input':
                this.newId = Array.isArray(values['newIdInput']) ? values['newIdInput'][0] : values['newIdInput'];
                break;
            case 'select':
                this.newId = Array.isArray(values['newIdSelect']) ? values['newIdSelect'][0] : values['newIdSelect'];
                break;
            default:
                return false;
        }
        if (this.newIdNullFlag === true) {
            if (this.newId !== null) {
                return false;
            }
        }
        else {
            if (this.newId === undefined || this.newId === null || this.newId === 'null' || this.newId === '') {
                return false;
            }
        }
        if (this.getCurrentReferenceField() === undefined || this.getCurrentReferenceField() === null
            || this.getCurrentReferenceField().length < 1) {
            return false;
        }
        return true;
    };
    CommonDocAssignFormComponent.prototype.onUpdateReferenceField = function () {
        this.optionsSelectNewId = this.facetValues[this.getCurrentReferenceField()] || [];
        this.assignFormGroup.patchValue({ newIdSelect: '' });
        this.checkFormAndSetValidFlag();
        return false;
    };
    CommonDocAssignFormComponent.prototype.onUpdateNewIdSelect = function () {
        this.assignFormGroup.patchValue({ newIdOption: 'select' });
        this.checkFormAndSetValidFlag();
        return false;
    };
    CommonDocAssignFormComponent.prototype.checkFormAndSetValidFlag = function (event) {
        if (this.checkForm()) {
            this.validForSubmit = true;
            this.cd.markForCheck();
            return true;
        }
        else {
            this.validForSubmit = false;
            this.cd.markForCheck();
            return false;
        }
    };
    CommonDocAssignFormComponent.prototype.getSearchTypeForRecordType = function (type) {
        return type;
    };
    CommonDocAssignFormComponent.prototype.updateSelectFields = function () {
        var me = this;
        var searchType = undefined;
        if (me.records === undefined) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            me.optionsSelectReferenceField = [];
            me.optionsSelectNewId = [];
            me.recordType = 'UNKNOWN';
            me.checkFormAndSetValidFlag();
            return;
        }
        for (var _i = 0, _a = me.records; _i < _a.length; _i++) {
            var record = _a[_i];
            if (me.recordType !== undefined && record.type !== me.recordType) {
                me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
                me.optionsSelectReferenceField = [];
                me.optionsSelectNewId = [];
                me.recordType = 'UNKNOWN';
                me.checkFormAndSetValidFlag();
                return;
            }
            me.recordType = record.type;
            searchType = me.getSearchTypeForRecordType(record.type);
        }
        var facetNames = me.getReferenceNamesForRecordType(me.recordType);
        if (facetNames === undefined || facetNames.length < 1) {
            me.optionsSelectReferenceField = [];
            me.optionsSelectNewId = [];
            me.checkFormAndSetValidFlag();
            return;
        }
        var facetValues = [];
        for (var _b = 0, facetNames_1 = facetNames; _b < facetNames_1.length; _b++) {
            var facetName = facetNames_1[_b];
            facetValues.push(['label.assign.reference.', facetName, '', facetName]);
        }
        me.optionsSelectReferenceField = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(facetValues, false, [], true);
        me.optionsSelectNewId = [];
        me.facetValues = {};
        me.assignFormGroup.patchValue({ newIdSelect: '' });
        if (searchType === undefined) {
            me.checkFormAndSetValidFlag();
            return;
        }
        me.showLoadingSpinner = true;
        me.checkFormAndSetValidFlag();
        var searchForm = me.cdocDataService.createDefaultSearchForm();
        searchForm.type = searchType;
        me.cdocDataService.search(searchForm, {
            showFacets: facetNames,
            loadTrack: false,
            showForm: false
        }).then(function doneSearch(cdocSearchResult) {
            me.showLoadingSpinner = false;
            if (cdocSearchResult === undefined) {
                console.log('empty searchResult', cdocSearchResult);
                cdocSearchResult = me.cdocDataService.newSearchResult(searchForm, 0, [], new facets_1.Facets());
            }
            else {
                console.log('update searchResult', cdocSearchResult);
            }
            me.facetValues = {};
            me.assignFormGroup.patchValue({ newIdSelect: '' });
            for (var _i = 0, facetNames_2 = facetNames; _i < facetNames_2.length; _i++) {
                var facetName = facetNames_2[_i];
                var keyValues = me.searchFormUtils.getFacetValues(cdocSearchResult, facetName, '', '');
                me.facetValues[facetName] = me.generateSelectIdValues(facetName, keyValues);
            }
            me.optionsSelectNewId = me.facetValues[me.getCurrentReferenceField()] || [];
            me.showLoadingSpinner = false;
            me.checkFormAndSetValidFlag();
        }).catch(function errorSearch(reason) {
            me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
            console.error('doSearch failed:', reason);
            me.showLoadingSpinner = false;
            me.optionsSelectNewId = [];
            me.facetValues = {};
            me.assignFormGroup.patchValue({ newIdSelect: '' });
            me.checkFormAndSetValidFlag();
        });
    };
    CommonDocAssignFormComponent.prototype.getCurrentReferenceField = function () {
        var rawValue = this.assignFormGroup.getRawValue();
        return Array.isArray(rawValue['referenceField']) ? rawValue['referenceField'][0] : rawValue['referenceField'];
    };
    CommonDocAssignFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(keyValues, false, [], false);
        values.map(function (value) {
            value.name = value.name + ' - ID: ' + value.id;
        });
        return values;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocAssignFormComponent.prototype, "records", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Subject_1.Subject)
    ], CommonDocAssignFormComponent.prototype, "resultObservable", void 0);
    return CommonDocAssignFormComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocAssignFormComponent = CommonDocAssignFormComponent;
//# sourceMappingURL=cdoc-assignform.component.js.map