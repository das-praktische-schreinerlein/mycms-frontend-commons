var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var IntervalControlComponent = /** @class */ (function () {
    function IntervalControlComponent(cd, fb) {
        this.cd = cd;
        this.fb = fb;
        this.intervalRunning = false;
        this.interval = undefined;
        this.intervalTimeout = 5;
        this.intervalStarted = new EventEmitter();
        this.intervalNext = new EventEmitter();
        this.intervalStopped = new EventEmitter();
        this.intervalFormGroup = this.fb.group({
            intervalTimeout: [5]
        });
    }
    IntervalControlComponent.prototype.ngOnDestroy = function () {
        this.clearIntervall();
    };
    IntervalControlComponent.prototype.onIntervalTimeoutChange = function (event) {
        var timeout = event.target['value'];
        if (timeout > 1) {
            this.intervalTimeout = timeout;
            this.doRunInterval(false);
            this.doRunInterval(true);
        }
        else {
            console.warn('illegal Interval:' + timeout, event);
        }
        this.cd.markForCheck();
        return false;
    };
    IntervalControlComponent.prototype.doRunInterval = function (run) {
        var me = this;
        if (run && !this.intervalRunning && this.interval === undefined) {
            this.interval = setInterval(function (args) {
                me.intervalNext.emit();
            }, (me.intervalTimeout ? me.intervalTimeout : 999999) * 1000);
            me.intervalRunning = true;
            me.intervalStarted.emit();
        }
        else {
            me.clearIntervall();
            me.intervalRunning = false;
            me.intervalStopped.emit();
        }
        this.cd.markForCheck();
        return false;
    };
    IntervalControlComponent.prototype.clearIntervall = function () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IntervalControlComponent.prototype, "intervalStarted", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IntervalControlComponent.prototype, "intervalNext", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IntervalControlComponent.prototype, "intervalStopped", void 0);
    IntervalControlComponent = __decorate([
        Component({
            selector: 'app-interval-control',
            templateUrl: './interval-control.component.html',
            styleUrls: ['./interval-control.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, FormBuilder])
    ], IntervalControlComponent);
    return IntervalControlComponent;
}());
export { IntervalControlComponent };
//# sourceMappingURL=interval-control.component.js.map