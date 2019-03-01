import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {BaseObjectDetectionImageObjectRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/baseobjectdetectionimageobject-record';

@Component({
    selector: 'app-cdoc-odobjectdetails',
    templateUrl: './cdoc-odobjectdetails.component.html',
    styleUrls: ['./cdoc-odobjectdetails.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocODObjectDetailsComponent extends AbstractInlineComponent {

    @Input()
    public objects: BaseObjectDetectionImageObjectRecordType[];

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
    }
}
