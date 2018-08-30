import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
export declare class SectionsBaseUrlResolver implements Resolve<ResolvedData<string>> {
    static ERROR_INVALID_SECTION_ID: string;
    idValidationRule: IdValidationRule;
    constructor();
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<string>>;
}
