import {Injectable} from '@angular/core';
import {Angulartics2} from 'angulartics2';

@Injectable()
export abstract class GenericTrackingService {
    constructor(private angulartics2: Angulartics2) {
    }

    public trackPageView() {
        this.angulartics2.pageTrack.next({path: window.location.href});
    }
}
