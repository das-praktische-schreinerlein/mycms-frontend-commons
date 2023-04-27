var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsBaseUrlResolver } from '../frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import { SectionsPDocRecordResolver } from '../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionsPDocsResolver } from '../frontend-cdoc-commons/resolver/sections-pdocs.resolver';
import { ErrorResolver } from '../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../angular-commons/services/page.utils';
import { NgxMdModule } from 'ngx-md';
import { AngularMarkdownService } from '../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../angular-commons/services/angular-html.service';
import { CommonRoutingService } from '../angular-commons/services/common-routing.service';
import { TranslateModule } from '@ngx-translate/core';
import { FrontendSectionCommonsModule } from '../frontend-section-commons/frontend-section-commons.module';
import { FrontendCommonDocCommonsModule } from '../frontend-cdoc-commons/frontend-cdoc-commons.module';
var SectionsModule = /** @class */ (function () {
    function SectionsModule() {
    }
    SectionsModule = __decorate([
        NgModule({
            declarations: [],
            imports: [
                TranslateModule,
                NgxMdModule.forRoot(),
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
                AngularHtmlService,
                AngularMarkdownService,
                PageUtils
            ]
        })
    ], SectionsModule);
    return SectionsModule;
}());
export { SectionsModule };
//# sourceMappingURL=sections.module.js.map