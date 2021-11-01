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
import { Input } from '@angular/core';
import { GenericCommonDocAssignFormComponent } from '../cdoc-assignform/generic-cdoc-assignform.component';
var CommonDocAssignPlaylistFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocAssignPlaylistFormComponent, _super);
    function CommonDocAssignPlaylistFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facetNamePrefix = 'label.assignplaylist.reference.';
        _this.position = undefined;
        return _this;
    }
    CommonDocAssignPlaylistFormComponent.prototype.createResultObject = function () {
        return {
            action: 'assignplaylist',
            ids: this.records.map(function (value) { return value.id; }),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            playlistkey: this.newId,
            position: this.position
        };
    };
    CommonDocAssignPlaylistFormComponent.prototype.createFormGroup = function () {
        return this.fb.group({
            referenceField: this.getReferenceNameForRecordType(undefined),
            newIdOption: 'select',
            newIdInput: '',
            position: '',
            newIdSelect: ''
        });
    };
    CommonDocAssignPlaylistFormComponent.prototype.getReferenceNamesForRecordType = function (type) {
        var referenceName = this.getReferenceNameForRecordType(type);
        if (referenceName !== undefined) {
            return [referenceName];
        }
        return undefined;
    };
    CommonDocAssignPlaylistFormComponent.prototype.onUpdateReferenceField = function () {
        return false;
    };
    CommonDocAssignPlaylistFormComponent.prototype.onUpdateNewIdSelect = function () {
        this.checkFormAndSetValidFlag();
        return false;
    };
    CommonDocAssignPlaylistFormComponent.prototype.updateData = function () {
        this.position = undefined;
        _super.prototype.updateData.call(this);
    };
    CommonDocAssignPlaylistFormComponent.prototype.updateSelectFields = function () {
        this.assignFormGroup.patchValue({
            newIdOption: 'select',
            referenceField: this.getReferenceNameForRecordType(undefined)
        });
        _super.prototype.updateSelectFields.call(this);
    };
    CommonDocAssignPlaylistFormComponent.prototype.processFacetResults = function (searchForm, cdocSearchResult) {
        _super.prototype.processFacetResults.call(this, searchForm, cdocSearchResult);
        if (this.records !== undefined && this.records.length === 1) {
            this.assignFormGroup.patchValue({
                newIdOption: 'select',
                referenceField: this.getReferenceNameForRecordType(this.records[0].type),
                newIdSelect: this.actionTagEvent.config.payload['playlistkey'],
                position: this.actionTagEvent.config.payload['position']
            });
        }
    };
    CommonDocAssignPlaylistFormComponent.prototype.checkForm = function () {
        var values = this.assignFormGroup.getRawValue();
        this.newId = undefined;
        this.position = undefined;
        this.newId = Array.isArray(values['newIdSelect'])
            ? values['newIdSelect'][0]
            : values['newIdSelect'];
        this.position = Array.isArray(values['position'])
            ? values['position'][0]
            : values['position'];
        this.position = this.position === null || this.position <= 0
            ? undefined
            : this.position;
        if (this.newId === undefined || this.newId === null || this.newId === 'null' || this.newId === '') {
            return false;
        }
        return true;
    };
    CommonDocAssignPlaylistFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(keyValues, true, [], false);
        values.map(function (value) {
            value.name = value.name + ' - ID: ' + value.id;
        });
        return values;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocAssignPlaylistFormComponent.prototype, "actionTagEvent", void 0);
    return CommonDocAssignPlaylistFormComponent;
}(GenericCommonDocAssignFormComponent));
export { CommonDocAssignPlaylistFormComponent };
//# sourceMappingURL=cdoc-assignplaylistform.component.js.map