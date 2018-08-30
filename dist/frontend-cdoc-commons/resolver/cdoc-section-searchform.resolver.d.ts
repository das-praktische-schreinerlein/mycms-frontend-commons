import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { GenericSearchFormSearchFormConverter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
export declare abstract class CommonSectionSearchFormResolver<F extends CommonDocSearchForm> implements Resolve<ResolvedData<F>> {
    private appService;
    private searchFormConverter;
    static ERROR_INVALID_SEARCHFORM_SECTION_ID: string;
    static ERROR_INVALID_SEARCHFORM: string;
    idValidationRule: IdValidationRule;
    constructor(appService: GenericAppService, searchFormConverter: GenericSearchFormSearchFormConverter<F>);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<F>>;
}
