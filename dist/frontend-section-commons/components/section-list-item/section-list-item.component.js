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
var SectionListItemComponent = /** @class */ (function () {
    function SectionListItemComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.show = new EventEmitter();
    }
    SectionListItemComponent.prototype.submitShow = function (pdoc) {
        this.show.emit(pdoc);
        return false;
    };
    SectionListItemComponent.prototype.getShowUrl = function (record) {
        return this.sanitizer.bypassSecurityTrustUrl('sections/' + record.id);
    };
    __decorate([
        Input(),
        __metadata("design:type", PDocRecord)
    ], SectionListItemComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SectionListItemComponent.prototype, "layout", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SectionListItemComponent.prototype, "show", void 0);
    SectionListItemComponent = __decorate([
        Component({
            selector: 'app-section-list-item',
            templateUrl: './section-list-item.component.html',
            styleUrls: ['./section-list-item.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SectionListItemComponent);
    return SectionListItemComponent;
}());
export { SectionListItemComponent };
//# sourceMappingURL=section-list-item.component.js.map