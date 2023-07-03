import { PDocSearchFormConverter } from '../services/pdoc-searchform-converter.service';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocSearchFormResolver } from '../../../frontend-cdoc-commons/resolver/cdoc-searchform.resolver';
export declare class PDocSearchFormResolver extends CommonDocSearchFormResolver<PDocSearchForm> {
    constructor(appService: GenericAppService, searchFormConverter: PDocSearchFormConverter);
}
