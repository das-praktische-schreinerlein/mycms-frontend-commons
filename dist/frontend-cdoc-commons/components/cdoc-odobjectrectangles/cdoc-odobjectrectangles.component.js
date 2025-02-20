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
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocODObjectDetailsComponent } from '../cdoc-odobjectdetails/cdoc-odobjectdetails.component';
var CommonDocODObjectRectanglesComponent = /** @class */ (function (_super) {
    __extends(CommonDocODObjectRectanglesComponent, _super);
    function CommonDocODObjectRectanglesComponent(appService, cd) {
        var _this = _super.call(this, appService, cd) || this;
        _this.appService = appService;
        _this.cd = cd;
        _this.rotateFlag = false;
        return _this;
    }
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CommonDocODObjectRectanglesComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocODObjectRectanglesComponent.prototype, "rotateFlag", void 0);
    CommonDocODObjectRectanglesComponent = __decorate([
        Component({
            selector: 'app-cdoc-odobjectrectangles',
            templateUrl: './cdoc-odobjectrectangles.component.html',
            styleUrls: ['./cdoc-odobjectrectangles.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, ChangeDetectorRef])
    ], CommonDocODObjectRectanglesComponent);
    return CommonDocODObjectRectanglesComponent;
}(CommonDocODObjectDetailsComponent));
export { CommonDocODObjectRectanglesComponent };
//# sourceMappingURL=cdoc-odobjectrectangles.component.js.map