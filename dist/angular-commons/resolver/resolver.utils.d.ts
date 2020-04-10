import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
export interface ResolvedData<S> {
    route: ActivatedRouteSnapshot;
    state: RouterStateSnapshot;
    data?: S;
    error?: ResolverError;
}
export declare class ResolverError {
    private _code;
    private _data;
    private _errorData;
    constructor(code: string, data: any, errorData: any);
    get code(): string;
    get data(): any;
    get errorData(): any;
}
