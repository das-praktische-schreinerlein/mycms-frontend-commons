import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {CommonDocRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';

@Component({
    selector: 'app-cdoc-changelog',
    templateUrl: './cdoc-changelog.component.html',
    styleUrls: ['./cdoc-changelog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocChangelogComponent extends AbstractInlineComponent {
    @Input()
    public record: CommonDocRecordType;

    @Input()
    public small ? = false;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
    }
}
