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
import { Input, SimpleChange } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { Subject } from 'rxjs';
import { ComponentUtils } from '../../../angular-commons/services/component.utils';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
var GenericCommonDocAssignFormComponent = /** @class */ (function (_super) {
    __extends(GenericCommonDocAssignFormComponent, _super);
    function GenericCommonDocAssignFormComponent(fb, activeModal, cd, searchFormUtils, cdocDataService, toastr) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        _this.searchFormUtils = searchFormUtils;
        _this.cdocDataService = cdocDataService;
        _this.toastr = toastr;
        _this.validForSubmit = false;
        _this.recordType = undefined;
        _this.showLoadingSpinner = false;
        _this.assignFormGroup = _this.createFormGroup();
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
        _this.facetNamePrefix = 'label.assign.reference.';
        _this.lastRecords = undefined;
        _this.facetValues = {};
        _this.newId = undefined;
        _this.newIdNullFlag = undefined;
        return _this;
    }
    GenericCommonDocAssignFormComponent.prototype.ngOnInit = function () {
        this.updateData();
    };
    GenericCommonDocAssignFormComponent.prototype.onCancel = function () {
        this.activeModal.close('Cancel click');
        this.resultObservable.error('canceled');
        return false;
    };
    GenericCommonDocAssignFormComponent.prototype.onSubmitAssignKey = function () {
        if (!this.checkFormAndSetValidFlag()) {
            return false;
        }
        var me = this;
        this.resultObservable.next(me.createResultObject());
        this.activeModal.close('Save click');
        return false;
    };
    GenericCommonDocAssignFormComponent.prototype.updateData = function () {
        var changes = {};
        changes['records'] = new SimpleChange(this.records, this.lastRecords, false);
        if (this.records != null && !ComponentUtils.hasNgChanged(changes)) {
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
    GenericCommonDocAssignFormComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            referenceField: '',
            newIdOption: 'id',
            newIdInput: '',
            newIdSelect: ''
        });
    };
    GenericCommonDocAssignFormComponent.prototype.checkForm = function () {
        var values = this.assignFormGroup.getRawValue();
        var newIdOption = Array.isArray(values['newIdOption'])
            ? values['newIdOption'][0]
            : values['newIdOption'];
        this.newId = undefined;
        this.newIdNullFlag = false;
        switch (newIdOption) {
            case 'null':
                this.newId = null;
                this.newIdNullFlag = true;
                break;
            case 'input':
                this.newId = Array.isArray(values['newIdInput'])
                    ? values['newIdInput'][0]
                    : values['newIdInput'];
                break;
            case 'select':
                this.newId = Array.isArray(values['newIdSelect'])
                    ? values['newIdSelect'][0]
                    : values['newIdSelect'];
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
    GenericCommonDocAssignFormComponent.prototype.onUpdateReferenceField = function () {
        this.optionsSelectNewId = this.facetValues[this.getCurrentReferenceField()] || [];
        this.assignFormGroup.patchValue({ newIdSelect: '' });
        this.checkFormAndSetValidFlag();
        return false;
    };
    GenericCommonDocAssignFormComponent.prototype.onUpdateNewIdSelect = function () {
        this.assignFormGroup.patchValue({ newIdOption: 'select' });
        this.checkFormAndSetValidFlag();
        return false;
    };
    GenericCommonDocAssignFormComponent.prototype.checkFormAndSetValidFlag = function (event) {
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
    GenericCommonDocAssignFormComponent.prototype.getSearchTypeForRecordType = function (type) {
        return type;
    };
    GenericCommonDocAssignFormComponent.prototype.updateSelectFields = function () {
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
            facetValues.push([me.facetNamePrefix, facetName, '', facetName]);
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
            me.processFacetResults(searchForm, cdocSearchResult);
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
    GenericCommonDocAssignFormComponent.prototype.processFacetResults = function (searchForm, cdocSearchResult) {
        this.showLoadingSpinner = false;
        if (cdocSearchResult === undefined) {
            console.log('empty searchResult', cdocSearchResult);
            cdocSearchResult = this.cdocDataService.newSearchResult(searchForm, 0, [], new Facets());
        }
        else {
            console.log('update searchResult', cdocSearchResult);
        }
        this.facetValues = {};
        this.assignFormGroup.patchValue({ newIdSelect: '' });
        for (var _i = 0, _a = this.getReferenceNamesForRecordType(this.recordType); _i < _a.length; _i++) {
            var facetName = _a[_i];
            var keyValues = this.searchFormUtils.getFacetValues(cdocSearchResult, facetName, '', '');
            this.facetValues[facetName] = this.generateSelectIdValues(facetName, keyValues);
        }
        this.optionsSelectNewId = this.facetValues[this.getCurrentReferenceField()] || [];
        this.showLoadingSpinner = false;
    };
    GenericCommonDocAssignFormComponent.prototype.getCurrentReferenceField = function () {
        var rawValue = this.assignFormGroup.getRawValue();
        return Array.isArray(rawValue['referenceField']) ? rawValue['referenceField'][0] : rawValue['referenceField'];
    };
    GenericCommonDocAssignFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(keyValues, false, [], false);
        values.map(function (value) {
            value.name = value.name + ' - ID: ' + value.id;
        });
        return values;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GenericCommonDocAssignFormComponent.prototype, "records", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], GenericCommonDocAssignFormComponent.prototype, "resultObservable", void 0);
    return GenericCommonDocAssignFormComponent;
}(AbstractInlineComponent));
export { GenericCommonDocAssignFormComponent };
//# sourceMappingURL=generic-cdoc-assignform.component.js.map