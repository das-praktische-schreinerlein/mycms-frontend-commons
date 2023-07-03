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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { ToastrService } from 'ngx-toastr';
import { PDocAdapterResponseMapper } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-adapter-response.mapper';
import { CommonDocReplaceFormComponent } from '../../../../frontend-cdoc-commons/components/cdoc-replaceform/cdoc-replaceform.component';
var PDocReplaceFormComponent = /** @class */ (function (_super) {
    __extends(PDocReplaceFormComponent, _super);
    function PDocReplaceFormComponent(fb, activeModal, cd, searchFormUtils, pdocDataService, toastr) {
        var _this = _super.call(this, fb, activeModal, cd, searchFormUtils, pdocDataService, toastr) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        return _this;
    }
    PDocReplaceFormComponent.prototype.onCancel = function () {
        this.resultObservable.error('canceled');
        this.activeModal.close('Cancel click');
        return false;
    };
    PDocReplaceFormComponent.prototype.onSubmitAssignKey = function () {
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
    PDocReplaceFormComponent.prototype.getReferenceNameForRecordType = function (type) {
        switch (type) {
            case 'PAGE':
                return 'page_id_is';
            default:
                return undefined;
        }
    };
    PDocReplaceFormComponent.prototype.getSearchTypeForRecordType = function (type) {
        switch (type) {
            case 'PAGE':
                return 'PAGE';
            default:
                return undefined;
        }
    };
    PDocReplaceFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        return _super.prototype.generateSelectIdValues.call(this, facetName, keyValues);
    };
    PDocReplaceFormComponent.prototype.generateComparatorName = function (name) {
        return PDocAdapterResponseMapper.generateDoubletteValue(name);
    };
    PDocReplaceFormComponent = __decorate([
        Component({
            selector: 'app-pdoc-replaceform',
            templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-replaceform/cdoc-replaceform.component.html',
            styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-replaceform/cdoc-replaceform.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [FormBuilder, NgbActiveModal, ChangeDetectorRef,
            SearchFormUtils, PDocDataService, ToastrService])
    ], PDocReplaceFormComponent);
    return PDocReplaceFormComponent;
}(CommonDocReplaceFormComponent));
export { PDocReplaceFormComponent };
//# sourceMappingURL=pdoc-replaceform.component.js.map