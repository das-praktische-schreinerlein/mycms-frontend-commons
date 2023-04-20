import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { StaticPagesDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonDocRoutingService } from '../services/cdoc-routing.service';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
export declare class SectionsPDocRecordResolver implements Resolve<ResolvedData<PDocRecord>> {
    private appService;
    private dataService;
    private routingService;
    static ERROR_UNKNOWN_SECTION_ID: string;
    static ERROR_INVALID_SECTION_ID: string;
    static ERROR_READING_SECTION_ID: string;
    idValidationRule: IdValidationRule;
    constructor(appService: GenericAppService, dataService: StaticPagesDataService, routingService: CommonDocRoutingService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<PDocRecord>>;
}
