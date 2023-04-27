import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';

export enum Layout {
    FLAT,
    SMALL,
    BIG
}

@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionListComponent {
    @Input()
    public records: PDocRecord[];

    @Input()
    public layout: Layout;

    @Output()
    public show: EventEmitter<PDocRecord> = new EventEmitter();

    public Layout = Layout;

    constructor() {
    }

    onShow(record: PDocRecord) {
        this.show.emit(record);
        return false;
    }
}
