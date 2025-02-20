import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Layout, LayoutService } from '../../../../angular-commons/services/layout.service';
import { CommonDocListItemComponent } from '../../../../frontend-cdoc-commons/components/cdoc-list-item/cdoc-list-item.component';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { PDocRoutingService } from '../../services/pdoc-routing.service';
export declare class PDocListItemComponent extends CommonDocListItemComponent {
    private sanitizer;
    private cdocRoutingService;
    record: PDocRecord;
    layout: Layout;
    show: EventEmitter<PDocRecord>;
    constructor(contentUtils: PDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService, sanitizer: DomSanitizer, cdocRoutingService: PDocRoutingService);
    submitShow(pdoc: PDocRecord): boolean;
    getShowUrl(info: PDocRecord): SafeUrl;
    private getUrl;
    getDesc(): string;
}
