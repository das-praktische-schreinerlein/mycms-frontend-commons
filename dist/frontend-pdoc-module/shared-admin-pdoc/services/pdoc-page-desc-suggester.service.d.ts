import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonDocListSuggesterConfiguration, CommonDocListSuggesterEnvironment, CommonDocListSuggesterService } from '../../../frontend-cdoc-commons/services/cdoc-list-suggester.service';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export declare class PDocPageDescSuggesterService extends CommonDocListSuggesterService<PDocRecord, PDocSearchForm, PDocSearchResult> {
    protected pDocDataService: PDocDataService;
    protected appService: GenericAppService;
    constructor(pDocDataService: PDocDataService, appService: GenericAppService);
    protected appendFiltersToListItemSearchForm(searchForm: PDocSearchForm, form: {}, environment: CommonDocListSuggesterEnvironment): void;
    protected getConfiguration(environment: CommonDocListSuggesterEnvironment): CommonDocListSuggesterConfiguration;
}
