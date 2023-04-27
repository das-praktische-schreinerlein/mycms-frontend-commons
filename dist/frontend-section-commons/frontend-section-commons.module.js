var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularCommonsModule } from '../angular-commons/angular-commons.module';
import { TranslateModule } from '@ngx-translate/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionListItemFlatComponent } from './components/section-list-item-flat/section-list-item-flat.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { SectionListItemComponent } from './components/section-list-item/section-list-item.component';
import { SectionBarComponent } from './components/sectionbar/sectionbar.component';
import { SectionComponent } from './components/section/section.component';
import { RouterModule } from '@angular/router';
import { SectionPageComponent } from './components/sectionpage/section-page.component';
import { AdminJobAreaComponent } from './components/admin-jobarea/admin-jobarea.component';
var FrontendSectionCommonsModule = /** @class */ (function () {
    function FrontendSectionCommonsModule() {
    }
    FrontendSectionCommonsModule = __decorate([
        NgModule({
            declarations: [
                AdminJobAreaComponent,
                SectionListComponent,
                SectionListItemComponent,
                SectionListItemFlatComponent,
                SectionComponent,
                SectionBarComponent,
                SectionPageComponent
            ],
            imports: [
                MultiselectDropdownModule,
                TranslateModule,
                RouterModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                AngularCommonsModule
            ],
            exports: [
                AdminJobAreaComponent,
                SectionListComponent,
                SectionListItemComponent,
                SectionListItemFlatComponent,
                SectionComponent,
                SectionBarComponent,
                SectionPageComponent
            ]
        })
    ], FrontendSectionCommonsModule);
    return FrontendSectionCommonsModule;
}());
export { FrontendSectionCommonsModule };
//# sourceMappingURL=frontend-section-commons.module.js.map