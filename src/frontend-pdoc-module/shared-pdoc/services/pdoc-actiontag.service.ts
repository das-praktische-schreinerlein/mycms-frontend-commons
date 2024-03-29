import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {
    CommonDocActionTagService,
    CommonDocActionTagServiceConfig
} from '../../../frontend-cdoc-commons/services/cdoc-actiontag.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {PDocSearchForm} from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import {PDocSearchResult} from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import {ToastrService} from 'ngx-toastr';
import {PDocAlbumService} from './pdoc-album.service';

@Injectable()
export class PDocActionTagService extends CommonDocActionTagService<PDocRecord, PDocSearchForm, PDocSearchResult,
    PDocDataService> {
    constructor(router: Router, cdocDataService: PDocDataService,
               albumService: PDocAlbumService,
               appService: GenericAppService,
                protected toastr: ToastrService) {
        super(router, cdocDataService, undefined, undefined, appService);
        this.configureComponent({});
    }

    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig {
        return {
            baseEditPath: 'pdocadmin'
        };
    }

}
