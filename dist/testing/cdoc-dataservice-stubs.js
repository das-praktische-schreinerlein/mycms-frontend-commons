"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
var cdoc_searchform_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform");
var cdoc_searchresult_1 = require("@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult");
var CommonDocDataServiceStub = /** @class */ (function () {
    function CommonDocDataServiceStub() {
    }
    CommonDocDataServiceStub.defaultSearchResult = function () {
        return new cdoc_searchresult_1.CommonDocSearchResult(new cdoc_searchform_1.CommonDocSearchForm({}), 1, [new cdoc_entity_record_1.CommonDocRecord({ id: '1', name: 'Test' })], new facets_1.Facets());
    };
    CommonDocDataServiceStub.defaultRecord = function () {
        return new cdoc_entity_record_1.CommonDocRecord({ id: '1', name: 'Test' });
    };
    CommonDocDataServiceStub.prototype.cloneSanitizedSearchForm = function (values) {
        return new cdoc_searchform_1.CommonDocSearchForm(values);
    };
    CommonDocDataServiceStub.prototype.newSearchForm = function (values) {
        return new cdoc_searchform_1.CommonDocSearchForm(values);
    };
    CommonDocDataServiceStub.prototype.search = function (searchForm) {
        return Promise.resolve(new cdoc_searchresult_1.CommonDocSearchResult(searchForm, 0, [], new facets_1.Facets()));
    };
    ;
    CommonDocDataServiceStub.prototype.newSearchResult = function (tdocSearchForm, recordCount, currentRecords, facets) {
        return new cdoc_searchresult_1.CommonDocSearchResult(tdocSearchForm, recordCount, currentRecords, facets);
    };
    CommonDocDataServiceStub = __decorate([
        core_1.Injectable()
    ], CommonDocDataServiceStub);
    return CommonDocDataServiceStub;
}());
exports.CommonDocDataServiceStub = CommonDocDataServiceStub;
//# sourceMappingURL=cdoc-dataservice-stubs.js.map