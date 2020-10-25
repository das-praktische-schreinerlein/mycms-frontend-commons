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
var CommonDocAudioplayerComponent = /** @class */ (function (_super) {
    __extends(CommonDocAudioplayerComponent, _super);
    function CommonDocAudioplayerComponent(contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.maxWidth = 600;
        _this.maxHeight = 800;
        _this.maxFullWidth = 1200;
        _this.maxFullHeight = 1200;
        _this.flgIsPlaying = false;
        _this.listItem = {
            currentRecord: undefined,
            styleClassFor: undefined,
            thumbnailUrl: undefined,
            previewUrl: undefined,
            fullUrl: undefined,
            audio: undefined,
            image: undefined,
            video: undefined,
            urlShow: undefined
        };
        _this.playerIdPrefix = 'player';
        _this.autoplay = false;
        _this.playerStarted = new EventEmitter();
        _this.playerStopped = new EventEmitter();
        _this.show = new EventEmitter();
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocAudioplayerComponent.prototype.submitShow = function (cdoc) {
        this.show.emit(cdoc);
        return false;
    };
    CommonDocAudioplayerComponent.prototype.onPlayerStarted = function () {
        this.startPlaying();
        this.flgIsPlaying = true;
        this.playerStarted.emit(this.record);
    };
    CommonDocAudioplayerComponent.prototype.onPlayerEnded = function () {
        this.flgIsPlaying = false;
        this.playerStopped.emit(this.record);
    };
    CommonDocAudioplayerComponent.prototype.onPlayerPaused = function () {
        this.flgIsPlaying = false;
    };
    CommonDocAudioplayerComponent.prototype.updateData = function () {
        if (window) {
            this.maxWidth = Math.min(600, window.innerWidth - 100);
            this.maxHeight = Math.min(800, window.innerHeight - 80);
            this.maxFullWidth = Math.min(1200, window.innerWidth - 50);
            this.maxFullHeight = Math.min(1200, window.innerHeight - 80);
        }
        this.contentUtils.updateItemData(this.listItem, this.record, 'default');
        this.playerId = this.playerIdPrefix + '_' + this.listItem.currentRecord.id;
        this.cd.markForCheck();
        this.startAutoPlayPlayer();
    };
    CommonDocAudioplayerComponent.prototype.startPlaying = function () {
        var audios = document.querySelectorAll('audio');
        for (var i = 0; i < audios.length; i++) {
            var audio = audios[i];
            if (audio.getAttribute('mediaid') !== this.playerId) {
                audio.pause();
            }
        }
    };
    CommonDocAudioplayerComponent.prototype.startAutoPlayPlayer = function () {
        if (this.autoplay) {
            var audios = document.querySelectorAll('audio');
            for (var i = 0; i < audios.length; i++) {
                var audio = audios[i];
                if (audio.getAttribute('mediaid') === this.playerId) {
                    audio.play();
                }
            }
        }
    };
    __decorate([
        ViewChild('audioPlayer'),
        __metadata("design:type", Object)
    ], CommonDocAudioplayerComponent.prototype, "audioplayer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CommonDocRecord)
    ], CommonDocAudioplayerComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CommonDocAudioplayerComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocAudioplayerComponent.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocAudioplayerComponent.prototype, "playerIdPrefix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CommonDocAudioplayerComponent.prototype, "autoplay", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocAudioplayerComponent.prototype, "playerStarted", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocAudioplayerComponent.prototype, "playerStopped", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocAudioplayerComponent.prototype, "show", void 0);
    CommonDocAudioplayerComponent = __decorate([
        Component({
            selector: 'app-cdoc-audioplayer',
            templateUrl: './cdoc-audioplayer.component.html',
            styleUrls: ['./cdoc-audioplayer.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [CommonDocContentUtils, ChangeDetectorRef])
    ], CommonDocAudioplayerComponent);
    return CommonDocAudioplayerComponent;
}(AbstractInlineComponent));
export { CommonDocAudioplayerComponent };
//# sourceMappingURL=cdoc-audioplayer.component.js.map