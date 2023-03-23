import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { Subscription } from 'rxjs';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { CommonAdminCommandsListResponseType, CommonAdminCommandStateType, CommonAdminResponseType } from '@dps/mycms-commons/dist/commons/model/admin-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { PageUtils } from '../../../angular-commons/services/page.utils';
export interface AdminJobAreaComponentConfig {
    jobsAllowed: boolean;
}
export declare class AdminJobAreaComponent extends AbstractInlineComponent implements OnInit, OnDestroy {
    protected appService: GenericAppService;
    protected toastr: ToastrService;
    private locale;
    protected cd: ChangeDetectorRef;
    protected elRef: ElementRef;
    protected pageUtils: PageUtils;
    private backendHttpClient;
    fb: FormBuilder;
    protected appStateSubscription: Subscription;
    objectKeys: (o: {}) => string[];
    arrayIsArray: (arg: any) => arg is any[];
    typeOf: (blim: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    availableCommands: {
        [key: string]: CommonAdminCommandsListResponseType;
    };
    commandsStates: {
        [key: string]: CommonAdminCommandStateType;
    };
    adminResponse: CommonAdminResponseType;
    showLoadingSpinner: boolean;
    jobsAllowed: boolean;
    intervalRunning: boolean;
    interval: any;
    intervalTimeout: number;
    intervalFormGroup: FormGroup;
    constructor(appService: GenericAppService, toastr: ToastrService, locale: string, cd: ChangeDetectorRef, elRef: ElementRef, pageUtils: PageUtils, backendHttpClient: MinimalHttpBackendClient, fb: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected getComponentConfig(config: {}): AdminJobAreaComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
    doStartCommand(command: string): void;
    doCheckServerState(): void;
    onIntervalTimeoutChange(event: Event): boolean;
    doRunInterval(run: boolean): boolean;
    private clearIntervall;
    protected callAdminBackend(endpoint: string, params: {}): Promise<CommonAdminResponseType>;
    private createErrorsResponse;
}
