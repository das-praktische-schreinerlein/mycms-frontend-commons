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
var platform_browser_1 = require("@angular/platform-browser");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var cdoc_routing_service_1 = require("./cdoc-routing.service");
var filter_utils_1 = require("@dps/mycms-commons/dist/commons/utils/filter.utils");
var KeywordsState;
(function (KeywordsState) {
    KeywordsState[KeywordsState["SET"] = 0] = "SET";
    KeywordsState[KeywordsState["NOTSET"] = 1] = "NOTSET";
    KeywordsState[KeywordsState["SUGGESTED"] = 2] = "SUGGESTED";
})(KeywordsState = exports.KeywordsState || (exports.KeywordsState = {}));
var CommonDocContentUtils = /** @class */ (function () {
    function CommonDocContentUtils(sanitizer, cdocRoutingService, appService) {
        this.sanitizer = sanitizer;
        this.cdocRoutingService = cdocRoutingService;
        this.appService = appService;
        this.cdocRecordRefIdField = 'cdoc_id';
        this.cdocAudiosKey = 'cdocaudios';
        this.cdocImagesKey = 'cdocimages';
        this.cdocVideosKey = 'cdocvideos';
        this.configureService();
    }
    CommonDocContentUtils.prototype.getImages = function (cdocRecord) {
        return cdocRecord[this.cdocImagesKey];
    };
    CommonDocContentUtils.prototype.getVideos = function (cdocRecord) {
        return cdocRecord[this.cdocVideosKey];
    };
    CommonDocContentUtils.prototype.getAudios = function (cdocRecord) {
        return cdocRecord[this.cdocAudiosKey];
    };
    CommonDocContentUtils.prototype.getPreferredFullMediaUrl = function (record) {
        var videos = this.getVideos(record);
        if (videos && videos.length > 0) {
            return this.getVideoUrl(videos[0], 'x600');
        }
        var audios = this.getAudios(record);
        if (audios && audios.length > 0) {
            return this.getAudioUrl(audios[0], 'x600');
        }
        var images = this.getImages(record);
        if (images && images.length > 0) {
            return this.getImageUrl(images[0], 'x600');
        }
        return undefined;
    };
    CommonDocContentUtils.prototype.getThumbnail = function (image) {
        return this.getImageUrl(image, 'x100');
    };
    CommonDocContentUtils.prototype.getVideoThumbnail = function (video) {
        return this.getVideoUrl(video, 'screenshot', '.jpg');
    };
    CommonDocContentUtils.prototype.getAudioThumbnail = function (audio) {
        return this.getAudioUrl(audio, 'thumbnail', '');
    };
    CommonDocContentUtils.prototype.getThumbnailUrl = function (image) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getThumbnail(image));
    };
    CommonDocContentUtils.prototype.getVideoThumbnailUrl = function (video) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoThumbnail(video));
    };
    CommonDocContentUtils.prototype.getAudioThumbnailUrl = function (audio) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getAudioThumbnail(audio));
    };
    CommonDocContentUtils.prototype.getPreview = function (image) {
        return this.getImageUrl(image, 'x600');
    };
    CommonDocContentUtils.prototype.getVideoPreview = function (video) {
        return this.getVideoUrl(video, 'thumbnail', '.gif.mp4');
    };
    CommonDocContentUtils.prototype.getAudioPreview = function (audio) {
        return this.getAudioUrl(audio, 'thumbnail', '');
    };
    CommonDocContentUtils.prototype.getPreviewUrl = function (image) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getPreview(image));
    };
    CommonDocContentUtils.prototype.getVideoPreviewUrl = function (video) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoPreview(video));
    };
    CommonDocContentUtils.prototype.getAudioPreviewUrl = function (audio) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getAudioPreview(audio));
    };
    CommonDocContentUtils.prototype.getFullUrl = function (image) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getImageUrl(image, 'x600'));
    };
    CommonDocContentUtils.prototype.getFullVideoUrl = function (video) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoUrl(video, 'x600'));
    };
    CommonDocContentUtils.prototype.getFullAudioUrl = function (audio) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.getAudioUrl(audio, 'x600'));
    };
    CommonDocContentUtils.prototype.getImageUrl = function (image, resolution) {
        if (image === undefined) {
            return 'not found';
        }
        if (this.appService.getAppConfig()['useAssetStoreUrls'] === true) {
            return this.appService.getAppConfig()['picsBaseUrl'] + resolution + '/' + image[this.cdocRecordRefIdField];
        }
        else {
            return this.appService.getAppConfig()['picsBaseUrl'] + 'pics_' + resolution + '/' + image.fileName;
        }
    };
    CommonDocContentUtils.prototype.getVideoUrl = function (video, resolution, suffix) {
        if (video === undefined) {
            return 'not found';
        }
        if (this.appService.getAppConfig()['useVideoAssetStoreUrls'] === true) {
            return this.appService.getAppConfig()['videoBaseUrl'] + resolution + '/' + video[this.cdocRecordRefIdField];
        }
        else {
            return this.appService.getAppConfig()['videoBaseUrl'] + 'video_' + resolution + '/' + video.fileName + (suffix ? suffix : '');
        }
    };
    CommonDocContentUtils.prototype.getAudioUrl = function (audio, resolution, suffix) {
        if (audio === undefined) {
            return 'not found';
        }
        if (this.appService.getAppConfig()['useAudioAssetStoreUrls'] === true) {
            return this.appService.getAppConfig()['audioBaseUrl'] + resolution + '/' + audio[this.cdocRecordRefIdField];
        }
        else {
            return this.appService.getAppConfig()['audioBaseUrl'] + audio.fileName + (suffix ? suffix : '');
        }
    };
    CommonDocContentUtils.prototype.getSuggestedKeywords = function (suggestionConfigs, prefix, values) {
        var suggestions = [];
        for (var _i = 0, suggestionConfigs_1 = suggestionConfigs; _i < suggestionConfigs_1.length; _i++) {
            var suggestionConfig = suggestionConfigs_1[_i];
            if (filter_utils_1.FilterUtils.checkFilters(suggestionConfig.filters, values)) {
                suggestions = suggestions.concat(suggestionConfig.keywords);
            }
        }
        if (prefix !== undefined && prefix.length > 0) {
            for (var i = 0; i < suggestions.length; i++) {
                suggestions[i] = prefix + suggestions[i];
            }
        }
        return suggestions;
    };
    CommonDocContentUtils.prototype.getStructuredKeywords = function (config, keywords, blacklist, possiblePrefixes) {
        var keywordKats = [];
        if (keywords === undefined || keywords.length < 1) {
            return keywordKats;
        }
        for (var _i = 0, blacklist_1 = blacklist; _i < blacklist_1.length; _i++) {
            var keyword = blacklist_1[_i];
            if (keywords.indexOf(keyword) > -1) {
                // TODO remove
            }
        }
        for (var _a = 0, config_1 = config; _a < config_1.length; _a++) {
            var keywordKat = config_1[_a];
            var keywordFound = [];
            for (var _b = 0, _c = keywordKat.keywords; _b < _c.length; _b++) {
                var keyword = _c[_b];
                for (var _d = 0, _e = (possiblePrefixes || []); _d < _e.length; _d++) {
                    var prefix = _e[_d];
                    var searchPrefix = prefix + keyword;
                    if (keywords.indexOf(searchPrefix) > -1) {
                        keywordFound.push(keyword);
                        break;
                    }
                }
            }
            if (keywordFound.length > 0) {
                keywordKats.push({ name: keywordKat.name, keywords: keywordFound });
            }
        }
        return keywordKats;
    };
    CommonDocContentUtils.prototype.getStructuredKeywordsState = function (config, keywords, suggested, possiblePrefixes) {
        var keywordKats = [];
        if (keywords === undefined || keywords.length < 1) {
            keywords = [];
        }
        for (var _i = 0, config_2 = config; _i < config_2.length; _i++) {
            var keywordKat = config_2[_i];
            var keywordFound = [];
            for (var _a = 0, _b = keywordKat.keywords; _a < _b.length; _a++) {
                var keyword = _b[_a];
                var found = false;
                for (var _c = 0, _d = (possiblePrefixes || []); _c < _d.length; _c++) {
                    var prefix = _d[_c];
                    var searchPrefix = prefix + keyword;
                    if (keywords.indexOf(searchPrefix) > -1) {
                        keywordFound.push({ keyword: keyword, state: KeywordsState.SET });
                        found = true;
                        break;
                    }
                    else if (suggested.indexOf(searchPrefix) > -1) {
                        found = true;
                        keywordFound.push({ keyword: keyword, state: KeywordsState.SUGGESTED });
                        break;
                    }
                }
                if (!found) {
                    keywordFound.push({ keyword: keyword, state: KeywordsState.NOTSET });
                }
            }
            keywordKats.push({ name: keywordKat.name, keywords: keywordFound });
        }
        return keywordKats;
    };
    CommonDocContentUtils.prototype.calcRate = function (rate, max) {
        return Math.round((rate / 15 * max) + 0.5);
    };
    CommonDocContentUtils.prototype.getShowUrl = function (record) {
        return this.sanitizer.bypassSecurityTrustUrl(this.cdocRoutingService.getShowUrl(record, ''));
    };
    CommonDocContentUtils.prototype.updateItemData = function (itemData, record, layout) {
        itemData.audio = undefined;
        itemData.image = undefined;
        itemData.video = undefined;
        itemData.thumbnailUrl = undefined;
        itemData.previewUrl = undefined;
        itemData.fullUrl = undefined;
        if (record === undefined) {
            itemData.currentRecord = undefined;
            itemData.styleClassFor = undefined;
            itemData.urlShow = undefined;
            return false;
        }
        itemData.currentRecord = record;
        itemData.urlShow = this.getShowUrl(itemData.currentRecord);
        if (itemData.currentRecord[this.cdocAudiosKey] !== undefined && itemData.currentRecord[this.cdocAudiosKey].length > 0) {
            itemData.audio = itemData.currentRecord[this.cdocAudiosKey][0];
            itemData.thumbnailUrl = this.getAudioThumbnailUrl(itemData.audio);
            itemData.previewUrl = this.getAudioPreviewUrl(itemData.audio);
            itemData.fullUrl = this.getFullAudioUrl(itemData.audio);
        }
        else if (itemData.currentRecord[this.cdocImagesKey] !== undefined && itemData.currentRecord[this.cdocImagesKey].length > 0) {
            itemData.image = itemData.currentRecord[this.cdocImagesKey][0];
            itemData.thumbnailUrl = this.getThumbnailUrl(itemData.image);
            itemData.previewUrl = this.getPreviewUrl(itemData.image);
            itemData.fullUrl = this.getFullUrl(itemData.image);
        }
        else if (itemData.currentRecord[this.cdocVideosKey] !== undefined && itemData.currentRecord[this.cdocVideosKey].length > 0) {
            itemData.video = itemData.currentRecord[this.cdocVideosKey][0];
            itemData.thumbnailUrl = this.getVideoThumbnailUrl(itemData.video);
            itemData.previewUrl = this.getVideoPreviewUrl(itemData.video);
            itemData.fullUrl = this.getFullVideoUrl(itemData.video);
        }
    };
    CommonDocContentUtils.prototype.getServiceConfig = function () {
        return {
            cdocRecordRefIdField: 'cdoc_id',
            cdocAudiosKey: 'cdocaudios',
            cdocImagesKey: 'cdocimages',
            cdocVideosKey: 'cdocvideos'
        };
    };
    CommonDocContentUtils.prototype.configureService = function () {
        var serviceConfig = this.getServiceConfig();
        this.cdocRecordRefIdField = serviceConfig.cdocRecordRefIdField;
        this.cdocAudiosKey = serviceConfig.cdocAudiosKey;
        this.cdocImagesKey = serviceConfig.cdocImagesKey;
        this.cdocVideosKey = serviceConfig.cdocVideosKey;
    };
    CommonDocContentUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, cdoc_routing_service_1.CommonDocRoutingService,
            generic_app_service_1.GenericAppService])
    ], CommonDocContentUtils);
    return CommonDocContentUtils;
}());
exports.CommonDocContentUtils = CommonDocContentUtils;
//# sourceMappingURL=cdoc-contentutils.service.js.map