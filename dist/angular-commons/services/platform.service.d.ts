export declare class PlatformService {
    private baseUrl;
    protected platformId: Object;
    constructor(baseUrl: string, platformId: Object);
    getAssetsUrl(url: string): string;
    isClient(): boolean;
}
