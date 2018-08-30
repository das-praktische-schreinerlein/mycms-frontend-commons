import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocAlbumService } from '../services/cdoc-album.service';
import { ResolvedData } from '../../angular-commons/resolver/resolver.utils';
import { IdCsvValidationRule, IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export declare class CommonDocAlbumResolver<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> implements Resolve<ResolvedData<F>> {
    protected appService: GenericAppService;
    protected cdocAlbumService: CommonDocAlbumService;
    private dataService;
    static ERROR_INVALID_DOC_ID: string;
    idValidationRule: IdValidationRule;
    idCsvValidationRule: IdCsvValidationRule;
    constructor(appService: GenericAppService, cdocAlbumService: CommonDocAlbumService, dataService: D);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<F>>;
}
