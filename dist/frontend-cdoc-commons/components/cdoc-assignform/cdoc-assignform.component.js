var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericCommonDocAssignFormComponent } from './generic-cdoc-assignform.component';
var CommonDocAssignFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocAssignFormComponent, _super);
    function CommonDocAssignFormComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonDocAssignFormComponent.prototype.createResultObject = function () {
        return {
            action: 'assign',
            ids: this.records.map(function (value) { return value.id; }),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        };
    };
    return CommonDocAssignFormComponent;
}(GenericCommonDocAssignFormComponent));
export { CommonDocAssignFormComponent };
//# sourceMappingURL=cdoc-assignform.component.js.map