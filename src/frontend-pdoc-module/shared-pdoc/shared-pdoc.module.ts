import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularCommonsModule} from '../../angular-commons/angular-commons.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgbAccordionModule, NgbRatingModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {LightboxModule} from 'ngx-lightbox';
import {DatePipe} from '@angular/common';
import {FrontendCommonDocCommonsModule} from '../../frontend-cdoc-commons/frontend-cdoc-commons.module';
import {RouterModule} from '@angular/router';
import {PDocSearchformComponent} from './components/pdoc-searchform/pdoc-searchform.component';
import {PDocListComponent} from './components/pdoc-list/pdoc-list.component';
import {PDocListItemComponent} from './components/pdoc-list-item/pdoc-list-item.component';
import {PDocListItemFlatComponent} from './components/pdoc-list-item-flat/pdoc-list-item-flat.component';
import {PDocActionsComponent} from './components/pdoc-actions/pdoc-actions.component';
import {PDocActionTagsComponent} from './components/pdoc-actiontags/pdoc-actiontags.component';
import {PdocInfoComponent} from './components/pdoc-info/pdoc-info.component';
import {PDocSimpleSearchNavigationComponent} from './components/pdoc-simple-search-navigation/pdoc-simple-search-navigation.component';

@NgModule({
    declarations: [
        PDocSearchformComponent,
        PdocInfoComponent,
        PDocListComponent,
        PDocListItemComponent,
        PDocListItemFlatComponent,
        PDocActionsComponent,
        PDocActionTagsComponent,
        PDocSimpleSearchNavigationComponent
    ],
    imports: [
        NgbAccordionModule, NgbRatingModule, NgbTabsetModule,
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
        LightboxModule,
        RouterModule
    ],
    providers: [
        DatePipe
    ],
    exports: [
        PDocSearchformComponent,
        PdocInfoComponent,
        PDocListComponent,
        PDocListItemComponent,
        PDocListItemFlatComponent,
        PDocActionsComponent,
        PDocActionTagsComponent,
        PDocSimpleSearchNavigationComponent
    ]
})
export class SharedPDocModule {}
