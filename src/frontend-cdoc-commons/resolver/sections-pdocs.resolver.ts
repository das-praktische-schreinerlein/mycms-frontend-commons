import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {StaticPagesDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ResolvedData, ResolverError} from '../../angular-commons/resolver/resolver.utils';

@Injectable()
export class SectionsPDocsResolver implements Resolve<ResolvedData<PDocRecord[]>> {
    static ERROR_READING_SECTIONS = 'ERROR_READING_SECTIONS';

    constructor(private appService: GenericAppService, private dataService: StaticPagesDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedData<PDocRecord[]>> {
        const result: ResolvedData<PDocRecord[]> = {
            route: route,
            state: state
        };

        return new Promise<ResolvedData<PDocRecord[]>>((resolve) => {
            this.appService.getAppState().subscribe(appState => {
                if (appState === AppState.Ready) {
                    this.dataService.getAll(undefined).then(
                        function doneGetAll(pdocs: any) {
                            result.data = pdocs;
                            return resolve(result);
                        }).catch(function errorGetAll(reason: any) {
                            console.error('error loading pdocs', reason);
                            result.error = new ResolverError(SectionsPDocsResolver.ERROR_READING_SECTIONS, undefined, reason);
                            return resolve(result);
                        });
                } else if (appState === AppState.Failed) {
                    result.error = new ResolverError(GenericAppService.ERROR_APP_NOT_INITIALIZED, undefined, undefined);
                    return resolve(result);
                }
            });
        });
    }
}
