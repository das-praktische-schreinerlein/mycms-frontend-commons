import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularCommonsModule} from '../angular-commons/angular-commons.module';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SectionListItemFlatComponent} from './components/section-list-item-flat/section-list-item-flat.component';
import {SectionListComponent} from './components/section-list/section-list.component';
import {SectionListItemComponent} from './components/section-list-item/section-list-item.component';
import {SectionBarComponent} from './components/sectionbar/sectionbar.component';
import {SectionComponent} from './components/section/section.component';
import {RouterModule} from '@angular/router';
import {SectionPageComponent} from './components/sectionpage/section-page.component';
import {AdminJobAreaComponent} from './components/admin-jobarea/admin-jobarea.component';

@NgModule({
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
export class FrontendSectionCommonsModule {
}
