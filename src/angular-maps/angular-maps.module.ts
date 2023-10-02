import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {LeafletMapComponent} from './components/leaflet-map/leaflet-map.component';
import {VisJsProfileMapComponent} from './components/visjs-profilemap/visjs-profilemap.component';
import {MapDocMapComponent} from './components/mapdoc-map/mapdoc-map.component';
import {MapDocProfileChartComponent} from './components/mapdoc-profilechart/mapdoc-profilechart.component';
import {MapDocProfileMapComponent} from './components/mapdoc-profilemap/mapdoc-profilemap.component';
import {VisJsProfileChartComponent} from './components/visjs-profilechart/visjs-profilechart.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        LeafletMapComponent,
        VisJsProfileMapComponent,
        VisJsProfileChartComponent,
        MapDocMapComponent,
        MapDocProfileChartComponent,
        MapDocProfileMapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
    ],
    exports: [
        LeafletMapComponent,
        VisJsProfileMapComponent,
        VisJsProfileChartComponent,
        MapDocMapComponent,
        MapDocProfileChartComponent,
        MapDocProfileMapComponent
    ]
})
export class AngularMapsModule {}
