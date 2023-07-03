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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { DomSanitizer } from '@angular/platform-browser';
import { Layout, LayoutService } from '../../../../angular-commons/services/layout.service';
import { CommonDocListItemComponent } from '../../../../frontend-cdoc-commons/components/cdoc-list-item/cdoc-list-item.component';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
var PDocListItemComponent = /** @class */ (function (_super) {
    __extends(PDocListItemComponent, _super);
    function PDocListItemComponent(contentUtils, cd, layoutService, sanitizer, cdocRoutingService) {
        var _this = _super.call(this, contentUtils, cd, layoutService) || this;
        _this.sanitizer = sanitizer;
        _this.cdocRoutingService = cdocRoutingService;
        _this.show = new EventEmitter();
        _this.listLayoutName = 'default';
        return _this;
    }
    PDocListItemComponent.prototype.submitShow = function (pdoc) {
        this.show.emit(pdoc);
        return false;
    };
    PDocListItemComponent.prototype.getShowUrl = function (info) {
        return this.sanitizer.bypassSecurityTrustUrl(this.getUrl(info));
    };
    PDocListItemComponent.prototype.getUrl = function (pdoc) {
        return this.cdocRoutingService.getShowUrl(pdoc, '');
    };
    __decorate([
        Input(),
        __metadata("design:type", PDocRecord)
    ], PDocListItemComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PDocListItemComponent.prototype, "layout", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PDocListItemComponent.prototype, "show", void 0);
    PDocListItemComponent = __decorate([
        Component({
            selector: 'app-pdoc-list-item',
            templateUrl: './pdoc-list-item.component.html',
            styleUrls: ['./pdoc-list-item.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [PDocContentUtils, ChangeDetectorRef, LayoutService,
            DomSanitizer, PDocRoutingService])
    ], PDocListItemComponent);
    return PDocListItemComponent;
}(CommonDocListItemComponent));
export { PDocListItemComponent };
//# sourceMappingURL=pdoc-list-item.component.js.map