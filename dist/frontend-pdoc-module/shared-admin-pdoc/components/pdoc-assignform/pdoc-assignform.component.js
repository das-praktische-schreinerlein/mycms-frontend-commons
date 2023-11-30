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
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocAssignFormComponent } from '../../../../frontend-cdoc-commons/components/cdoc-assignform/cdoc-assignform.component';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { ToastrService } from 'ngx-toastr';
var PDocAssignFormComponent = /** @class */ (function (_super) {
    __extends(PDocAssignFormComponent, _super);
    function PDocAssignFormComponent(fb, activeModal, cd, searchFormUtils, pdocDataService, toastr) {
        var _this = _super.call(this, fb, activeModal, cd, searchFormUtils, pdocDataService, toastr) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        return _this;
    }
    PDocAssignFormComponent.prototype.getReferenceNamesForRecordType = function (type) {
        switch (type) {
            case 'PAGE':
                return ['page_id_is'];
            default:
                return undefined;
        }
    };
    PDocAssignFormComponent.prototype.generateSelectIdValues = function (facetName, keyValues) {
        if (facetName === 'loc_lochirarchie_txt') {
            keyValues.map(function (value) {
                value[1] = value[5];
            });
        }
        return _super.prototype.generateSelectIdValues.call(this, facetName, keyValues);
    };
    PDocAssignFormComponent = __decorate([
        Component({
            selector: 'app-pdoc-assignform',
            templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-assignform/cdoc-assignform.component.html',
            styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-assignform/cdoc-assignform.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [FormBuilder, NgbActiveModal, ChangeDetectorRef,
            SearchFormUtils, PDocDataService, ToastrService])
    ], PDocAssignFormComponent);
    return PDocAssignFormComponent;
}(CommonDocAssignFormComponent));
export { PDocAssignFormComponent };
//# sourceMappingURL=pdoc-assignform.component.js.map