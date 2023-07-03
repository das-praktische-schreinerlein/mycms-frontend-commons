import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { PDocListItemComponent } from '../pdoc-list-item/pdoc-list-item.component';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
export declare class PDocListItemFlatComponent extends PDocListItemComponent {
    constructor(contentUtils: PDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService, sanitizer: DomSanitizer, cdocRoutingService: PDocRoutingService);
}
