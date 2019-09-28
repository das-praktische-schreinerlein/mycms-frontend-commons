import { HttpClient, HttpResponse } from '@angular/common/http';
import { BackendHttpResponse, BackendRequestOptionsArgs, MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
export declare class SimpleAngularBackendHttpClient extends MinimalHttpBackendClient {
    protected http: HttpClient;
    static fixRequestOption(requestConfig: any): void;
    static createBackendHttpResponse(requestConfig: {}, res: HttpResponse<any>): BackendHttpResponse;
    static doClientRequest(http: HttpClient, httpConfig: BackendRequestOptionsArgs, headers?: {}): Promise<BackendHttpResponse>;
    constructor(http: HttpClient);
    makeHttpRequest(httpConfig: BackendRequestOptionsArgs): Promise<BackendHttpResponse>;
}
