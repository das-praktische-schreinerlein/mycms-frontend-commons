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
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocTagcloudComponent = /** @class */ (function (_super) {
    __extends(CommonDocTagcloudComponent, _super);
    function CommonDocTagcloudComponent(searchParameterUtils, searchFormUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.searchParameterUtils = searchParameterUtils;
        _this.searchFormUtils = searchFormUtils;
        _this.cd = cd;
        _this.columns = [];
        _this.max = 20;
        _this.valuePrefix = '';
        _this.labelPrefix = '';
        _this.sortKey = 'label';
        _this.columnClicked = new EventEmitter();
        _this.columnsFound = new EventEmitter();
        _this.minCount = 0;
        _this.maxCount = 0;
        _this.factor = 0;
        return _this;
    }
    CommonDocTagcloudComponent.prototype.onColumnClicked = function (key) {
        this.columnClicked.emit(this.valuePrefix + key);
        return false;
    };
    CommonDocTagcloudComponent.prototype.updateData = function () {
        var _this = this;
        var result = [];
        var facetName = this.facetName;
        var origFacet = this.searchResult.facets;
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.searchParameterUtils.extractFacetValues(origFacet, facetName, '', this.labelPrefix), false, [], true);
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value['count'] <= 0) {
                continue;
            }
            var column = {
                count: parseInt(value['count'], 10),
                label: value.name,
                key: value.id
            };
            result.push(column);
        }
        if (result.length > 0) {
            // sort
            result.sort(function (a, b) {
                var nameA = a['count'];
                var nameB = b['count'];
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            result = result.reverse();
            if (result.length > this.max) {
                result = result.slice(0, this.max);
            }
            this.maxCount = result[0]['count'];
            this.minCount = result[result.length - 1]['count'];
            this.factor = 100 / (this.maxCount - this.minCount) / 20;
            // sort
            result.sort(function (a, b) {
                var numbers = !isNaN(parseFloat(a[_this.sortKey])) && !isNaN(parseFloat(b[_this.sortKey]));
                var nameA = numbers ? parseFloat(a[_this.sortKey]) : a[_this.sortKey];
                var nameB = numbers ? parseFloat(b[_this.sortKey]) : b[_this.sortKey];
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }
        this.columns = result;
        this.columnsFound.emit(this.columns.length);
    };
    CommonDocTagcloudComponent.prototype.calcSizeClass = function (count) {
        return Math.round((count - this.minCount) * this.factor);
    };
    __decorate([
        Input(),
        __metadata("design:type", CommonDocSearchResult)
    ], CommonDocTagcloudComponent.prototype, "searchResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocTagcloudComponent.prototype, "facetName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocTagcloudComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagcloudComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagcloudComponent.prototype, "valuePrefix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagcloudComponent.prototype, "labelPrefix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocTagcloudComponent.prototype, "sortKey", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTagcloudComponent.prototype, "columnClicked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocTagcloudComponent.prototype, "columnsFound", void 0);
    CommonDocTagcloudComponent = __decorate([
        Component({
            selector: 'app-cdoc-tagcloud',
            templateUrl: './cdoc-tagcloud.component.html',
            styleUrls: ['./cdoc-tagcloud.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [SearchParameterUtils, SearchFormUtils,
            ChangeDetectorRef])
    ], CommonDocTagcloudComponent);
    return CommonDocTagcloudComponent;
}(AbstractInlineComponent));
export { CommonDocTagcloudComponent };
//# sourceMappingURL=cdoc-tagcloud.component.js.map