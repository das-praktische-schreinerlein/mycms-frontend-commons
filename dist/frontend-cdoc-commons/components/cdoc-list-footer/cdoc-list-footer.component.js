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
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
var CommonDocListFooterComponent = /** @class */ (function () {
    function CommonDocListFooterComponent() {
        this.pageChange = new EventEmitter();
    }
    CommonDocListFooterComponent.prototype.onPageChange = function (page) {
        this.pageChange.emit(page);
    };
    __decorate([
        Input(),
        __metadata("design:type", CommonDocSearchResult)
    ], CommonDocListFooterComponent.prototype, "searchResult", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocListFooterComponent.prototype, "pageChange", void 0);
    CommonDocListFooterComponent = __decorate([
        Component({
            selector: 'app-cdoc-list-footer',
            templateUrl: './cdoc-list-footer.component.html',
            styleUrls: ['./cdoc-list-footer.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], CommonDocListFooterComponent);
    return CommonDocListFooterComponent;
}());
export { CommonDocListFooterComponent };
//# sourceMappingURL=cdoc-list-footer.component.js.map