import { SuggesterService } from '../../../frontend-cdoc-commons/services/suggester.service';
import { CommonDocListSuggesterEnvironment } from '../../../frontend-cdoc-commons/services/cdoc-list-suggester.service';
import { PDocPageDescSuggesterService } from './pdoc-page-desc-suggester.service';
export declare class PDocDescSuggesterService implements SuggesterService {
    protected pageSuggesterService: PDocPageDescSuggesterService;
    constructor(pageSuggesterService: PDocPageDescSuggesterService);
    suggest(form: {}, environment: CommonDocListSuggesterEnvironment): Promise<string>;
}
