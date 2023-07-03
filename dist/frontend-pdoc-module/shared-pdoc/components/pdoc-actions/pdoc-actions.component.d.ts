import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { PDocDynamicComponentService } from '../../services/pdoc-dynamic-components.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDocActionsComponent } from '../../../../frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocActionTagService } from '../../services/pdoc-actiontag.service';
export declare class PDocActionsComponent extends CommonDocActionsComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    protected dynamicComponentService: PDocDynamicComponentService;
    protected toastr: ToastrService;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected actionTagService: PDocActionTagService;
    constructor(dynamicComponentService: PDocDynamicComponentService, toastr: ToastrService, cd: ChangeDetectorRef, appService: GenericAppService, actionTagService: PDocActionTagService);
}
