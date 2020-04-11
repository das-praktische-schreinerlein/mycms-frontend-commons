"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
var cdoc_searchform_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform");
var pdoc_record_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record");
var ActivatedRouteStub = /** @class */ (function () {
    function ActivatedRouteStub() {
        this.params = Observable_1.Observable.of({
            id: 1
        });
        this.data = Observable_1.Observable.of({
            record: {
                data: new cdoc_entity_record_1.CommonDocRecord({ id: '1', name: 'Test' })
            },
            pdoc: {
                data: new pdoc_record_1.PDocRecord({ id: '1', name: 'Test' })
            },
            searchForm: {
                data: new cdoc_searchform_1.CommonDocSearchForm({})
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
        core_1.Injectable()
    ], ActivatedRouteStub);
    return ActivatedRouteStub;
}());
exports.ActivatedRouteStub = ActivatedRouteStub;
//# sourceMappingURL=router-stubs.js.map