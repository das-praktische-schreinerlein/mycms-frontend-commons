import { EventEmitter } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Layout } from '../pdoc-list/pdoc-list.component';
export declare class PDocListItemFlatComponent {
    private sanitizer;
    record: PDocRecord;
    layout: Layout;
    show: EventEmitter<PDocRecord>;
    constructor(sanitizer: DomSanitizer);
    submitShow(pdoc: PDocRecord): boolean;
    getShowUrl(record: PDocRecord): SafeUrl;
}
