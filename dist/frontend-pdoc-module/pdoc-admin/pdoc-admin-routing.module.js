var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PDocRecordResolver } from '../shared-pdoc/resolver/pdoc-details.resolver';
import { PDocEditpageComponent } from './components/pdoc-editpage/pdoc-editpage.component';
import { PDocRecordCreateResolver } from '../shared-admin-pdoc/resolver/pdoc-create.resolver';
import { PDocCreatepageComponent } from './components/pdoc-createpage/pdoc-createpage.component';
import { PDocModalCreatepageComponent } from './components/pdoc-createpage/pdoc-modal-createpage.component';
var pdocAdminRoutes = [
    {
        path: 'pdocadmin',
        children: [
            {
                path: 'edit/:name/:id',
                component: PDocEditpageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordResolver
                }
            },
            {
                path: 'create/:createByType/:createBaseId',
                component: PDocCreatepageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordCreateResolver
                }
            },
            {
                path: 'create/:createByType',
                component: PDocCreatepageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordCreateResolver
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
        path: 'pdocmodaledit',
        children: [
            {
                path: 'create/:createByType/:createBaseId',
                component: PDocModalCreatepageComponent,
                data: {
                    baseSearchUrl: { data: 'pdoc/' }
                },
                resolve: {
                    record: PDocRecordCreateResolver
                },
            }
        ],
        outlet: 'pdocmodaledit',
    },
];
var PDocAdminRoutingModule = /** @class */ (function () {
    function PDocAdminRoutingModule() {
    }
    PDocAdminRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(pdocAdminRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], PDocAdminRoutingModule);
    return PDocAdminRoutingModule;
}());
export { PDocAdminRoutingModule };
//# sourceMappingURL=pdoc-admin-routing.module.js.map