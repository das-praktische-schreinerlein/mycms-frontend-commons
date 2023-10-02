import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { AbstractMapComponent } from '../abstract-map.component';
import { MapElement } from '../../services/leaflet-geo.plugin';
import { VisJsGeoProfileMap } from '../../services/visjs-geoprofilemap.plugin';
import { GeoElement } from '../../services/geo.parser';
import { DataSet } from 'vis/dist/vis-graph3d.min';
export interface ChartElement extends MapElement {
}
export declare class VisJsProfileDistanceChart extends VisJsGeoProfileMap {
    convertGeoElementsToDataSet(geoElements: GeoElement[], element: any, options: any): DataSet<any>;
}
export declare class VisJsProfileTimeChart extends VisJsGeoProfileMap {
    convertGeoElementsToDataSet(geoElements: GeoElement[], element: any, options: any): DataSet<any>;
}
export declare class VisJsProfileChartComponent extends AbstractMapComponent {
    flgGenerateNameFromGpx?: boolean;
    flagTimeChart?: boolean;
    constructor(http: MinimalHttpBackendClient);
    protected renderMap(): void;
}
