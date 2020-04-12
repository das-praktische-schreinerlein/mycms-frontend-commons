import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {
    BackendHttpResponse,
    BackendRequestOptionsArgs,
    MinimalHttpBackendClient
} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
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
                    for (const singleValue of value) {
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

    public static createBackendHttpResponse(requestConfig: {}, res: HttpResponse<any>): BackendHttpResponse {
        const contentType = res.headers.get('content-type');
        let jsonObj = undefined;
        let text = res.body;
        if (res.body) {
            if (typeof res.body !== 'string') {
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    text = JSON.stringify(res.body);
                    jsonObj = res.body;
                } else {
                    text = res.body.toString();
                }
            } else {
                text = res.body;
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    jsonObj = JSON.parse(res.body);
                }
            }
        }

        return {
            headers: <any>res.headers,
            method: requestConfig['method'],
            data: jsonObj,
            text: function () {
                return text;
            },
            json: function () {
                return jsonObj;
            },
            status: res.status,
            statusMsg: res.statusText
        } as BackendHttpResponse;
    }

    public static doClientRequest(http: HttpClient, httpConfig: BackendRequestOptionsArgs, headers?: {}):
        Promise<BackendHttpResponse> {
        let httpHeaders: HttpHeaders = new HttpHeaders();
        if (headers) {
            for (const key in headers) {
                if (headers[key]) {
                    httpHeaders = httpHeaders.append(key, headers[key]);
                }
            }
        }

        const requestConfig = {
            method: httpConfig.method.toLowerCase(),
            url: httpConfig.url,
            body: httpConfig.data,
            params: httpConfig.params,
            headers: httpHeaders,
            withCredentials: true
        };
        requestConfig['observe'] = 'response';
        if (httpConfig['responseType']) {
            requestConfig['responseType'] = httpConfig['responseType'];
        }

        SimpleAngularBackendHttpClient.fixRequestOption(requestConfig);

        // console.log('makeHttpRequest:', requestConfig);
        let result;
        const request = http.request(requestConfig.method, requestConfig.url, requestConfig);
        result = request.pipe(map((res: HttpResponse<any>) => {
            // console.log('response makeHttpRequest:' + httpConfig.url, res);
            return SimpleAngularBackendHttpClient.createBackendHttpResponse(requestConfig, res);
        }));

        return result.toPromise();
    }

    constructor(protected http: HttpClient) {
        super();
    }

    makeHttpRequest(httpConfig: BackendRequestOptionsArgs): Promise<BackendHttpResponse> {
        return SimpleAngularBackendHttpClient.doClientRequest(this.http, httpConfig, undefined);
    }

}
