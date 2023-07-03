import { ChangeDetectorRef } from '@angular/core';
import { CommonDocSimpleSearchNavigationComponent } from '../../../../frontend-cdoc-commons/components/cdoc-simple-search-navigation/cdoc-simple-search-navigation.component';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
export declare class PDocSimpleSearchNavigationComponent extends CommonDocSimpleSearchNavigationComponent {
    baseSearchUrl?: string;
    constructor(cdocRoutingService: PDocRoutingService, cd: ChangeDetectorRef);
}
