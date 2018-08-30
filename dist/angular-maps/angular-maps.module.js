"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var leaflet_map_component_1 = require("./components/leaflet-map/leaflet-map.component");
var visjs_profilemap_component_1 = require("./components/visjs-profilemap/visjs-profilemap.component");
var AngularMapsModule = /** @class */ (function () {
    function AngularMapsModule() {
    }
    AngularMapsModule = __decorate([
        core_1.NgModule({
            declarations: [
                leaflet_map_component_1.LeafletMapComponent,
                visjs_profilemap_component_1.VisJsProfileMapComponent
            ],
            imports: [
                ng_bootstrap_1.NgbModule,
                http_1.HttpModule
            ],
            providers: [],
            exports: [
                leaflet_map_component_1.LeafletMapComponent,
                visjs_profilemap_component_1.VisJsProfileMapComponent
            ]
        })
    ], AngularMapsModule);
    return AngularMapsModule;
}());
exports.AngularMapsModule = AngularMapsModule;
//# sourceMappingURL=angular-maps.module.js.map