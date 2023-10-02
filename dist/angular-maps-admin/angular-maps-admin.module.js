var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { GpxEditAreaComponent } from './compontents/gpx-editarea/gpx-editarea.component';
import { GpxEditLocComponent } from './compontents/gpx-editloc/gpx-editloc.component';
import { AngularMapsModule } from '../angular-maps/angular-maps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularCommonsModule } from '../angular-commons/angular-commons.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileDropModule } from 'ngx-file-drop';
var AngularMapsAdminModule = /** @class */ (function () {
    function AngularMapsAdminModule() {
    }
    AngularMapsAdminModule = __decorate([
        NgModule({
            declarations: [
                GpxEditAreaComponent,
                GpxEditLocComponent
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                FormsModule,
                MultiselectDropdownModule,
                TranslateModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                FileDropModule,
                AngularCommonsModule,
                AngularMapsModule
            ],
            providers: [],
            exports: [
                GpxEditAreaComponent,
                GpxEditLocComponent
            ]
        })
    ], AngularMapsAdminModule);
    return AngularMapsAdminModule;
}());
export { AngularMapsAdminModule };
//# sourceMappingURL=angular-maps-admin.module.js.map