"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sections_pdoc_details_resolver_1 = require("../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver");
var sections_baseurl_resolver_1 = require("../frontend-cdoc-commons/resolver/sections-baseurl.resolver");
var sectionbar_component_1 = require("../frontend-pdoc-commons/components/sectionbar/sectionbar.component");
var section_component_1 = require("../frontend-pdoc-commons/components/section/section.component");
var section_page_component_1 = require("../frontend-pdoc-commons/components/sectionpage/section-page.component");
var sectionRoutes = [
    {
        path: 'pages',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'pages/start'
            },
            {
                path: ':section',
                component: section_component_1.SectionComponent,
                children: [
                    {
                        path: '',
                        outlet: 'sectionbar',
                        component: sectionbar_component_1.SectionBarComponent,
                        resolve: {
                            pdoc: sections_pdoc_details_resolver_1.SectionsPDocRecordResolver
                        }
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: section_page_component_1.SectionPageComponent,
                        data: {
                            id: 'sections_section',
                        },
                        resolve: {
                            pdoc: sections_pdoc_details_resolver_1.SectionsPDocRecordResolver,
                            baseSearchUrl: sections_baseurl_resolver_1.SectionsBaseUrlResolver
                        },
                    }
                ]
            },
        ]
    }
];
var SectionsRoutingModule = /** @class */ (function () {
    function SectionsRoutingModule() {
    }
    SectionsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(sectionRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], SectionsRoutingModule);
    return SectionsRoutingModule;
}());
exports.SectionsRoutingModule = SectionsRoutingModule;
//# sourceMappingURL=sections-routing.module.js.map