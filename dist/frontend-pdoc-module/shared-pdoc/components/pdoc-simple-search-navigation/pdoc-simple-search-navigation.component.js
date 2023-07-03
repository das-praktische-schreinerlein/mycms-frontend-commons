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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonDocSimpleSearchNavigationComponent } from '../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
var PDocSimpleSearchNavigationComponent = /** @class */ (function (_super) {
    __extends(PDocSimpleSearchNavigationComponent, _super);
    function PDocSimpleSearchNavigationComponent(cdocRoutingService, cd) {
        var _this = _super.call(this, cdocRoutingService, cd) || this;
        _this.baseSearchUrl = 'pdoc/';
        return _this;
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PDocSimpleSearchNavigationComponent.prototype, "baseSearchUrl", void 0);
    PDocSimpleSearchNavigationComponent = __decorate([
        Component({
            selector: 'app-pdoc-simple-search-navigation',
            templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component.html',
            styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [PDocRoutingService, ChangeDetectorRef])
    ], PDocSimpleSearchNavigationComponent);
    return PDocSimpleSearchNavigationComponent;
}(CommonDocSimpleSearchNavigationComponent));
export { PDocSimpleSearchNavigationComponent };
//# sourceMappingURL=pdoc-simple-search-navigation.component.js.map