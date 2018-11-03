"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepEqual = require("deep-equal");
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
                if (from !== undefined && from !== null && to !== undefined && to !== null && from.id !== to.id) {
                    return true;
                }
                if (!deepEqual(from, to)) {
                    // console.log(`${propName} changed from ${from} to ${to}`);
                    return true;
                }
            }
        }
        return false;
    };
    return ComponentUtils;
}());
exports.ComponentUtils = ComponentUtils;
//# sourceMappingURL=component.utils.js.map