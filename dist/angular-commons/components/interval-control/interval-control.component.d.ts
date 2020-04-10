import { ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class IntervalControlComponent implements OnDestroy {
    private cd;
    fb: FormBuilder;
    intervalRunning: boolean;
    interval: any;
    intervalTimeout: number;
    intervalStarted: EventEmitter<any>;
    intervalNext: EventEmitter<any>;
    intervalStopped: EventEmitter<any>;
    intervalFormGroup: FormGroup;
    constructor(cd: ChangeDetectorRef, fb: FormBuilder);
    ngOnDestroy(): void;
    onIntervalTimeoutChange(event: Event): boolean;
    doRunInterval(run: boolean): boolean;
    private clearIntervall;
}
