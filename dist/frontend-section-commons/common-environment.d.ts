export interface CommonEnvironment {
    hideCopyrightFooter?: boolean;
    assetsPathVersionSnippet: string;
    assetsPathVersionSuffix: string;
    production: boolean;
    backendApiBaseUrl: string;
    defaultSearchTypes: string;
    emptyDefaultSearchTypes: string;
    useAssetStoreUrls: boolean;
    allowAutoPlay: boolean;
    cookieLawSeenName: string;
    trackingProviders: any[];
    adminBackendApiBaseUrl?: string;
    adminWritable?: boolean;
}
