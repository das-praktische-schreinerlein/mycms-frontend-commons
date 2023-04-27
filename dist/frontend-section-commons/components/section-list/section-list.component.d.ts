import { EventEmitter } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
export declare enum Layout {
    FLAT = 0,
    SMALL = 1,
    BIG = 2
}
export declare class SectionListComponent {
    records: PDocRecord[];
    layout: Layout;
    show: EventEmitter<PDocRecord>;
    Layout: typeof Layout;
    constructor();
    onShow(record: PDocRecord): boolean;
}
