import {InjectionToken} from '@angular/core';

export interface CommonEnvironment {
    hideCopyrightFooter?: boolean,
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

export const COMMON_APP_ENVIRONMENT = new InjectionToken<CommonEnvironment>('commonEnvironment');

