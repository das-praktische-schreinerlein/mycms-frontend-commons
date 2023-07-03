import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocRecordCreateResolver } from '../../../frontend-cdoc-commons/resolver/cdoc-create.resolver';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResolvedData } from '../../../angular-commons/resolver/resolver.utils';
export declare class PDocRecordCreateResolver extends CommonDocRecordCreateResolver<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    private myAppService;
    constructor(appService: GenericAppService, dataService: PDocDataService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<PDocRecord>>;
    protected configureDefaultFieldToSet(type: string, fields: string[]): void;
    protected copyDefaultFields(type: string, pdoc: PDocRecord, values: {}): void;
    protected setDefaultFields(type: string, values: {}): void;
    protected getNameReplacements(): [RegExp, string][];
    protected getCommonReplacements(configKey: string): [RegExp, string][];
}
