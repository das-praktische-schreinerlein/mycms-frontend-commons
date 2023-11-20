import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { GenericSearchFormConverter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
export declare abstract class CommonDocSearchFormResolver<F extends CommonDocSearchForm> implements Resolve<ResolvedData<F>> {
    private appService;
    private searchFormConverter;
    static ERROR_INVALID_SEARCHFORM: string;
    constructor(appService: GenericAppService, searchFormConverter: GenericSearchFormConverter<F>);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<F>>;
}
