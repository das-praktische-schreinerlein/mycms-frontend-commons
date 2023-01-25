import { ChangeDetectorRef } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BaseMediaMetaRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/basemediameta-record';
export declare class CommonDocMediaMetaComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    json: JSON;
    record: BaseMediaMetaRecordType;
    small?: boolean;
    constructor(cd: ChangeDetectorRef);
    protected updateData(): void;
}
