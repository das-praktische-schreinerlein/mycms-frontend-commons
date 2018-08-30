import { Lightbox } from 'angular2-lightbox';
import { CommonDocContentUtils } from './cdoc-contentutils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
export interface CommonDocLightboxAlbumConfig {
    album: any[];
    idPos: {};
}
export declare class CommonDocLightBoxService<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>> {
    protected contentUtils: CommonDocContentUtils;
    protected lightbox: Lightbox;
    constructor(contentUtils: CommonDocContentUtils, lightbox: Lightbox);
    createAlbumConfig(searchResult: S): CommonDocLightboxAlbumConfig;
    openId(config: CommonDocLightboxAlbumConfig, id: any): void;
    openPos(config: CommonDocLightboxAlbumConfig, pos: number): void;
    protected hasImage(record: R): boolean;
}
