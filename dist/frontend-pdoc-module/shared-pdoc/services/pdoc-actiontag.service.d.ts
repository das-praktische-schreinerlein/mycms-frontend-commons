import { Router } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocActionTagService, CommonDocActionTagServiceConfig } from '../../../frontend-cdoc-commons/services/cdoc-actiontag.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { ToastrService } from 'ngx-toastr';
import { PDocAlbumService } from './pdoc-album.service';
export declare class PDocActionTagService extends CommonDocActionTagService<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    protected toastr: ToastrService;
    constructor(router: Router, cdocDataService: PDocDataService, albumService: PDocAlbumService, appService: GenericAppService, toastr: ToastrService);
    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig;
}
