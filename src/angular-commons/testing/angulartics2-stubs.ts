import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class Angulartics2Stub {
    pageTrack = new ReplaySubject<any>();
    virtualPageviews(bla: boolean) {};
}
