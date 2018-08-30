"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_utils_1 = require("../services/component.utils");
var AbstractInlineComponent = /** @class */ (function () {
    function AbstractInlineComponent(cd) {
        this.cd = cd;
    }
    AbstractInlineComponent.prototype.ngOnChanges = function (changes) {
        if (component_utils_1.ComponentUtils.hasNgChanged(changes)) {
            this.updateData();
        }
    };
    return AbstractInlineComponent;
}());
exports.AbstractInlineComponent = AbstractInlineComponent;
//# sourceMappingURL=inline.component.js.map