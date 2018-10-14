import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BackendHttpResponse, BackendRequestOptionsArgs, MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {Injectable} from '@angular/core';
import {isArray} from 'util';

@Injectable()
export class SimpleAngularBackendHttpClient extends MinimalHttpBackendClient {
    public static fixRequestOption(requestConfig: any): void {
        // prevent angular from mapping '+' in params  to ' '
        if (requestConfig.method === 'get' && requestConfig.params !== undefined) {
            const params = [];
            for (const paramName in <{}>requestConfig.params) {
                const value = requestConfig.params[paramName];
                if (isArray(value)) {
                    for (const singleValue of value)  {
                        params.push(encodeURIComponent(paramName) + '=' + encodeURIComponent(singleValue));
                    }
                } else {
                    params.push(encodeURIComponent(paramName) + '=' + encodeURIComponent(value.toString()));
                }
            }

            if (params.length > 0) {
                if (requestConfig.url.indexOf('?') < 0) {
                    requestConfig.url += '?';
                } else if (!requestConfig.url.endsWith('&')) {
                    requestConfig.url += '&';
                }

                requestConfig.url += params.join('&');
                requestConfig.params = undefined;
            }
        }
    }

    constructor(private http: HttpClient) {
        super();
    }

    makeHttpRequest(httpConfig: BackendRequestOptionsArgs): Promise<BackendHttpResponse> {
        const requestConfig  = {
            method: httpConfig.method.toLowerCase(),
            url: httpConfig.url,
            body: httpConfig.data,
            params: httpConfig.params,
            headers: new HttpHeaders(),
            withCredentials: true
        };
        requestConfig['observe'] = 'response';

        SimpleAngularBackendHttpClient.fixRequestOption(requestConfig);

        let result;
        let request = this.http.request(requestConfig.method, requestConfig.url, requestConfig);
        result = request.map((res: HttpResponse<any>) => {
            // console.log('response makeHttpRequest:' + httpConfig.url, res);
            const contentType = res.headers.get('content-type');
            return {
                headers: <any>res.headers,
                method: httpConfig.method,
                data: contentType && contentType.indexOf('application/json') !== -1 ? res.body : undefined,
                text: function () { return res.body; },
                json: function () { return contentType && contentType.indexOf('application/json') !== -1 ? res.body : undefined; },
                status: res.status,
                statusMsg: res.statusText
            } as BackendHttpResponse;
        });

        return result.toPromise();
    }
}
