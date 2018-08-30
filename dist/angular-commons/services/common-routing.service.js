"use strict";
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
var router_1 = require("@angular/router");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var RoutingState;
(function (RoutingState) {
    RoutingState[RoutingState["DONE"] = 1] = "DONE";
    RoutingState[RoutingState["RUNNING"] = 2] = "RUNNING";
})(RoutingState = exports.RoutingState || (exports.RoutingState = {}));
var CommonRoutingService = /** @class */ (function () {
    function CommonRoutingService(router) {
        var _this = this;
        this.router = router;
        this.routingStateObservable = new BehaviorSubject_1.BehaviorSubject(RoutingState.DONE);
        router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationStart) {
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], CommonRoutingService);
    return CommonRoutingService;
}());
exports.CommonRoutingService = CommonRoutingService;
//# sourceMappingURL=common-routing.service.js.map