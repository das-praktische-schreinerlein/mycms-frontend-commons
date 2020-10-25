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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Layout } from '../../../angular-commons/services/layout.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocMultiActionManager } from '../../services/cdoc-multiaction.manager';
var CommonDocListComponent = /** @class */ (function (_super) {
    __extends(CommonDocListComponent, _super);
    function CommonDocListComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.short = false;
        _this.playerStarted = new EventEmitter();
        _this.playerStopped = new EventEmitter();
        _this.show = new EventEmitter();
        _this.Layout = Layout;
        return _this;
    }
    CommonDocListComponent.prototype.onShow = function (record) {
        this.show.emit(record);
        return false;
    };
    CommonDocListComponent.prototype.onPlayerStarted = function (mdoc) {
        this.playerStarted.emit(mdoc);
    };
    CommonDocListComponent.prototype.onPlayerStopped = function (mdoc) {
        this.playerStopped.emit(mdoc);
    };
    CommonDocListComponent.prototype.getBackToSearchUrl = function (searchResult) {
        return '';
    };
    CommonDocListComponent.prototype.updateData = function () {
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof S !== "undefined" && S) === "function" && _a || Object)
    ], CommonDocListComponent.prototype, "searchResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocListComponent.prototype, "baseSearchUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CommonDocListComponent.prototype, "layout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocListComponent.prototype, "short", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CommonDocMultiActionManager)
    ], CommonDocListComponent.prototype, "multiActionManager", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_b = typeof R !== "undefined" && R) === "function" && _b || Object)
    ], CommonDocListComponent.prototype, "playRecord", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocListComponent.prototype, "playerIdPrefix", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocListComponent.prototype, "playerStarted", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocListComponent.prototype, "playerStopped", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocListComponent.prototype, "show", void 0);
    CommonDocListComponent = __decorate([
        Component({
            selector: 'app-cdoc-list',
            templateUrl: './cdoc-list.component.html',
            styleUrls: ['./cdoc-list.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], CommonDocListComponent);
    return CommonDocListComponent;
}(AbstractInlineComponent));
export { CommonDocListComponent };
//# sourceMappingURL=cdoc-list.component.js.map