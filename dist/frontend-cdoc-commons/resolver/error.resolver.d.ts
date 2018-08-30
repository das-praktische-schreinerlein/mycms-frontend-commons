import { ToastsManager } from 'ng2-toastr';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { CommonRoutingService } from '../../angular-commons/services/common-routing.service';
export declare class ErrorResolver {
    private commonRoutingService;
    static ERROR_INVALID_ID: string;
    static ERROR_UNKNOWN_ID: string;
    static ERROR_INVALID_DATA: string;
    static ERROR_WHILE_READING: string;
    static ERROR_APP_NOT_INITIALIZED: string;
    static ERROR_READONLY: string;
    static ERROR_OTHER: string;
    static isResolverError(resolvedData: ResolvedData<any>): boolean;
    constructor(commonRoutingService: CommonRoutingService);
    redirectAfterRouterError(errorCode: string, newUrl: string, toasts: ToastsManager, toastMessage: string): void;
}
