var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
var ActivatedRouteStub = /** @class */ (function () {
    function ActivatedRouteStub() {
        this.params = of({
            id: 1
        });
        this.data = of({
            record: {
                data: new CommonDocRecord({ id: '1', name: 'Test' })
            },
            pdoc: {
                data: new PDocRecord({ id: '1', name: 'Test' })
            },
            searchForm: {
                data: new CommonDocSearchForm({})
            },
            flgDoSearch: false,
            baseSearchUrl: {
                data: '/sections'
            }
        });
        this.queryParamMap = {
            subscribe: function () { }
        };
        this.fragment = {
            subscribe: function () { }
        };
    }
    ActivatedRouteStub = __decorate([
        Injectable()
    ], ActivatedRouteStub);
    return ActivatedRouteStub;
}());
export { ActivatedRouteStub };
//# sourceMappingURL=router-stubs.js.map