"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdoc_searchform_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform");
var pdoc_searchresult_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult");
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var pdoc_record_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record");
var PDocDataServiceStub = /** @class */ (function () {
    function PDocDataServiceStub() {
    }
    PDocDataServiceStub.defaultSearchResult = function () {
        return new pdoc_searchresult_1.PDocSearchResult(new pdoc_searchform_1.PDocSearchForm({}), 1, [new pdoc_record_1.PDocRecord({ id: '1', name: 'Test' })], new facets_1.Facets());
    };
    PDocDataServiceStub.defaultRecord = function () {
        return new pdoc_record_1.PDocRecord({ id: '1', name: 'Test' });
    };
    PDocDataServiceStub.prototype.search = function (searchForm) {
        return Promise.resolve(new pdoc_searchresult_1.PDocSearchResult(searchForm, 0, [], new facets_1.Facets()));
    };
    ;
    PDocDataServiceStub.prototype.getById = function (id) {
        return Promise.resolve(new pdoc_record_1.PDocRecord({ id: '1' }));
    };
    ;
    PDocDataServiceStub.prototype.getSubDocuments = function (pdoc) {
        return [];
    };
    PDocDataServiceStub = __decorate([
        core_1.Injectable()
    ], PDocDataServiceStub);
    return PDocDataServiceStub;
}());
exports.PDocDataServiceStub = PDocDataServiceStub;
//# sourceMappingURL=pdoc-dataservice-stubs.js.map