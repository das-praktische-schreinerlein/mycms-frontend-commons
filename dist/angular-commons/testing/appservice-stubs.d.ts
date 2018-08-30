import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export declare class AppServiceStub extends GenericAppService {
    mockedAppStateObservable: ReplaySubject<AppState>;
    initApp(): void;
    getAppState(): Subject<AppState>;
    getAppConfig(): {};
    doSwitchToOfflineVersion(): void;
    doSwitchToOnlineVersion(): void;
}
