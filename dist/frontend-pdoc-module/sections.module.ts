import {NgModule} from '@angular/core';
import {SectionsRoutingModule} from './sections-routing.module';
import {SectionsBaseUrlResolver} from '../frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import {SectionsPDocRecordResolver} from '../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionsPDocsResolver} from '../frontend-cdoc-commons/resolver/sections-pdocs.resolver';
import {ErrorResolver} from '../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../angular-commons/services/page.utils';
import {NgxMdModule} from 'ngx-md';
import {AngularMarkdownService} from '../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../angular-commons/services/angular-html.service';
import {CommonRoutingService} from '../angular-commons/services/common-routing.service';
import {TranslateModule} from '@ngx-translate/core';
import {FrontendPDocCommonsModule} from '../frontend-pdoc-commons/frontend-pdoc-commons.module';
import {FrontendCommonDocCommonsModule} from '../frontend-cdoc-commons/frontend-cdoc-commons.module';

@NgModule({
    declarations: [
    ],
    imports: [
        TranslateModule,
        NgbModule.forRoot(),
        NgxMdModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FrontendPDocCommonsModule,
        SectionsRoutingModule,
        FrontendCommonDocCommonsModule
    ],
    providers: [
        CommonRoutingService,
        SectionsBaseUrlResolver,
        SectionsPDocRecordResolver,
        SectionsPDocsResolver,
        ErrorResolver,
        AngularHtmlService,
        AngularMarkdownService,
        PageUtils
    ]
})
export class SectionsModule {}
