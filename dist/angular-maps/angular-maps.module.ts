import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LeafletMapComponent} from './components/leaflet-map/leaflet-map.component';
import {VisJsProfileMapComponent} from './components/visjs-profilemap/visjs-profilemap.component';

@NgModule({
    declarations: [
        LeafletMapComponent,
        VisJsProfileMapComponent
    ],
    imports: [
        NgbModule,
        HttpClientModule
    ],
    providers: [
    ],
    exports: [
        LeafletMapComponent,
        VisJsProfileMapComponent
    ]
})
export class AngularMapsModule {}
