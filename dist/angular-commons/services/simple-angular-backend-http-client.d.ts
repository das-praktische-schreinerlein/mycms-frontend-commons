import { Http, RequestOptionsArgs } from '@angular/http';
import { BackendHttpResponse, BackendRequestOptionsArgs, MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
export declare class SimpleAngularBackendHttpClient extends MinimalHttpBackendClient {
    private http;
    static fixRequestOption(requestConfig: RequestOptionsArgs): void;
    constructor(http: Http);
    makeHttpRequest(httpConfig: BackendRequestOptionsArgs): Promise<BackendHttpResponse>;
}
