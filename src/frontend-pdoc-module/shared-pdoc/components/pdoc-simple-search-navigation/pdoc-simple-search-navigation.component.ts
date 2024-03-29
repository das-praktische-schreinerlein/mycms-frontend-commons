import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {CommonDocSimpleSearchNavigationComponent} from '../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component';
import {PDocRoutingService} from '../../services/pdoc-routing.service';

@Component({
    selector: 'app-pdoc-simple-search-navigation',
    templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component.html',
    styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocSimpleSearchNavigationComponent extends CommonDocSimpleSearchNavigationComponent {

    @Input()
    public baseSearchUrl? = 'pdoc/';

    constructor(cdocRoutingService: PDocRoutingService, cd: ChangeDetectorRef) {
        super(cdocRoutingService, cd);
    }
}
