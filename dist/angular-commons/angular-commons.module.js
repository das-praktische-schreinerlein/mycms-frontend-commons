var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgModule } from '@angular/core';
import { SwitchOnOfflineComponent } from './components/switch-onoffline/switch-onoffline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ShowBrowserOnOfflineComponent } from './components/show-browseronoffline/show-browseronoffline.component';
import { DynamicComponentHostDirective } from './components/directives/dynamic-component-host.directive';
import { IntervalControlComponent } from './components/interval-control/interval-control.component';
import { DurationPipe } from './pipes/duration.pipe';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { TranslateModule } from '@ngx-translate/core';
var AngularCommonsModule = /** @class */ (function () {
    function AngularCommonsModule() {
    }
    AngularCommonsModule = __decorate([
        NgModule({
            declarations: [
                TruncatePipe,
                DynamicComponentHostDirective,
                SwitchOnOfflineComponent,
                ShowBrowserOnOfflineComponent,
                IntervalControlComponent,
                DurationPipe,
                TextEditorComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                TranslateModule,
                ReactiveFormsModule
            ],
            exports: [
                TruncatePipe,
                DynamicComponentHostDirective,
                SwitchOnOfflineComponent,
                ShowBrowserOnOfflineComponent,
                IntervalControlComponent,
                DurationPipe,
                TextEditorComponent
            ]
        })
    ], AngularCommonsModule);
    return AngularCommonsModule;
}());
export { AngularCommonsModule };
//# sourceMappingURL=angular-commons.module.js.map