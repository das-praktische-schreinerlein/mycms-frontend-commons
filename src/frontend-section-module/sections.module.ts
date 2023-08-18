import {NgModule} from '@angular/core';
import {SectionsRoutingModule} from './sections-routing.module';
import {SectionsBaseUrlResolver} from '../frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import {SectionsPDocRecordResolver} from '../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionsPDocsResolver} from '../frontend-cdoc-commons/resolver/sections-pdocs.resolver';
import {ErrorResolver} from '../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../angular-commons/services/page.utils';
import {CommonRoutingService} from '../angular-commons/services/common-routing.service';
import {TranslateModule} from '@ngx-translate/core';
import {FrontendSectionCommonsModule} from '../frontend-section-commons/frontend-section-commons.module';
import {FrontendCommonDocCommonsModule} from '../frontend-cdoc-commons/frontend-cdoc-commons.module';

@NgModule({
    declarations: [
    ],
    imports: [
        TranslateModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FrontendSectionCommonsModule,
        SectionsRoutingModule,
        FrontendCommonDocCommonsModule
    ],
    providers: [
        CommonRoutingService,
        SectionsBaseUrlResolver,
        SectionsPDocRecordResolver,
        SectionsPDocsResolver,
        ErrorResolver,
        PageUtils
    ]
})
export class SectionsModule {
}
