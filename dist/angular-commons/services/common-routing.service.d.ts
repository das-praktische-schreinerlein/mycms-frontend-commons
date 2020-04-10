import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { Subject } from 'rxjs/Subject';
export declare enum RoutingState {
    DONE = 1,
    RUNNING = 2
}
export declare class CommonRoutingService {
    private router;
    private routingStateObservable;
    constructor(router: Router);
    getRoutingState(): Subject<RoutingState>;
    setRoutingState(newState: RoutingState): void;
    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean>;
}
