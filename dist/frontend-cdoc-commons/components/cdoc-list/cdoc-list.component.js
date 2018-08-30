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
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocListComponent = /** @class */ (function (_super) {
    __extends(CommonDocListComponent, _super);
    function CommonDocListComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.short = false;
        _this.show = new core_1.EventEmitter();
        _this.Layout = layout_service_1.Layout;
        return _this;
    }
    CommonDocListComponent.prototype.onShow = function (record) {
        this.show.emit(record);
        return false;
    };
    CommonDocListComponent.prototype.getBackToSearchUrl = function (searchResult) {
        return '';
    };
    CommonDocListComponent.prototype.updateData = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocListComponent.prototype, "searchResult", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocListComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocListComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocListComponent.prototype, "short", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListComponent.prototype, "show", void 0);
    CommonDocListComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-list',
            templateUrl: './cdoc-list.component.html',
            styleUrls: ['./cdoc-list.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], CommonDocListComponent);
    return CommonDocListComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocListComponent = CommonDocListComponent;
//# sourceMappingURL=cdoc-list.component.js.map