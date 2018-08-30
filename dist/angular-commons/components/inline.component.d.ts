import { ChangeDetectorRef, OnChanges, SimpleChange } from '@angular/core';
export declare abstract class AbstractInlineComponent implements OnChanges {
    protected cd: ChangeDetectorRef;
    constructor(cd: ChangeDetectorRef);
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    protected abstract updateData(): void;
}
