import { ChangeDetectorRef } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BaseObjectDetectionImageObjectRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/baseobjectdetectionimageobject-record';
export declare class CommonDocODObjectDetailsComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    objects: BaseObjectDetectionImageObjectRecordType[];
    constructor(cd: ChangeDetectorRef);
    protected updateData(): void;
}
