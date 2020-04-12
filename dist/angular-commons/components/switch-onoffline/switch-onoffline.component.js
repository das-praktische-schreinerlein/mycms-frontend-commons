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
import { AppOnlineState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { FormBuilder } from '@angular/forms';
var SwitchOnOfflineComponent = /** @class */ (function () {
    function SwitchOnOfflineComponent(formBuilder, appService) {
        this.formBuilder = formBuilder;
        this.appService = appService;
    }
    SwitchOnOfflineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onlineStateForm = this.formBuilder.group({
            'onlineState': 'online'
        });
        this.appService.getAppOnlineState().subscribe(function (appOnlineState) {
            if (appOnlineState === AppOnlineState.Offline) {
                _this.onlineStateForm.patchValue({ onlineState: 'offline' });
            }
            else if (appOnlineState === AppOnlineState.Online) {
                _this.onlineStateForm.patchValue({ onlineState: 'online' });
            }
        });
    };
    SwitchOnOfflineComponent.prototype.onSwitchOffline = function () {
        this.appService.doSwitchToOfflineVersion();
    };
    SwitchOnOfflineComponent.prototype.onSwitchOnline = function () {
        this.appService.doSwitchToOnlineVersion();
    };
    SwitchOnOfflineComponent = __decorate([
        Component({
            selector: 'app-switch-onoffline',
            templateUrl: './switch-onoffline.component.html',
            styleUrls: ['./switch-onoffline.component.css']
        }),
        Injectable(),
        __metadata("design:paramtypes", [FormBuilder, GenericAppService])
    ], SwitchOnOfflineComponent);
    return SwitchOnOfflineComponent;
}());
export { SwitchOnOfflineComponent };
//# sourceMappingURL=switch-onoffline.component.js.map