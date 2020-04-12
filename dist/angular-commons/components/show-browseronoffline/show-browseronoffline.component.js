var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injectable } from '@angular/core';
import { BrowserOnlineState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var ShowBrowserOnOfflineComponent = /** @class */ (function () {
    function ShowBrowserOnOfflineComponent(appService) {
        this.appService = appService;
        this.onlineState = 'online';
    }
    ShowBrowserOnOfflineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getBrowserOnlineState().subscribe(function (appOnlineState) {
            if (appOnlineState === BrowserOnlineState.Offline) {
                _this.onlineState = 'offline';
            }
            else if (appOnlineState === BrowserOnlineState.Online) {
                _this.onlineState = 'online';
            }
        });
    };
    ShowBrowserOnOfflineComponent = __decorate([
        Component({
            selector: 'app-browser-onoffline',
            templateUrl: './show-browseronoffline.component.html',
            styleUrls: ['./show-browseronoffline.component.css']
        }),
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService])
    ], ShowBrowserOnOfflineComponent);
    return ShowBrowserOnOfflineComponent;
}());
export { ShowBrowserOnOfflineComponent };
//# sourceMappingURL=show-browseronoffline.component.js.map