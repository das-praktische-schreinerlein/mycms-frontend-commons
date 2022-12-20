import { GeoParser } from './geo.parser';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { CommonGeoLoader } from '@dps/mycms-commons/dist/geo-commons/services/geo.loader';
export declare class GeoLoader extends CommonGeoLoader {
    constructor(http: MinimalHttpBackendClient, parser: GeoParser);
}
