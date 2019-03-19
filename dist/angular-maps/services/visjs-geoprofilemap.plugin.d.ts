import { DataSet, Graph3d } from 'vis';
import { GeoLoader } from './geo.loader';
import { GeoElement } from './geo.parser';
export declare class VisJsGeoProfileMapPoint {
    x: string;
    y: number;
    z: string;
    style: string;
    id: string;
    constructor(values: any);
}
export interface VisJsGeoProfileMapDataSource {
    geoLoader: GeoLoader;
    url?: string;
    src?: string;
}
export declare class VisJsGeoProfileMapStyles {
    static styles: {
        fill: string;
        stroke: string;
        border: string;
    }[];
}
export declare class VisJsGeoProfileMap {
    private dataSources;
    private element;
    private options;
    graph: Graph3d;
    constructor(dataSources: VisJsGeoProfileMapDataSource[], element: any, options: {});
    _initialize(): void;
    _addData(dataSources: VisJsGeoProfileMapDataSource[], element: any, options: any): Promise<void>;
    _convertGeoElementsToDataSet(geoElements: GeoElement[], element: any, options: any): DataSet<any>;
}
