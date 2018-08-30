"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cdoc_searchresult_1 = require("@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult");
var CommonDocListFooterComponent = /** @class */ (function () {
    function CommonDocListFooterComponent() {
        this.pageChange = new core_1.EventEmitter();
    }
    CommonDocListFooterComponent.prototype.onPageChange = function (page) {
        this.pageChange.emit(page);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_searchresult_1.CommonDocSearchResult)
    ], CommonDocListFooterComponent.prototype, "searchResult", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListFooterComponent.prototype, "pageChange", void 0);
    CommonDocListFooterComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-list-footer',
            templateUrl: './cdoc-list-footer.component.html',
            styleUrls: ['./cdoc-list-footer.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], CommonDocListFooterComponent);
    return CommonDocListFooterComponent;
}());
exports.CommonDocListFooterComponent = CommonDocListFooterComponent;
//# sourceMappingURL=cdoc-list-footer.component.js.map