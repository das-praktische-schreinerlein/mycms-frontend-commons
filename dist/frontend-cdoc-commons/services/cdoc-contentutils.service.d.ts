import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocRoutingService } from './cdoc-routing.service';
import { SimpleFilter } from '@dps/mycms-commons/dist/commons/utils/filter.utils';
import { BaseVideoRecord } from '@dps/mycms-commons/dist/search-commons/model/records/basevideo-record';
import { BaseImageRecord } from '@dps/mycms-commons/dist/search-commons/model/records/baseimage-record';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { BaseAudioRecord } from '@dps/mycms-commons/dist/search-commons/model/records/baseaudio-record';
export declare enum KeywordsState {
    SET = 0,
    NOTSET = 1,
    SUGGESTED = 2
}
export interface StructuredKeyword {
    name: string;
    keywords: string[];
}
export interface StructuredKeywordState {
    name: string;
    keywords: {
        keyword: string;
        state: KeywordsState;
    }[];
}
export interface KeywordSuggestion {
    name: string;
    filters: SimpleFilter[];
    keywords: string[];
}
export interface CommonItemData {
    currentRecord: CommonDocRecord;
    styleClassFor: string[];
    urlShow: SafeUrl;
    audio?: BaseAudioRecord;
    image?: BaseImageRecord;
    video?: BaseVideoRecord;
    thumbnailUrl: SafeUrl;
    previewUrl: SafeUrl;
    fullUrl: SafeUrl;
}
export interface CommonDocContentUtilsConfig {
    cdocRecordRefIdField: string;
    cdocAudiosKey: string;
    cdocImagesKey: string;
    cdocVideosKey: string;
}
export declare class CommonDocContentUtils {
    protected sanitizer: DomSanitizer;
    protected cdocRoutingService: CommonDocRoutingService;
    protected appService: GenericAppService;
    protected cdocRecordRefIdField: string;
    protected cdocAudiosKey: string;
    protected cdocImagesKey: string;
    protected cdocVideosKey: string;
    constructor(sanitizer: DomSanitizer, cdocRoutingService: CommonDocRoutingService, appService: GenericAppService);
    getImages(cdocRecord: CommonDocRecord): BaseImageRecord[];
    getVideos(cdocRecord: CommonDocRecord): BaseVideoRecord[];
    getAudios(cdocRecord: CommonDocRecord): BaseAudioRecord[];
    getPreferredFullMediaUrl(record: CommonDocRecord): string;
    getThumbnail(image: BaseImageRecord): string;
    getVideoThumbnail(video: BaseVideoRecord): string;
    getAudioThumbnail(audio: BaseAudioRecord): string;
    getThumbnailUrl(image: BaseImageRecord): SafeUrl;
    getVideoThumbnailUrl(video: BaseVideoRecord): SafeUrl;
    getAudioThumbnailUrl(audio: BaseAudioRecord): SafeUrl;
    getPreview(image: BaseImageRecord): string;
    getVideoPreview(video: BaseVideoRecord): string;
    getAudioPreview(audio: BaseAudioRecord): string;
    getPreviewUrl(image: BaseImageRecord): SafeUrl;
    getVideoPreviewUrl(video: BaseVideoRecord): SafeUrl;
    getAudioPreviewUrl(audio: BaseAudioRecord): SafeUrl;
    getFullUrl(image: BaseImageRecord): SafeUrl;
    getFullVideoUrl(video: BaseVideoRecord): SafeUrl;
    getFullAudioUrl(audio: BaseAudioRecord): SafeUrl;
    getImageUrl(image: BaseImageRecord, resolution: string): string;
    getVideoUrl(video: BaseVideoRecord, resolution: string, suffix?: string): string;
    getAudioUrl(audio: BaseAudioRecord, resolution: string, suffix?: string): string;
    getSuggestedKeywords(suggestionConfigs: KeywordSuggestion[], prefix: string, values: any): string[];
    getStructuredKeywords(config: StructuredKeyword[], keywords: string[], blacklist: string[], possiblePrefixes: string[]): StructuredKeyword[];
    getStructuredKeywordsState(config: StructuredKeyword[], keywords: string[], suggested: string[], possiblePrefixes: string[]): StructuredKeywordState[];
    getShowUrl(record: CommonDocRecord): SafeUrl;
    updateItemData(itemData: CommonItemData, record: CommonDocRecord, layout: string): boolean;
    protected getServiceConfig(): CommonDocContentUtilsConfig;
    protected configureService(): void;
}
