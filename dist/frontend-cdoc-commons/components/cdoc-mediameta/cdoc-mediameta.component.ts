import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {BaseMediaMetaRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/basemediameta-record';

@Component({
    selector: 'app-cdoc-mediameta',
    templateUrl: './cdoc-mediameta.component.html',
    styleUrls: ['./cdoc-mediameta.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocMediaMetaComponent extends AbstractInlineComponent {
    json = JSON;

    @Input()
    public record: BaseMediaMetaRecordType;

    @Input()
    public small ? = false;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
    }
}
