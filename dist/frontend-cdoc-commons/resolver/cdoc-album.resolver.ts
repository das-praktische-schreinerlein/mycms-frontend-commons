import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocAlbumService} from '../services/cdoc-album.service';
import {ResolvedData, ResolverError} from '../../angular-commons/resolver/resolver.utils';
import {
    IdCsvValidationRule,
    IdValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {LogUtils} from '@dps/mycms-commons/dist/commons/utils/log.utils';

export class CommonDocAlbumResolver <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> implements Resolve<ResolvedData<F>> {
    static ERROR_INVALID_DOC_ID = 'ERROR_INVALID_DOC_ID';
    idValidationRule = new IdValidationRule(true);
    idCsvValidationRule = new IdCsvValidationRule(false);

    constructor(protected appService: GenericAppService, protected cdocAlbumService: CommonDocAlbumService,
        private dataService: D) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<F>> {
        const result: ResolvedData<F> = {
            route: route,
            state: state
        };

        return new Promise<ResolvedData<F>>((resolve) => {
            this.appService.getAppState().subscribe(appState => {
                if (appState === AppState.Ready) {
                    const albumKey = route.params['album'];
                    if (!this.idValidationRule.isValid(albumKey)) {
                        console.warn('warning no id for album:', LogUtils.sanitizeLogMsg(albumKey));
                        result.error = new ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, albumKey, undefined);
                        return resolve(result);
                    }

                    let ids = this.cdocAlbumService.getDocIds(albumKey).join(',');
                    if (ids === undefined || ids.length === 0) {
                        ids = route.params['ids'] || '';
                    }

                    if (!this.idCsvValidationRule.isValid(ids)) {
                        console.warn('warning no ids for cdoc:', LogUtils.sanitizeLogMsg(ids));
                        result.error = new ResolverError(CommonDocAlbumResolver.ERROR_INVALID_DOC_ID, ids, undefined);
                        return resolve(result);
                    }

                    const perPage = route.params['perPage'];
                    const pageNum = route.params['pageNum'];
                    const sort = route.params['sort'];

                    ids = this.idCsvValidationRule.sanitize(ids);
                    const searchForm = this.dataService.createSanitizedSearchForm( {
                        moreFilter: 'id:' + ids,
                        sort: sort,
                        perPage: perPage,
                        pageNum: pageNum});
                    result.data = searchForm;
                    return resolve(result);
                } else if (appState === AppState.Failed) {
                    result.error = new ResolverError(GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    }
}
