import { EventEmitter } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Layout } from '../section-list/section-list.component';
export declare class SectionListItemComponent {
    private sanitizer;
    record: PDocRecord;
    layout: Layout;
    show: EventEmitter<PDocRecord>;
    constructor(sanitizer: DomSanitizer);
    submitShow(pdoc: PDocRecord): boolean;
    getShowUrl(record: PDocRecord): SafeUrl;
}
