var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { CommonDocContentUtils } from './cdoc-contentutils.service';
var CommonDocLightBoxService = /** @class */ (function () {
    function CommonDocLightBoxService(contentUtils, lightbox) {
        this.contentUtils = contentUtils;
        this.lightbox = lightbox;
    }
    CommonDocLightBoxService.prototype.createAlbumConfig = function (searchResult) {
        var lightboxConfig = {
            album: [],
            idPos: {}
        };
        for (var i = 0; i <= searchResult.currentRecords.length; i++) {
            var record = searchResult.currentRecords[i];
            if (this.hasImage(record)) {
                var src = this.contentUtils.getPreview(this.contentUtils.getImages(record)[0]);
                var caption = record.name;
                var thumb = this.contentUtils.getThumbnail(this.contentUtils.getImages(record)[0]);
                var image = {
                    src: src,
                    caption: caption,
                    thumb: thumb,
                    id: record.id
                };
                lightboxConfig.album.push(image);
                lightboxConfig.idPos[record.id] = lightboxConfig.album.length - 1;
            }
        }
        return lightboxConfig;
    };
    CommonDocLightBoxService.prototype.openId = function (config, id) {
        this.openPos(config, config.idPos[id]);
    };
    CommonDocLightBoxService.prototype.openPos = function (config, pos) {
        this.lightbox.open(config.album, pos || 0);
    };
    CommonDocLightBoxService.prototype.hasImage = function (record) {
        return record && record.type === 'IMAGE' && this.contentUtils.getImages(record).length > 0;
    };
    CommonDocLightBoxService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CommonDocContentUtils, Lightbox])
    ], CommonDocLightBoxService);
    return CommonDocLightBoxService;
}());
export { CommonDocLightBoxService };
//# sourceMappingURL=cdoc-lightbox.service.js.map