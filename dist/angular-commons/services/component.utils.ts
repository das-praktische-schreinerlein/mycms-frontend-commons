import {SimpleChange} from '@angular/core';
import * as deepEqual from 'deep-equal';

export class ComponentUtils {
    public static hasNgChanged(changes: {[propKey: string]: SimpleChange}): boolean {
        for (const propName in changes) {
            const changedProp = changes[propName];
            const to = changedProp.currentValue;
            if (changedProp.isFirstChange()) {
                // console.log(`Initial value of ${propName} set to ${to}`);
                return true;
            } else {
                const from = changedProp.previousValue;
                if (from !== undefined && from !== null &&
                    to !== undefined && to !== null &&
                    from.id !== to.id) {
                    return true;
                }
                if (!deepEqual(from, to, { strict: true })) {
                    // console.log(`${propName} changed from ${from} to ${to}`);
                    return true;
                }

                if (Array.isArray(from)) {
                    if (!Array.isArray(to)) {
                        return true;
                    }

                    if (from.length !== to.length) {
                        return true;
                    }

                    for (let i = 0; i <= from.length; i++) {
                        if (from[i] !== undefined && from[i] !== null &&
                            to[i] !== undefined && to[i] !== null &&
                            from[i].id !== to[i].id) {
                            return true;
                        }

                        if (!deepEqual(from[i], to[i], { strict: true })) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
}
