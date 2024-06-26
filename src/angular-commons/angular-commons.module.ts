import {TruncatePipe} from './pipes/truncate.pipe';
import {NgModule} from '@angular/core';
import {SwitchOnOfflineComponent} from './components/switch-onoffline/switch-onoffline.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ShowBrowserOnOfflineComponent} from './components/show-browseronoffline/show-browseronoffline.component';
import {DynamicComponentHostDirective} from './components/directives/dynamic-component-host.directive';
import {IntervalControlComponent} from './components/interval-control/interval-control.component';
import {DurationPipe} from './pipes/duration.pipe';
import {TextEditorComponent} from './components/text-editor/text-editor.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
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
export class AngularCommonsModule {
}
