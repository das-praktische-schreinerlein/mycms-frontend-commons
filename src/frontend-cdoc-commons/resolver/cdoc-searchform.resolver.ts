import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {ResolvedData, ResolverError} from '../../angular-commons/resolver/resolver.utils';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {GenericSearchFormConverter} from '@dps/mycms-commons/dist/search-commons/services/generic-searchform.converter';

export abstract class CommonDocSearchFormResolver<F extends CommonDocSearchForm> implements Resolve<ResolvedData<F>> {
    static ERROR_INVALID_SEARCHFORM = 'ERROR_INVALID_SEARCHFORM';

    constructor(private appService: GenericAppService, private searchFormConverter: GenericSearchFormConverter<F>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<F>> {
        const result: ResolvedData<F> = {
            route: route,
            state: state
        };

        return new Promise<ResolvedData<F>>((resolve) => {
            const searchForm = this.searchFormConverter.newSearchForm({});
            this.appService.getAppState().subscribe(appState => {
                if (appState === AppState.Ready) {
                    this.searchFormConverter.paramsToSearchForm(route.params, route.data['searchFormDefaults'],
                        searchForm, route.queryParams);
                    if (!this.searchFormConverter.isValid(searchForm)) {
                        result.error = new ResolverError(CommonDocSearchFormResolver.ERROR_INVALID_SEARCHFORM, searchForm,
                            undefined);
                        return resolve(result);
                    }

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
