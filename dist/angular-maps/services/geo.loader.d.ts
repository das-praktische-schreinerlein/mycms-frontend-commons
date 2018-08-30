import { GeoElement, GeoParser } from './geo.parser';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
export declare class GeoLoader {
    private http;
    private parser;
    constructor(http: MinimalHttpBackendClient, parser: GeoParser);
    loadDataFromUrl(url: string, options: any): Promise<GeoElement[]>;
    loadData(src: string, options: any): Promise<GeoElement[]>;
}
