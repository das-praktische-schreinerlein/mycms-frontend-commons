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
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { PDocListItemComponent } from '../pdoc-list-item/pdoc-list-item.component';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
var PDocListItemFlatComponent = /** @class */ (function (_super) {
    __extends(PDocListItemFlatComponent, _super);
    function PDocListItemFlatComponent(contentUtils, cd, layoutService, sanitizer, cdocRoutingService) {
        var _this = _super.call(this, contentUtils, cd, layoutService, sanitizer, cdocRoutingService) || this;
        _this.listLayoutName = 'flat';
        return _this;
    }
    PDocListItemFlatComponent = __decorate([
        Component({
            selector: 'app-pdoc-list-item-flat',
            templateUrl: './pdoc-list-item-flat.component.html',
            styleUrls: ['./pdoc-list-item-flat.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [PDocContentUtils, ChangeDetectorRef, LayoutService,
            DomSanitizer, PDocRoutingService])
    ], PDocListItemFlatComponent);
    return PDocListItemFlatComponent;
}(PDocListItemComponent));
export { PDocListItemFlatComponent };
//# sourceMappingURL=pdoc-list-item-flat.component.js.map