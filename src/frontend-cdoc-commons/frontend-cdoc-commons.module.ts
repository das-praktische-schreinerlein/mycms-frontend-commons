import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonDocListHeaderComponent} from './components/cdoc-list-header/cdoc-list-header.component';
import {CommonDocListFooterComponent} from './components/cdoc-list-footer/cdoc-list-footer.component';
import {CommonDocKeywordsStateComponent} from './components/cdoc-keywordsstate/cdoc-keywordsstate.component';
import {CommonDocKeywordsComponent} from './components/cdoc-keywords/cdoc-keywords.component';
import {CommonDocTimetableComponent} from './components/cdoc-timetable/cdoc-timetable.component';
import {CommonDocTagcloudComponent} from './components/cdoc-tagcloud/cdoc-tagcloud.component';
import {CommonDocTypetableComponent} from './components/cdoc-typetable/cdoc-typetable.component';
import {CommonDocTagsStateComponent} from './components/cdoc-tagsstate/cdoc-tagsstate.component';
import {CommonDocTagsComponent} from './components/cdoc-tags/cdoc-tags.component';
import {CommonDocVideoplayerComponent} from './components/cdoc-videoplayer/cdoc-videoplayer.component';
import {CommonDocListItemComponent} from './components/cdoc-list-item/cdoc-list-item.component';
import {AngularCommonsModule} from '../angular-commons/angular-commons.module';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgbModalModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonDocListComponent} from './components/cdoc-list/cdoc-list.component';
import {CommonDocAudioplayerComponent} from './components/cdoc-audioplayer/cdoc-audioplayer.component';
import {CommonDocActionTagsComponent} from './components/cdoc-actiontags/cdoc-actiontags.component';
import {FileDropModule} from 'ngx-file-drop';
import {CommonDocInitialtableComponent} from './components/cdoc-initialtable/cdoc-initialtable.component';
import {
    CommonDocODObjectRectanglesComponent
} from './components/cdoc-odobjectrectangles/cdoc-odobjectrectangles.component';
import {CommonDocODObjectDetailsComponent} from './components/cdoc-odobjectdetails/cdoc-odobjectdetails.component';
import {CommonDocObjectNavigationComponent} from './components/cdoc-object-navigation/cdoc-object-navigation.component';
import {
    CommonDocExtendedObjectPropertiesComponent
} from './components/cdoc-extended-object-properties/cdoc-extended-object-properties.component';

@NgModule({
    declarations: [
        CommonDocListComponent,
        CommonDocListHeaderComponent,
        CommonDocListFooterComponent,
        CommonDocListItemComponent,
        CommonDocKeywordsComponent,
        CommonDocKeywordsStateComponent,
        CommonDocTimetableComponent,
        CommonDocTypetableComponent,
        CommonDocTagcloudComponent,
        CommonDocTagsComponent,
        CommonDocTagsStateComponent,
        CommonDocVideoplayerComponent,
        CommonDocAudioplayerComponent,
        CommonDocActionTagsComponent,
        CommonDocInitialtableComponent,
        CommonDocODObjectRectanglesComponent,
        CommonDocODObjectDetailsComponent,
        CommonDocObjectNavigationComponent,
        CommonDocExtendedObjectPropertiesComponent
    ],
    imports: [
        NgbPaginationModule,
        NgbModalModule,
        MultiselectDropdownModule,
        TranslateModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FileDropModule,
        AngularCommonsModule
    ],
    exports: [
        CommonDocListComponent,
        CommonDocListHeaderComponent,
        CommonDocListFooterComponent,
        CommonDocListItemComponent,
        CommonDocKeywordsComponent,
        CommonDocKeywordsStateComponent,
        CommonDocTimetableComponent,
        CommonDocTypetableComponent,
        CommonDocTagcloudComponent,
        CommonDocTagsComponent,
        CommonDocTagsStateComponent,
        CommonDocVideoplayerComponent,
        CommonDocAudioplayerComponent,
        CommonDocActionTagsComponent,
        CommonDocInitialtableComponent,
        CommonDocODObjectRectanglesComponent,
        CommonDocODObjectDetailsComponent,
        CommonDocObjectNavigationComponent,
        CommonDocExtendedObjectPropertiesComponent
    ]
})
export class FrontendCommonDocCommonsModule {
}
