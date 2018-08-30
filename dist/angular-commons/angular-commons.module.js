"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var truncate_pipe_1 = require("./pipes/truncate.pipe");
var core_1 = require("@angular/core");
var switch_onoffline_component_1 = require("./components/switch-onoffline/switch-onoffline.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var show_browseronoffline_component_1 = require("./components/show-browseronoffline/show-browseronoffline.component");
var dynamic_component_host_directive_1 = require("./components/directives/dynamic-component-host.directive");
var interval_control_component_1 = require("./components/interval-control/interval-control.component");
var AngularCommonsModule = /** @class */ (function () {
    function AngularCommonsModule() {
    }
    AngularCommonsModule = __decorate([
        core_1.NgModule({
            declarations: [
                truncate_pipe_1.TruncatePipe,
                dynamic_component_host_directive_1.DynamicComponentHostDirective,
                switch_onoffline_component_1.SwitchOnOfflineComponent,
                show_browseronoffline_component_1.ShowBrowserOnOfflineComponent,
                interval_control_component_1.IntervalControlComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            exports: [
                truncate_pipe_1.TruncatePipe,
                dynamic_component_host_directive_1.DynamicComponentHostDirective,
                switch_onoffline_component_1.SwitchOnOfflineComponent,
                show_browseronoffline_component_1.ShowBrowserOnOfflineComponent,
                interval_control_component_1.IntervalControlComponent
            ]
        })
    ], AngularCommonsModule);
    return AngularCommonsModule;
}());
exports.AngularCommonsModule = AngularCommonsModule;
//# sourceMappingURL=angular-commons.module.js.map