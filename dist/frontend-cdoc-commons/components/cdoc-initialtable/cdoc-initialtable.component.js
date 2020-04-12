var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentUtils } from '../../../angular-commons/services/component.utils';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchFormUtils } from '../..//services/cdoc-searchform-utils.service';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
var CommonDocInitialtableComponent = /** @class */ (function () {
    function CommonDocInitialtableComponent(searchFormUtils, cdocSearchFormUtils) {
        this.searchFormUtils = searchFormUtils;
        this.cdocSearchFormUtils = cdocSearchFormUtils;
        this.columns = [];
        this.columnClicked = new EventEmitter();
    }
    CommonDocInitialtableComponent.prototype.ngOnChanges = function (changes) {
        if (ComponentUtils.hasNgChanged(changes)) {
            this.renderInitialtable();
        }
    };
    CommonDocInitialtableComponent.prototype.onColumnClicked = function (key) {
        this.columnClicked.emit(key);
        return false;
    };
    CommonDocInitialtableComponent.prototype.renderInitialtable = function () {
        var result = [];
        var values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getInitialValues(this.searchResult), false, [], true)
            .filter(function (value) {
            return value.name.match(/[a-zA-Z0-9]+/);
        })
            .sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        var formValue = (this.searchResult.searchForm ? this.searchResult.searchForm.initial : '');
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            var column = {
                width: 100 / values.length + '%',
                value: value['count'],
                label: value.name,
                key: value.id,
                active: formValue && formValue.indexOf(value.id) >= 0
            };
            result.push(column);
        }
        this.columns = result;
    };
    __decorate([
        Input(),
        __metadata("design:type", CommonDocSearchResult)
    ], CommonDocInitialtableComponent.prototype, "searchResult", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocInitialtableComponent.prototype, "columnClicked", void 0);
    CommonDocInitialtableComponent = __decorate([
        Component({
            selector: 'app-cdoc-initialtable',
            templateUrl: './cdoc-initialtable.component.html',
            styleUrls: ['./cdoc-initialtable.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [SearchFormUtils, CommonDocSearchFormUtils])
    ], CommonDocInitialtableComponent);
    return CommonDocInitialtableComponent;
}());
export { CommonDocInitialtableComponent };
//# sourceMappingURL=cdoc-initialtable.component.js.map