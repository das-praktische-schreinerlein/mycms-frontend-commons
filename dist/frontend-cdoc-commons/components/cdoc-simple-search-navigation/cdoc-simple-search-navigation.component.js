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
import { Input } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocSimpleSearchNavigationComponent = /** @class */ (function (_super) {
    __extends(CommonDocSimpleSearchNavigationComponent, _super);
    function CommonDocSimpleSearchNavigationComponent(cdocRoutingService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.cdocRoutingService = cdocRoutingService;
        return _this;
    }
    CommonDocSimpleSearchNavigationComponent.prototype.updateData = function () {
    };
    CommonDocSimpleSearchNavigationComponent.prototype.submitBackToSearch = function () {
        this.cdocRoutingService.navigateBackToSearch('#' + this.record.id);
        return false;
    };
    CommonDocSimpleSearchNavigationComponent.prototype.submitToLastSearchPredecessor = function () {
        this.cdocRoutingService.navigateToSearchPredecessor();
        return false;
    };
    CommonDocSimpleSearchNavigationComponent.prototype.submitToLastSearchSuccessor = function () {
        this.cdocRoutingService.navigateToSearchSuccessor();
        return false;
    };
    CommonDocSimpleSearchNavigationComponent.prototype.getBackToSearchUrl = function () {
        return this.cdocRoutingService.getLastSearchUrl() + '#' + this.record.id;
    };
    CommonDocSimpleSearchNavigationComponent.prototype.getLastSearchSuccessorUrl = function () {
        return this.cdocRoutingService.getLastSearchUrlSuccessor();
    };
    CommonDocSimpleSearchNavigationComponent.prototype.getLastSearchPredecessorUrl = function () {
        return this.cdocRoutingService.getLastSearchUrlPredecessor();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocSimpleSearchNavigationComponent.prototype, "record", void 0);
    return CommonDocSimpleSearchNavigationComponent;
}(AbstractInlineComponent));
export { CommonDocSimpleSearchNavigationComponent };
//# sourceMappingURL=cdoc-simple-search-navigation.component.js.map