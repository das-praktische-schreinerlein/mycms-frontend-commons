var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
var PDocDataServiceStub = /** @class */ (function () {
    function PDocDataServiceStub() {
    }
    PDocDataServiceStub.defaultSearchResult = function () {
        return new PDocSearchResult(new PDocSearchForm({}), 1, [new PDocRecord({ id: '1', name: 'Test' })], new Facets());
    };
    PDocDataServiceStub.defaultRecord = function () {
        return new PDocRecord({ id: '1', name: 'Test' });
    };
    PDocDataServiceStub.prototype.search = function (searchForm) {
        return Promise.resolve(new PDocSearchResult(searchForm, 0, [], new Facets()));
    };
    ;
    PDocDataServiceStub.prototype.getById = function (id) {
        return Promise.resolve(new PDocRecord({ id: '1' }));
    };
    ;
    PDocDataServiceStub.prototype.getSubDocuments = function (pdoc) {
        return [];
    };
    PDocDataServiceStub = __decorate([
        Injectable()
    ], PDocDataServiceStub);
    return PDocDataServiceStub;
}());
export { PDocDataServiceStub };
//# sourceMappingURL=pdoc-dataservice-stubs.js.map