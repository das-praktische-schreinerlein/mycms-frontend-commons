import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export declare class CommonDocAlbumService {
    protected CACHE_KEY: string;
    protected albumCache: {};
    protected idCache: {};
    protected store: any;
    constructor();
    getDocIds(albumKey: string): string[];
    removeDocIds(albumKey: string): void;
    getAlbenByDocIds(cdocId: string): string[];
    initAlbenForDocId(doc: CommonDocRecord): void;
    addIdToAlbum(albumKey: string, docId: string): void;
    removeIdFromAlbum(albumKey: string, docId: string): void;
    removeFromAlbum(albumKey: string, doc: CommonDocRecord): void;
    addToAlbum(albumKey: string, doc: CommonDocRecord): void;
    private initStorage;
    private initCache;
    private saveCache;
}
