import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {BaseObjectDetectionImageObjectRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/baseobjectdetectionimageobject-record';

@Component({
    selector: 'app-cdoc-odobjectrectangles',
    templateUrl: './cdoc-odobjectrectangles.component.html',
    styleUrls: ['./cdoc-odobjectrectangles.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocODObjectRectanglesComponent extends AbstractInlineComponent {

    @Input()
    public width: number;

    @Input()
    public objects: BaseObjectDetectionImageObjectRecordType[];

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
    }
}
