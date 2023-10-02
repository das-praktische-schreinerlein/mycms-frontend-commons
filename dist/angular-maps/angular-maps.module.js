var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { VisJsProfileMapComponent } from './components/visjs-profilemap/visjs-profilemap.component';
import { MapDocMapComponent } from './components/mapdoc-map/mapdoc-map.component';
import { MapDocProfileChartComponent } from './components/mapdoc-profilechart/mapdoc-profilechart.component';
import { MapDocProfileMapComponent } from './components/mapdoc-profilemap/mapdoc-profilemap.component';
import { VisJsProfileChartComponent } from './components/visjs-profilechart/visjs-profilechart.component';
import { BrowserModule } from '@angular/platform-browser';
var AngularMapsModule = /** @class */ (function () {
    function AngularMapsModule() {
    }
    AngularMapsModule = __decorate([
        NgModule({
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
            providers: [],
            exports: [
                LeafletMapComponent,
                VisJsProfileMapComponent,
                VisJsProfileChartComponent,
                MapDocMapComponent,
                MapDocProfileChartComponent,
                MapDocProfileMapComponent
            ]
        })
    ], AngularMapsModule);
    return AngularMapsModule;
}());
export { AngularMapsModule };
//# sourceMappingURL=angular-maps.module.js.map