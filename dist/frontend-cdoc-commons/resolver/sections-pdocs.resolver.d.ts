import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
export declare class SectionsPDocsResolver implements Resolve<ResolvedData<PDocRecord[]>> {
    private appService;
    private dataService;
    static ERROR_READING_SECTIONS: string;
    constructor(appService: GenericAppService, dataService: PDocDataService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<PDocRecord[]>>;
}
