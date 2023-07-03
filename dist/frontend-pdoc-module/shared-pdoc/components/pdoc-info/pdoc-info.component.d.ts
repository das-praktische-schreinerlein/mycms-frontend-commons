import { ChangeDetectorRef } from '@angular/core';
import { AbstractInlineComponent } from '../../../../angular-commons/components/inline.component';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
export declare class PdocInfoComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    langkeys: any[];
    profiles: any[];
    flags: any[];
    record: PDocRecord;
    small?: boolean;
    constructor(cd: ChangeDetectorRef);
    protected updateData(): void;
}
