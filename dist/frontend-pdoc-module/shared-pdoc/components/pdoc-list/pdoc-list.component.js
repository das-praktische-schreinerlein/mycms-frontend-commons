var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonDocListComponent } from '../../../../frontend-cdoc-commons/components/cdoc-list/cdoc-list.component';
import { PDocSearchFormConverter } from '../../services/pdoc-searchform-converter.service';
import { Layout } from '../../../../angular-commons/services/layout.service';
var PDocListComponent = /** @class */ (function (_super) {
    __extends(PDocListComponent, _super);
    function PDocListComponent(searchFormConverter, cd) {
        var _this = _super.call(this, cd) || this;
        _this.searchFormConverter = searchFormConverter;
        _this.cd = cd;
        _this.Layout = Layout;
        return _this;
    }
    PDocListComponent.prototype.getBackToSearchUrl = function (searchResult) {
        return (searchResult.searchForm ?
            this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, searchResult.searchForm) : undefined);
    };
    PDocListComponent.prototype.updateData = function () {
    };
    PDocListComponent = __decorate([
        Component({
            selector: 'app-pdoc-list',
            templateUrl: './pdoc-list.component.html',
            styleUrls: ['./pdoc-list.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [PDocSearchFormConverter, ChangeDetectorRef])
    ], PDocListComponent);
    return PDocListComponent;
}(CommonDocListComponent));
export { PDocListComponent };
//# sourceMappingURL=pdoc-list.component.js.map