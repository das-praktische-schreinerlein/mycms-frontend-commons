import { SimpleChange } from '@angular/core';
export declare class ComponentUtils {
    static hasNgChanged(changes: {
        [propKey: string]: SimpleChange;
    }): boolean;
}
