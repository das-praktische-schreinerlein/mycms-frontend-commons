var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PDocSearchPageComponent } from './components/pdoc-searchpage/pdoc-searchpage.component';
import { PDocSearchFormResolver } from '../shared-pdoc/resolver/pdoc-searchform.resolver';
import { PDocShowPageComponent } from './components/pdoc-showpage/pdoc-showpage.component';
import { PDocRecordResolver } from '../shared-pdoc/resolver/pdoc-details.resolver';
import { PDocModalShowpageComponent } from './components/pdoc-showpage/pdoc-modal-showpage.component';
var pdocRoutes = [
    {
        path: 'pdoc',
        children: [
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: PDocSearchPageComponent,
                        data: {
                            id: 'pdocs_default',
                            baseSearchUrl: { data: 'pdoc/' }
                        }
                    },
                    {
                        path: ':what/:fulltext/:moreFilter/:sort/:type/:perPage/:pageNum',
                        component: PDocSearchPageComponent,
                        data: {
                            flgDoSearch: true,
                            id: 'pdocs_search',
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'pdoc/' }
                        },
                        resolve: {
                            searchForm: PDocSearchFormResolver
                        }
                    },
                    {
                        path: '**',
                        component: PDocSearchPageComponent,
                        data: {
                            id: 'pdocs_fallback',
                            baseSearchUrl: { data: 'pdoc/' }
                        }
                    }
                ]
            },
            {
                path: 'show/:name/:id',
                component: PDocShowPageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordResolver
                }
            },
            {
                path: '**',
                redirectTo: 'pdoc/search',
                data: {
                    id: 'pdoc_fallback'
                }
            }
        ]
    },
    {
        path: 'pdocmodalshow',
        children: [
            {
                path: 'show/:name/:id',
                component: PDocModalShowpageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordResolver
                }
            }
        ],
        outlet: 'pdocmodalshow',
    },
];
var PDocRoutingModule = /** @class */ (function () {
    function PDocRoutingModule() {
    }
    PDocRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(pdocRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], PDocRoutingModule);
    return PDocRoutingModule;
}());
export { PDocRoutingModule };
//# sourceMappingURL=pdoc-routing.module.js.map