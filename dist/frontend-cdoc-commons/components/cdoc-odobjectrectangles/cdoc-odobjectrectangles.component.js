"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocODObjectRectanglesComponent = /** @class */ (function (_super) {
    __extends(CommonDocODObjectRectanglesComponent, _super);
    function CommonDocODObjectRectanglesComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        return _this;
    }
    CommonDocODObjectRectanglesComponent.prototype.updateData = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocODObjectRectanglesComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocODObjectRectanglesComponent.prototype, "objects", void 0);
    CommonDocODObjectRectanglesComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-odobjectrectangles',
            templateUrl: './cdoc-odobjectrectangles.component.html',
            styleUrls: ['./cdoc-odobjectrectangles.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], CommonDocODObjectRectanglesComponent);
    return CommonDocODObjectRectanglesComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocODObjectRectanglesComponent = CommonDocODObjectRectanglesComponent;
//# sourceMappingURL=cdoc-odobjectrectangles.component.js.map