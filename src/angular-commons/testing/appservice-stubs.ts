import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';

@Injectable()
export class AppServiceStub extends GenericAppService {
    mockedAppStateObservable = new ReplaySubject<AppState>();

    initApp(): void {
    }

    getAppState(): Subject<AppState> {
        this.mockedAppStateObservable.next(AppState.Ready);
        return this.mockedAppStateObservable;
    }
    getAppConfig(): {} {
        return {};
    }
    doSwitchToOfflineVersion(): void {}
    doSwitchToOnlineVersion(): void {}
}
