import { CommonRoutingService } from '../../angular-commons/services/common-routing.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export declare class CommonDocRoutingService {
    protected commonRoutingService: CommonRoutingService;
    protected lastSearchUrl: string;
    protected lastSearchUrlPredecessor: string;
    protected lastSearchUrlSuccessor: string;
    protected lastBaseUrl: string;
    constructor(commonRoutingService: CommonRoutingService);
    setLastSearchUrl(lastSearchUrl: string): void;
    getLastSearchUrl(): string;
    getLastSearchUrlPredecessor(): string;
    setLastSearchUrlPredecessor(value: string): void;
    getLastSearchUrlSuccessor(): string;
    setLastSearchUrlSuccessor(value: string): void;
    setLastBaseUrl(lastBaseUrl: string): void;
    getLastBaseUrl(): string;
    getShowUrl(cdoc: CommonDocRecord, from: string): string;
    navigateBackToSearch(suffix?: string): Promise<boolean>;
    navigateToSearchPredecessor(suffix?: string): Promise<boolean>;
    navigateToSearchSuccessor(suffix?: string): Promise<boolean>;
    navigateToShow(cdoc: CommonDocRecord, from: string): Promise<boolean>;
}
