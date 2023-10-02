import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {BrowserModule} from '@angular/platform-browser';
import {GpxEditAreaComponent} from './compontents/gpx-editarea/gpx-editarea.component';
import {GpxEditLocComponent} from './compontents/gpx-editloc/gpx-editloc.component';
import {AngularMapsModule} from '../angular-maps/angular-maps.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularCommonsModule} from "../angular-commons/angular-commons.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
    declarations: [
        GpxEditAreaComponent,
        GpxEditLocComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MultiselectDropdownModule,
        TranslateModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FileDropModule,
        AngularCommonsModule,
        AngularMapsModule
    ],
    providers: [
    ],
    exports: [
        GpxEditAreaComponent,
        GpxEditLocComponent
    ]
})
export class AngularMapsAdminModule {}
