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
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { DomSanitizer } from '@angular/platform-browser';
import { Layout } from '../section-list/section-list.component';
var SectionListItemFlatComponent = /** @class */ (function () {
    function SectionListItemFlatComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.show = new EventEmitter();
    }
    SectionListItemFlatComponent.prototype.submitShow = function (pdoc) {
        this.show.emit(pdoc);
        return false;
    };
    SectionListItemFlatComponent.prototype.getShowUrl = function (record) {
        return this.sanitizer.bypassSecurityTrustUrl('sections/' + record.id);
    };
    __decorate([
        Input(),
        __metadata("design:type", PDocRecord)
    ], SectionListItemFlatComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SectionListItemFlatComponent.prototype, "layout", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SectionListItemFlatComponent.prototype, "show", void 0);
    SectionListItemFlatComponent = __decorate([
        Component({
            selector: 'app-section-list-item-flat',
            templateUrl: './section-list-item-flat.component.html',
            styleUrls: ['./section-list-item-flat.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SectionListItemFlatComponent);
    return SectionListItemFlatComponent;
}());
export { SectionListItemFlatComponent };
//# sourceMappingURL=section-list-item-flat.component.js.map