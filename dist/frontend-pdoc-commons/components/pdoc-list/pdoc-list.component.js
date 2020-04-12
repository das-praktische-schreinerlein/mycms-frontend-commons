var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export var Layout;
(function (Layout) {
    Layout[Layout["FLAT"] = 0] = "FLAT";
    Layout[Layout["SMALL"] = 1] = "SMALL";
    Layout[Layout["BIG"] = 2] = "BIG";
})(Layout || (Layout = {}));
var PDocListComponent = /** @class */ (function () {
    function PDocListComponent() {
        this.show = new EventEmitter();
        this.Layout = Layout;
    }
    PDocListComponent.prototype.onShow = function (record) {
        this.show.emit(record);
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PDocListComponent.prototype, "records", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PDocListComponent.prototype, "layout", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PDocListComponent.prototype, "show", void 0);
    PDocListComponent = __decorate([
        Component({
            selector: 'app-pdoc-list',
            templateUrl: './pdoc-list.component.html',
            styleUrls: ['./pdoc-list.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], PDocListComponent);
    return PDocListComponent;
}());
export { PDocListComponent };
//# sourceMappingURL=pdoc-list.component.js.map