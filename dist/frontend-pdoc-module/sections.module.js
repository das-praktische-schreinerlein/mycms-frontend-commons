"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sections_routing_module_1 = require("./sections-routing.module");
var sections_baseurl_resolver_1 = require("../frontend-cdoc-commons/resolver/sections-baseurl.resolver");
var sections_pdoc_details_resolver_1 = require("../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver");
var platform_browser_1 = require("@angular/platform-browser");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var sections_pdocs_resolver_1 = require("../frontend-cdoc-commons/resolver/sections-pdocs.resolver");
var error_resolver_1 = require("../frontend-cdoc-commons/resolver/error.resolver");
var page_utils_1 = require("../angular-commons/services/page.utils");
var angular2_markdown_1 = require("angular2-markdown");
var angular_markdown_service_1 = require("../angular-commons/services/angular-markdown.service");
var angular_html_service_1 = require("../angular-commons/services/angular-html.service");
var common_routing_service_1 = require("../angular-commons/services/common-routing.service");
var core_2 = require("@ngx-translate/core");
var frontend_pdoc_commons_module_1 = require("../frontend-pdoc-commons/frontend-pdoc-commons.module");
var frontend_cdoc_commons_module_1 = require("../frontend-cdoc-commons/frontend-cdoc-commons.module");
var SectionsModule = /** @class */ (function () {
    function SectionsModule() {
    }
    SectionsModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                core_2.TranslateModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                angular2_markdown_1.MarkdownModule.forRoot(),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                frontend_pdoc_commons_module_1.FrontendPDocCommonsModule,
                sections_routing_module_1.SectionsRoutingModule,
                frontend_cdoc_commons_module_1.FrontendCommonDocCommonsModule
            ],
            providers: [
                common_routing_service_1.CommonRoutingService,
                sections_baseurl_resolver_1.SectionsBaseUrlResolver,
                sections_pdoc_details_resolver_1.SectionsPDocRecordResolver,
                sections_pdocs_resolver_1.SectionsPDocsResolver,
                error_resolver_1.ErrorResolver,
                angular_html_service_1.AngularHtmlService,
                angular_markdown_service_1.AngularMarkdownService,
                page_utils_1.PageUtils
            ]
        })
    ], SectionsModule);
    return SectionsModule;
}());
exports.SectionsModule = SectionsModule;
//# sourceMappingURL=sections.module.js.map