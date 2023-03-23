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
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var AppServiceStub = /** @class */ (function (_super) {
    __extends(AppServiceStub, _super);
    function AppServiceStub() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mockedAppStateObservable = new ReplaySubject();
        return _this;
    }
    AppServiceStub.prototype.initApp = function () {
    };
    AppServiceStub.prototype.getAppState = function () {
        this.mockedAppStateObservable.next(AppState.Ready);
        return this.mockedAppStateObservable;
    };
    AppServiceStub.prototype.getAppConfig = function () {
        return {};
    };
    AppServiceStub.prototype.doSwitchToOfflineVersion = function () { };
    AppServiceStub.prototype.doSwitchToOnlineVersion = function () { };
    AppServiceStub = __decorate([
        Injectable()
    ], AppServiceStub);
    return AppServiceStub;
}(GenericAppService));
export { AppServiceStub };
//# sourceMappingURL=appservice-stubs.js.map