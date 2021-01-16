var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { isDate, isNumber, isString } from 'util';
var DurationPipe = /** @class */ (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (start, end, factor, prefix, suffix) {
        start = this.transformDate(start, undefined);
        if (!start) {
            return '';
        }
        end = this.transformDate(end, new Date());
        return prefix + Math.round((end.getTime() - start.getTime()) / factor) + ' ' + suffix;
    };
    DurationPipe.prototype.transformDate = function (date, defaultValue) {
        if (isDate(date)) {
            return date;
        }
        if (isNumber(date)) {
            return new Date(date);
        }
        else if (isString(date)) {
            return new Date(Date.parse(date));
        }
        return defaultValue;
    };
    DurationPipe = __decorate([
        Pipe({
            name: 'duration'
        })
    ], DurationPipe);
    return DurationPipe;
}());
export { DurationPipe };
//# sourceMappingURL=duration.pipe.js.map