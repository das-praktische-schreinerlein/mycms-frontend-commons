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
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicComponentHostDirective } from '../../../angular-commons/components/directives/dynamic-component-host.directive';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocActionsComponent = /** @class */ (function (_super) {
    __extends(CommonDocActionsComponent, _super);
    function CommonDocActionsComponent(dynamicComponentService, toastr, cd, appService, actionTagService) {
        var _this = _super.call(this, cd) || this;
        _this.dynamicComponentService = dynamicComponentService;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.actionTagService = actionTagService;
        _this.actionTagEvent = new EventEmitter();
        _this.childActionTagEvent = new EventEmitter();
        _this.configureActionListener();
        return _this;
    }
    CommonDocActionsComponent.prototype.configureActionListener = function () {
        var _this = this;
        this.childActionTagEvent.asObservable().subscribe(function (actionTagEvent) {
            _this.actionTagService.processActionTagEvent(actionTagEvent, _this.actionTagEvent).then(function (value) {
                _this.updateData();
            }).catch(function (reason) {
                _this.toastr.error('Es gibt leider Probleme - am besten noch einmal probieren :-(', 'Oje!');
            });
        });
    };
    CommonDocActionsComponent.prototype.updateData = function () {
        var componentRef = this.dynamicComponentService.createComponentByName(this.type, this.widgetHost);
        if (componentRef === undefined || componentRef === null) {
            return;
        }
        (componentRef.instance)['type'] = this.type;
        (componentRef.instance)['actionTagEvent'] = this.childActionTagEvent;
        (componentRef.instance)['record'] = this.record;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocActionsComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocActionsComponent.prototype, "type", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocActionsComponent.prototype, "actionTagEvent", void 0);
    __decorate([
        ViewChild(DynamicComponentHostDirective),
        __metadata("design:type", DynamicComponentHostDirective)
    ], CommonDocActionsComponent.prototype, "widgetHost", void 0);
    return CommonDocActionsComponent;
}(AbstractInlineComponent));
export { CommonDocActionsComponent };
//# sourceMappingURL=cdoc-actions.component.js.map