import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { StaticPagesDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
export declare class SectionsPDocsResolver implements Resolve<ResolvedData<PDocRecord[]>> {
    private appService;
    private dataService;
    static ERROR_READING_SECTIONS: string;
    constructor(appService: GenericAppService, dataService: StaticPagesDataService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<PDocRecord[]>>;
}
