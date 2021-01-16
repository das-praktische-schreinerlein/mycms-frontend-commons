import { PipeTransform } from '@angular/core';
export declare class DurationPipe implements PipeTransform {
    transform(start: Date, end: Date, factor: number, prefix: string, suffix: string): string;
    private transformDate;
}
