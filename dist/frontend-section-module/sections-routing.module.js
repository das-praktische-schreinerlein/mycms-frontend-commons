var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionsPDocRecordResolver } from '../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import { SectionsBaseUrlResolver } from '../frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import { SectionBarComponent } from '../frontend-section-commons/components/sectionbar/sectionbar.component';
import { SectionComponent } from '../frontend-section-commons/components/section/section.component';
import { SectionPageComponent } from '../frontend-section-commons/components/sectionpage/section-page.component';
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
                component: SectionComponent,
                children: [
                    {
                        path: '',
                        outlet: 'sectionbar',
                        component: SectionBarComponent,
                        resolve: {
                            pdoc: SectionsPDocRecordResolver
                        }
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: SectionPageComponent,
                        data: {
                            id: 'sections_section',
                        },
                        resolve: {
                            pdoc: SectionsPDocRecordResolver,
                            baseSearchUrl: SectionsBaseUrlResolver
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
        NgModule({
            imports: [
                RouterModule.forChild(sectionRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], SectionsRoutingModule);
    return SectionsRoutingModule;
}());
export { SectionsRoutingModule };
//# sourceMappingURL=sections-routing.module.js.map