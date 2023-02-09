import * as deepEqual from 'deep-equal';
var ComponentUtils = /** @class */ (function () {
    function ComponentUtils() {
    }
    ComponentUtils.hasNgChanged = function (changes) {
        for (var propName in changes) {
            var changedProp = changes[propName];
            var to = changedProp.currentValue;
            if (changedProp.isFirstChange()) {
                // console.log(`Initial value of ${propName} set to ${to}`);
                return true;
            }
            else {
                var from = changedProp.previousValue;
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
                    for (var i = 0; i <= from.length; i++) {
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
    };
    return ComponentUtils;
}());
export { ComponentUtils };
//# sourceMappingURL=component.utils.js.map