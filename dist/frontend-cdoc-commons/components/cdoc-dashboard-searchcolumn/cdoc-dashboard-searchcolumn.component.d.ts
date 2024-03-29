import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
import { PageUtils } from '../../../angular-commons/services/page.utils';
import { CommonDocInlineSearchpageComponent } from '../../../frontend-cdoc-commons/components/cdoc-inline-searchpage/cdoc-inline-searchpage.component';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocActionTagService } from '../../../frontend-cdoc-commons/services/cdoc-actiontag.service';
import { CommonDocSearchFormUtils } from '../../../frontend-cdoc-commons/services/cdoc-searchform-utils.service';
import { GenericSearchFormConverter } from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';
import { CommonDocRoutingService } from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
export declare abstract class CommonDocDashboardSearchColumnComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends CommonDocInlineSearchpageComponent<R, F, S, D> {
    protected actionService: CommonDocActionTagService<R, F, S, D>;
    baseSearchUrl?: string;
    constructor(appService: GenericAppService, commonRoutingService: CommonRoutingService, cdocDataService: D, searchFormConverter: GenericSearchFormConverter<F>, cdocRoutingService: CommonDocRoutingService, toastr: ToastrService, cd: ChangeDetectorRef, elRef: ElementRef, pageUtils: PageUtils, searchFormUtils: SearchFormUtils, cdocSearchFormUtils: CommonDocSearchFormUtils, actionService: CommonDocActionTagService<R, F, S, D>);
}
