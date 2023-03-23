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
import { GenericCommonDocAssignFormComponent } from '../cdoc-assignform/generic-cdoc-assignform.component';
var CommonDocAssignJoinFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocAssignJoinFormComponent, _super);
    function CommonDocAssignJoinFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facetNamePrefix = 'label.assignjoin.reference.';
        return _this;
    }
    CommonDocAssignJoinFormComponent.prototype.createResultObject = function () {
        return {
            action: 'assignjoin',
            ids: this.records.map(function (value) { return value.id; }),
            referenceField: this.getCurrentReferenceField(),
            newId: this.newId,
            newIdSetNull: this.newIdNullFlag
        };
    };
    return CommonDocAssignJoinFormComponent;
}(GenericCommonDocAssignFormComponent));
export { CommonDocAssignJoinFormComponent };
//# sourceMappingURL=cdoc-assignjoinform.component.js.map