import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export declare abstract class CommonDocRecordResolver<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> implements Resolve<ResolvedData<R>> {
    private appService;
    private dataService;
    static ERROR_UNKNOWN_DOC_ID: string;
    static ERROR_INVALID_DOC_ID: string;
    static ERROR_READING_DOC_ID: string;
    idValidationRule: IdValidationRule;
    constructor(appService: GenericAppService, dataService: D);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<R>>;
}
