var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PDocEditformComponent } from './components/pdoc-editform/pdoc-editform.component';
import { AngularCommonsModule } from '../../angular-commons/angular-commons.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ToastrModule } from 'ngx-toastr';
import { FrontendCommonDocCommonsModule } from '../../frontend-cdoc-commons/frontend-cdoc-commons.module';
import { PDocReplaceFormComponent } from './components/pdoc-replaceform/pdoc-replaceform.component';
import { PDocAssignFormComponent } from './components/pdoc-assignform/pdoc-assignform.component';
import { RouterModule } from '@angular/router';
import { PDocSelectSearchComponent } from './components/pdoc-selectsearch/pdoc-selectsearch.component';
import { PDocAssignJoinFormComponent } from './components/pdoc-assignjoinform/pdoc-assignjoinform.component';
import { SharedPDocModule } from '../shared-pdoc/shared-pdoc.module';
var SharedAdminPDocModule = /** @class */ (function () {
    function SharedAdminPDocModule() {
    }
    SharedAdminPDocModule = __decorate([
        NgModule({
            declarations: [
                PDocEditformComponent,
                PDocReplaceFormComponent,
                PDocAssignFormComponent,
                PDocAssignJoinFormComponent,
                PDocSelectSearchComponent
            ],
            imports: [
                SharedPDocModule,
                ToastrModule,
                MultiselectDropdownModule,
                TranslateModule,
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                AngularCommonsModule,
                FrontendCommonDocCommonsModule,
                RouterModule
            ],
            exports: [
                PDocEditformComponent,
                PDocReplaceFormComponent,
                PDocAssignFormComponent,
                PDocAssignJoinFormComponent,
                PDocSelectSearchComponent
            ]
        })
    ], SharedAdminPDocModule);
    return SharedAdminPDocModule;
}());
export { SharedAdminPDocModule };
//# sourceMappingURL=shared-admin-pdoc.module.js.map