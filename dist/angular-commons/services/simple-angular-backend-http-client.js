"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var minimal_http_backend_client_1 = require("@dps/mycms-commons/dist/commons/services/minimal-http-backend-client");
var core_1 = require("@angular/core");
var util_1 = require("util");
var SimpleAngularBackendHttpClient = /** @class */ (function (_super) {
    __extends(SimpleAngularBackendHttpClient, _super);
    function SimpleAngularBackendHttpClient(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    SimpleAngularBackendHttpClient_1 = SimpleAngularBackendHttpClient;
    SimpleAngularBackendHttpClient.fixRequestOption = function (requestConfig) {
        // prevent angular from mapping '+' in params  to ' '
        if (requestConfig.method === 'get' && requestConfig.params !== undefined) {
            var params = [];
            for (var paramName in requestConfig.params) {
                var value = requestConfig.params[paramName];
                if (util_1.isArray(value)) {
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var singleValue = value_1[_i];
                        params.push(encodeURIComponent(paramName) + '=' + encodeURIComponent(singleValue));
                    }
                }
                else {
                    params.push(encodeURIComponent(paramName) + '=' + encodeURIComponent(value.toString()));
                }
            }
            if (params.length > 0) {
                if (requestConfig.url.indexOf('?') < 0) {
                    requestConfig.url += '?';
                }
                else if (!requestConfig.url.endsWith('&')) {
                    requestConfig.url += '&';
                }
                requestConfig.url += params.join('&');
                requestConfig.params = undefined;
            }
        }
    };
    SimpleAngularBackendHttpClient.createBackendHttpResponse = function (requestConfig, res) {
        var contentType = res.headers.get('content-type');
        var jsonObj = undefined;
        var text = res.body;
        if (res.body) {
            if (typeof res.body !== 'string') {
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    text = JSON.stringify(res.body);
                    jsonObj = res.body;
                }
                else {
                    text = res.body.toString();
                }
            }
            else {
                text = res.body;
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    jsonObj = JSON.parse(res.body);
                }
            }
        }
        return {
            headers: res.headers,
            method: requestConfig['method'],
            data: jsonObj,
            text: function () { return text; },
            json: function () { return jsonObj; },
            status: res.status,
            statusMsg: res.statusText
        };
    };
    SimpleAngularBackendHttpClient.prototype.makeHttpRequest = function (httpConfig) {
        var requestConfig = {
            method: httpConfig.method.toLowerCase(),
            url: httpConfig.url,
            body: httpConfig.data,
            params: httpConfig.params,
            headers: new http_1.HttpHeaders(),
            withCredentials: true
        };
        requestConfig['observe'] = 'response';
        SimpleAngularBackendHttpClient_1.fixRequestOption(requestConfig);
        var result;
        var request = this.http.request(requestConfig.method, requestConfig.url, requestConfig);
        result = request.map(function (res) {
            // console.log('response makeHttpRequest:' + httpConfig.url, res);
            return SimpleAngularBackendHttpClient_1.createBackendHttpResponse(requestConfig, res);
        });
        return result.toPromise();
    };
    SimpleAngularBackendHttpClient = SimpleAngularBackendHttpClient_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SimpleAngularBackendHttpClient);
    return SimpleAngularBackendHttpClient;
    var SimpleAngularBackendHttpClient_1;
}(minimal_http_backend_client_1.MinimalHttpBackendClient));
exports.SimpleAngularBackendHttpClient = SimpleAngularBackendHttpClient;
//# sourceMappingURL=simple-angular-backend-http-client.js.map