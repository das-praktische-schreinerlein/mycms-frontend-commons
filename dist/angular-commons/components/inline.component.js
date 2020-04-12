import { ComponentUtils } from '../services/component.utils';
var AbstractInlineComponent = /** @class */ (function () {
    function AbstractInlineComponent(cd) {
        this.cd = cd;
    }
    AbstractInlineComponent.prototype.ngOnChanges = function (changes) {
        if (ComponentUtils.hasNgChanged(changes)) {
            this.updateData();
        }
    };
    return AbstractInlineComponent;
}());
export { AbstractInlineComponent };
//# sourceMappingURL=inline.component.js.map