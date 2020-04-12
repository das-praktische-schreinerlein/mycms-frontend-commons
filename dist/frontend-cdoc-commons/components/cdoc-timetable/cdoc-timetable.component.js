var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { Facet, Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocTimetableComponent = /** @class */ (function (_super) {
    __extends(CommonDocTimetableComponent, _super);
    function CommonDocTimetableComponent(searchParameterUtils, searchFormUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.searchParameterUtils = searchParameterUtils;
        _this.searchFormUtils = searchFormUtils;
        _this.cd = cd;
        _this.columns = [];
        _this.columnClicked = new EventEmitter();
        return _this;
    }
    CommonDocTimetableComponent.prototype.onColumnClicked = function (key) {
        this.columnClicked.emit(key);
        return false;
    };
    CommonDocTimetableComponent.prototype.updateData = function () {
        var result = [];
        var facetName = 'month_is';
        var origFacet = this.searchResult.facets.facets.get(facetName);
        if (origFacet === undefined || origFacet.facet === undefined) {
            this.columns = [];
            return;
        }
        // copy facets
        var keys = {};
        for (var idx in origFacet.facet) {
            var facetValue = origFacet.facet[idx];
            if (facetValue[0] === undefined || facetValue[0].toString().length <= 0) {
                continue;
            }
            if (facetValue[0] === null || facetValue[0] === 'null') {
                facetValue[0] = 0;
            }
            keys[facetValue[0]] = facetValue;
        }
        // fill month
        for (var i = 1; i <= 12; i++) {
            var key = '' + i;
            if (keys[key] === undefined) {
                keys[key] = [key, 0];
            }
        }
        // sort
        var timeValues = [];
        for (var idx in keys) {
            timeValues.push(keys[idx]);
        }
        timeValues.sort(function (a, b) {
            var nameA = parseInt(a[0], 10);
            var nameB = parseInt(b[0], 10);
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        // create new timefacet
        var timeFacets = new Facets();
        var timeFacet = new Facet();
        timeFacet.facet = timeValues;
        timeFacets.facets.set(facetName, timeFacet);
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.searchParameterUtils.extractFacetValues(timeFacets, facetName, 'month', 'Monat'), false, [], true);
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            var column = {
                width: 100 / values.length + '%',
                value: value['count'],
                label: value.name,
                key: value.id
            };
            result.push(column);
        }
        this.columns = result;
    };
    __decorate([
        Input(),
        __metadata("design:type", CommonDocSearchResult)
    ], CommonDocTimetableComponent.prototype, "searchResult", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTimetableComponent.prototype, "columnClicked", void 0);
    CommonDocTimetableComponent = __decorate([
        Component({
            selector: 'app-cdoc-timetable',
            templateUrl: './cdoc-timetable.component.html',
            styleUrls: ['./cdoc-timetable.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [SearchParameterUtils, SearchFormUtils,
            ChangeDetectorRef])
    ], CommonDocTimetableComponent);
    return CommonDocTimetableComponent;
}(AbstractInlineComponent));
export { CommonDocTimetableComponent };
//# sourceMappingURL=cdoc-timetable.component.js.map