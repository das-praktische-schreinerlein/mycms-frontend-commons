import { ChangeDetectorRef } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export declare class CommonDocChangelogComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    record: CommonDocRecordType;
    small?: boolean;
    constructor(cd: ChangeDetectorRef);
    protected updateData(): void;
}
