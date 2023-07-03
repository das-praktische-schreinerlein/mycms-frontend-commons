import { CommonDocRoutingService } from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { ToastrService } from 'ngx-toastr';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
export declare class PDocRoutingService extends CommonDocRoutingService {
    protected commonRoutingService: CommonRoutingService;
    protected pDocDataService: PDocDataService;
    protected toastr: ToastrService;
    constructor(commonRoutingService: CommonRoutingService, pDocDataService: PDocDataService, toastr: ToastrService);
    navigateToShow(cdoc: CommonDocRecord, from: string): Promise<boolean>;
}
