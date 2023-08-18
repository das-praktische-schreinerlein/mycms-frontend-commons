import {Injectable} from '@angular/core';
import {AngularHtmlService} from './angular-html.service';

@Injectable()
export class SimpleAngularHtmlService extends AngularHtmlService {
    constructor() {
        super([]);
    }

}
