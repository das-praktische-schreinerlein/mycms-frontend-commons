var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
export var RoutingState;
(function (RoutingState) {
    RoutingState[RoutingState["DONE"] = 1] = "DONE";
    RoutingState[RoutingState["RUNNING"] = 2] = "RUNNING";
})(RoutingState || (RoutingState = {}));
var CommonRoutingService = /** @class */ (function () {
    function CommonRoutingService(router) {
        var _this = this;
        this.router = router;
        this.routingStateObservable = new BehaviorSubject(RoutingState.DONE);
        router.events.subscribe(function (val) {
            if (val instanceof NavigationStart) {
                _this.setRoutingState(RoutingState.RUNNING);
            }
        });
    }
    CommonRoutingService.prototype.getRoutingState = function () {
        return this.routingStateObservable;
    };
    CommonRoutingService.prototype.setRoutingState = function (newState) {
        this.routingStateObservable.next(newState);
    };
    CommonRoutingService.prototype.navigateByUrl = function (url, extras) {
        var result = this.router.navigateByUrl(url, extras);
        return result;
    };
    CommonRoutingService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], CommonRoutingService);
    return CommonRoutingService;
}());
export { CommonRoutingService };
//# sourceMappingURL=common-routing.service.js.map