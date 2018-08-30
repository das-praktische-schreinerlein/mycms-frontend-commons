"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdoc_record_1 = require("@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record");
var platform_browser_1 = require("@angular/platform-browser");
var pdoc_list_component_1 = require("../pdoc-list/pdoc-list.component");
var PDocListItemComponent = /** @class */ (function () {
    function PDocListItemComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.show = new core_1.EventEmitter();
    }
    PDocListItemComponent.prototype.submitShow = function (pdoc) {
        this.show.emit(pdoc);
        return false;
    };
    PDocListItemComponent.prototype.getShowUrl = function (record) {
        return this.sanitizer.bypassSecurityTrustUrl('sections/' + record.id);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", pdoc_record_1.PDocRecord)
    ], PDocListItemComponent.prototype, "record", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PDocListItemComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PDocListItemComponent.prototype, "show", void 0);
    PDocListItemComponent = __decorate([
        core_1.Component({
            selector: 'app-pdoc-list-item',
            templateUrl: './pdoc-list-item.component.html',
            styleUrls: ['./pdoc-list-item.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], PDocListItemComponent);
    return PDocListItemComponent;
}());
exports.PDocListItemComponent = PDocListItemComponent;
//# sourceMappingURL=pdoc-list-item.component.js.map