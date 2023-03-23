var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { CommonAdminResponseResultState } from '@dps/mycms-commons/dist/commons/model/admin-response';
import { FormBuilder } from '@angular/forms';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { PageUtils } from '../../../angular-commons/services/page.utils';
var AdminJobAreaComponent = /** @class */ (function (_super) {
    __extends(AdminJobAreaComponent, _super);
    function AdminJobAreaComponent(appService, toastr, locale, cd, elRef, pageUtils, backendHttpClient, fb) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.toastr = toastr;
        _this.locale = locale;
        _this.cd = cd;
        _this.elRef = elRef;
        _this.pageUtils = pageUtils;
        _this.backendHttpClient = backendHttpClient;
        _this.fb = fb;
        _this.objectKeys = Object.keys;
        _this.arrayIsArray = Array.isArray;
        _this.typeOf = function (blim) { return typeof blim; };
        _this.availableCommands = {};
        _this.commandsStates = {};
        _this.adminResponse = _this.createErrorsResponse('admindata not loaded');
        _this.showLoadingSpinner = false;
        _this.jobsAllowed = false;
        _this.intervalRunning = false;
        _this.interval = undefined;
        _this.intervalTimeout = 5;
        _this.intervalFormGroup = _this.fb.group({
            intervalTimeout: [5]
        });
        return _this;
    }
    AdminJobAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appStateSubscription = this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                _this.configureComponent(_this.appService.getAppConfig());
                return _this.updateData();
            }
        });
    };
    AdminJobAreaComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.clearIntervall();
    };
    AdminJobAreaComponent.prototype.getComponentConfig = function (config) {
        return {
            jobsAllowed: BeanUtils.getValue(config, 'services.adminJobArea.jobsAllowed')
        };
    };
    AdminJobAreaComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.jobsAllowed = componentConfig.jobsAllowed &&
            this.appService.getAppConfig()['permissions']['adminWritable'] &&
            this.appService.getAppConfig()['adminBackendApiBaseUrl'];
    };
    AdminJobAreaComponent.prototype.updateData = function () {
        this.doCheckServerState();
        this.doRunInterval(true);
    };
    AdminJobAreaComponent.prototype.doStartCommand = function (command) {
        if (!this.jobsAllowed) {
            return;
        }
        var me = this;
        me.callAdminBackend('execcommand', { 'preparedCommand': command }).then(function (response) {
            me.availableCommands = response.preparedCommands;
            me.commandsStates = response.commandsStates;
            me.adminResponse = response;
            me.cd.markForCheck();
        }).catch(function onError(reason) {
            me.availableCommands = {};
            me.commandsStates = {};
            me.createErrorsResponse(reason);
            me.cd.markForCheck();
        });
    };
    AdminJobAreaComponent.prototype.doCheckServerState = function () {
        if (!this.jobsAllowed) {
            return;
        }
        var me = this;
        me.callAdminBackend('status', {}).then(function (response) {
            me.availableCommands = response.preparedCommands;
            me.commandsStates = response.commandsStates;
            me.adminResponse = response;
            me.cd.markForCheck();
        }).catch(function onError(reason) {
            me.availableCommands = {};
            me.commandsStates = {};
            me.createErrorsResponse(reason);
            me.cd.markForCheck();
        });
    };
    AdminJobAreaComponent.prototype.onIntervalTimeoutChange = function (event) {
        var timeout = event.target['value'];
        if (timeout >= 1) {
            this.intervalTimeout = timeout;
            this.doRunInterval(false);
            this.doRunInterval(true);
        }
        else {
            console.warn('illegal Interval:' + timeout, event);
        }
        this.cd.markForCheck();
        return false;
    };
    AdminJobAreaComponent.prototype.doRunInterval = function (run) {
        if (!this.jobsAllowed) {
            return false;
        }
        var me = this;
        if (run && !this.intervalRunning && this.interval === undefined) {
            this.interval = setInterval(function (args) {
                me.doCheckServerState();
            }, (me.intervalTimeout ? me.intervalTimeout : 999999) * 60000);
            me.intervalRunning = true;
        }
        else {
            me.clearIntervall();
            me.intervalRunning = false;
        }
        me.doCheckServerState();
        this.cd.markForCheck();
        return false;
    };
    AdminJobAreaComponent.prototype.clearIntervall = function () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    };
    AdminJobAreaComponent.prototype.callAdminBackend = function (endpoint, params) {
        var me = this;
        var options = {
            basePath: this.appService.getAppConfig()['adminBackendApiBaseUrl'] + this.locale + '/',
            http: function (httpConfig) {
                return me.backendHttpClient.makeHttpRequest(httpConfig);
            }
        };
        this.showLoadingSpinner = true;
        return me.backendHttpClient.makeHttpRequest({
            method: 'post',
            url: options.basePath + endpoint,
            data: params,
            withCredentials: true
        }).then(function (res) {
            me.showLoadingSpinner = false;
            var response = res.json();
            return Promise.resolve(response);
        }).catch(function onError(reason) {
            me.showLoadingSpinner = false;
            console.error('loading admindata failed:', reason);
            return Promise.reject(reason);
        });
    };
    AdminJobAreaComponent.prototype.createErrorsResponse = function (reason) {
        return {
            preparedCommands: {},
            resultMsg: reason,
            resultState: CommonAdminResponseResultState.ERROR,
            resultDate: new Date()
        };
    };
    AdminJobAreaComponent = __decorate([
        Component({
            selector: 'app-admin-jobarea',
            templateUrl: './admin-jobarea.component.html',
            styleUrls: ['./admin-jobarea.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(2, Inject(LOCALE_ID)),
        __metadata("design:paramtypes", [GenericAppService, ToastrService, String, ChangeDetectorRef, ElementRef, PageUtils,
            MinimalHttpBackendClient, FormBuilder])
    ], AdminJobAreaComponent);
    return AdminJobAreaComponent;
}(AbstractInlineComponent));
export { AdminJobAreaComponent };
//# sourceMappingURL=admin-jobarea.component.js.map