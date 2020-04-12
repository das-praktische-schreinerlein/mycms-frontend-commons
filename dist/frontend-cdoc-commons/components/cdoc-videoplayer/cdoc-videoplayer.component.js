var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonDocContentUtils } from '../../services/cdoc-contentutils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
var CommonDocVideoplayerComponent = /** @class */ (function (_super) {
    __extends(CommonDocVideoplayerComponent, _super);
    function CommonDocVideoplayerComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.listItem = {
            currentRecord: undefined,
            styleClassFor: undefined,
            thumbnailUrl: undefined,
            previewUrl: undefined,
            fullUrl: undefined,
            image: undefined,
            video: undefined,
            urlShow: undefined
        };
        _this.maxWidth = 600;
        _this.maxHeight = 800;
        _this.maxFullWidth = 1200;
        _this.maxFullHeight = 1200;
        _this.forceWidth = '';
        _this.showFullScreenVideo = false;
        _this.showPreview = true;
        _this.show = new EventEmitter();
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocVideoplayerComponent.prototype.submitShow = function (cdoc) {
        this.show.emit(cdoc);
        return false;
    };
    CommonDocVideoplayerComponent.prototype.updateData = function () {
        if (window) {
            this.maxWidth = Math.min(600, window.innerWidth - 100);
            this.maxHeight = Math.min(800, window.innerHeight - 80);
            this.maxFullWidth = Math.min(1200, window.innerWidth - 50);
            this.maxFullHeight = Math.min(1200, window.innerHeight - 80);
        }
        this.contentUtils.updateItemData(this.listItem, this.record, 'default');
        this.cd.markForCheck();
    };
    __decorate([
        ViewChild('videoPlayer'),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "videoplayer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CommonDocRecord)
    ], CommonDocVideoplayerComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CommonDocVideoplayerComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "forceWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocVideoplayerComponent.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "showFullScreenVideo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocVideoplayerComponent.prototype, "showPreview", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocVideoplayerComponent.prototype, "show", void 0);
    CommonDocVideoplayerComponent = __decorate([
        Component({
            selector: 'app-cdoc-videoplayer',
            templateUrl: './cdoc-videoplayer.component.html',
            styleUrls: ['./cdoc-videoplayer.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [CommonDocContentUtils, ChangeDetectorRef])
    ], CommonDocVideoplayerComponent);
    return CommonDocVideoplayerComponent;
}(AbstractInlineComponent));
export { CommonDocVideoplayerComponent };
//# sourceMappingURL=cdoc-videoplayer.component.js.map