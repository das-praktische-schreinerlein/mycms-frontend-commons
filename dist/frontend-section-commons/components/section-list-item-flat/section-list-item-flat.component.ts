import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Layout} from '../section-list/section-list.component';

@Component({
    selector: 'app-section-list-item-flat',
    templateUrl: './section-list-item-flat.component.html',
    styleUrls: ['./section-list-item-flat.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionListItemFlatComponent {
    @Input()
    public record: PDocRecord;

    @Input()
    public layout: Layout;

    @Output()
    public show: EventEmitter<PDocRecord> = new EventEmitter();

    constructor(private sanitizer: DomSanitizer) {
    }

    public submitShow(pdoc: PDocRecord) {
        this.show.emit(pdoc);
        return false;
    }

    public getShowUrl(record: PDocRecord): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl('sections/' + record.id);
    }

}
