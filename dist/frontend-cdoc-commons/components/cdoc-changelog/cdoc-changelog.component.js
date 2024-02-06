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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocChangelogComponent = /** @class */ (function (_super) {
    __extends(CommonDocChangelogComponent, _super);
    function CommonDocChangelogComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.small = false;
        return _this;
    }
    CommonDocChangelogComponent.prototype.updateData = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocChangelogComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocChangelogComponent.prototype, "small", void 0);
    CommonDocChangelogComponent = __decorate([
        Component({
            selector: 'app-cdoc-changelog',
            templateUrl: './cdoc-changelog.component.html',
            styleUrls: ['./cdoc-changelog.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], CommonDocChangelogComponent);
    return CommonDocChangelogComponent;
}(AbstractInlineComponent));
export { CommonDocChangelogComponent };
//# sourceMappingURL=cdoc-changelog.component.js.map