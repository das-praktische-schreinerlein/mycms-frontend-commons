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
var Subject_1 = require("rxjs/Subject");
var cdoc_assignform_component_1 = require("../cdoc-assignform/cdoc-assignform.component");
var CommonDocReplaceFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocReplaceFormComponent, _super);
    function CommonDocReplaceFormComponent(fb, activeModal, cd, searchFormUtils, cdocDataService, toastr) {
        var _this = _super.call(this, fb, activeModal, cd, searchFormUtils, cdocDataService, toastr) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        return _this;
    }
    CommonDocReplaceFormComponent.prototype.onSubmitAssignKey = function () {
        if (!this.checkFormAndSetValidFlag()) {
            return false;
        }
        var me = this;
        this.resultObservable.next({
            action: 'replace',
            ids: me.records.map(function (value) { return value.id; }),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        });
        this.activeModal.close('Save click');
        return false;
    };
    CommonDocReplaceFormComponent.prototype.getReferenceNamesForRecordType = function (type) {
        var facetName = this.getReferenceNameForRecordType(type);
        return facetName !== undefined ? [facetName] : undefined;
    };
    CommonDocReplaceFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        var me = this;
        var recordTechNames = me.records.map(function (record) {
            return me.generateComparatorName(record.name);
        });
        var values = me.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(keyValues, false, [], false);
        values.sort(function (a, b) {
            var res = a.name.localeCompare(b.name);
            if (res === 0) {
                return a.id.toString().localeCompare(b.id.toString());
            }
            for (var _i = 0, recordTechNames_1 = recordTechNames; _i < recordTechNames_1.length; _i++) {
                var recordTechName = recordTechNames_1[_i];
                if (me.generateComparatorName(a.name).localeCompare(recordTechName) === 0) {
                    return -1;
                }
            }
            for (var _a = 0, recordTechNames_2 = recordTechNames; _a < recordTechNames_2.length; _a++) {
                var recordTechName = recordTechNames_2[_a];
                if (me.generateComparatorName(b.name).localeCompare(recordTechName) === 0) {
                    return 1;
                }
            }
            return res;
        });
        values.map(function (value) {
            value.name = value.name + ' - ID: ' + value.id;
        });
        return values;
    };
    CommonDocReplaceFormComponent.prototype.generateComparatorName = function (name) {
        return name;
    };
    CommonDocReplaceFormComponent.prototype.getCurrentReferenceField = function () {
        var rawValue = this.getReferenceNamesForRecordType(this.recordType);
        return Array.isArray(rawValue) ? rawValue[0] : undefined;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocReplaceFormComponent.prototype, "records", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Subject_1.Subject)
    ], CommonDocReplaceFormComponent.prototype, "resultObservable", void 0);
    return CommonDocReplaceFormComponent;
}(cdoc_assignform_component_1.CommonDocAssignFormComponent));
exports.CommonDocReplaceFormComponent = CommonDocReplaceFormComponent;
//# sourceMappingURL=cdoc-replaceform.component.js.map