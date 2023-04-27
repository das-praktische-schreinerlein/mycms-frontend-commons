import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SectionsPDocRecordResolver} from '../frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import {SectionsBaseUrlResolver} from '../frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import {SectionBarComponent} from '../frontend-section-commons/components/sectionbar/sectionbar.component';
import {SectionComponent} from '../frontend-section-commons/components/section/section.component';
import {SectionPageComponent} from '../frontend-section-commons/components/sectionpage/section-page.component';

const sectionRoutes: Routes = [
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

@NgModule({
    imports: [
        RouterModule.forChild(sectionRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SectionsRoutingModule {}
