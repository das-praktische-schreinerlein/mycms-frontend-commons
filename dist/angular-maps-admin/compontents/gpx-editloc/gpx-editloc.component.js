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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AbstractGpxEditLocComponent } from './abstract-gpx-editloc.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { DOCUMENT } from '@angular/common';
var GpxEditLocComponent = /** @class */ (function (_super) {
    __extends(GpxEditLocComponent, _super);
    function GpxEditLocComponent(fb, toastr, cd, appService, document) {
        return _super.call(this, fb, toastr, cd, appService, document) || this;
    }
    GpxEditLocComponent.prototype.createSanitized = function (values) {
        return values;
    };
    GpxEditLocComponent = __decorate([
        Component({
            selector: 'app-gpx-editloc',
            templateUrl: './gpx-editloc.component.html',
            styleUrls: ['./gpx-editloc.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(4, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [FormBuilder, ToastrService, ChangeDetectorRef,
            GenericAppService, Object])
    ], GpxEditLocComponent);
    return GpxEditLocComponent;
}(AbstractGpxEditLocComponent));
export { GpxEditLocComponent };
//# sourceMappingURL=gpx-editloc.component.js.map