var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
var CommonDocDataServiceStub = /** @class */ (function () {
    function CommonDocDataServiceStub() {
    }
    CommonDocDataServiceStub.defaultSearchResult = function () {
        return new CommonDocSearchResult(new CommonDocSearchForm({}), 1, [new CommonDocRecord({ id: '1', name: 'Test' })], new Facets());
    };
    CommonDocDataServiceStub.defaultRecord = function () {
        return new CommonDocRecord({ id: '1', name: 'Test' });
    };
    CommonDocDataServiceStub.prototype.cloneSanitizedSearchForm = function (values) {
        return new CommonDocSearchForm(values);
    };
    CommonDocDataServiceStub.prototype.newSearchForm = function (values) {
        return new CommonDocSearchForm(values);
    };
    CommonDocDataServiceStub.prototype.search = function (searchForm) {
        return Promise.resolve(new CommonDocSearchResult(searchForm, 0, [], new Facets()));
    };
    ;
    CommonDocDataServiceStub.prototype.newSearchResult = function (tdocSearchForm, recordCount, currentRecords, facets) {
        return new CommonDocSearchResult(tdocSearchForm, recordCount, currentRecords, facets);
    };
    CommonDocDataServiceStub = __decorate([
        Injectable()
    ], CommonDocDataServiceStub);
    return CommonDocDataServiceStub;
}());
export { CommonDocDataServiceStub };
//# sourceMappingURL=cdoc-dataservice-stubs.js.map