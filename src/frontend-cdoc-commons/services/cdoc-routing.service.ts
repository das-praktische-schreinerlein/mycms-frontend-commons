import {Injectable} from '@angular/core';
import {CommonRoutingService} from '../../angular-commons/services/common-routing.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {StringUtils} from '@dps/mycms-commons/dist/commons/utils/string.utils';

@Injectable()
export class CommonDocRoutingService {
    protected lastSearchUrl = '/cdoc/search/';
    protected lastSearchUrlPredecessor: string = undefined;
    protected lastSearchUrlSuccessor: string = undefined;
    protected lastBaseUrl = '/cdoc/';

    constructor(protected commonRoutingService: CommonRoutingService) {
    }

    setLastSearchUrl(lastSearchUrl: string): void {
        this.lastSearchUrl = lastSearchUrl;
    }

    getLastSearchUrl(): string {
        return this.lastSearchUrl;
    }

    getLastSearchUrlPredecessor(): string {
        return this.lastSearchUrlPredecessor;
    }

    setLastSearchUrlPredecessor(value: string) {
        this.lastSearchUrlPredecessor = value;
    }

    getLastSearchUrlSuccessor(): string {
        return this.lastSearchUrlSuccessor;
    }

    setLastSearchUrlSuccessor(value: string) {
        this.lastSearchUrlSuccessor = value;
    }

    setLastBaseUrl(lastBaseUrl: string): void {
        this.lastBaseUrl = lastBaseUrl;
    }

    getLastBaseUrl(): string {
        return this.lastBaseUrl;
    }

    getShowUrl(cdoc: CommonDocRecord, from: string): string {
        const name = StringUtils.generateTechnicalName(cdoc.name ? cdoc.name : 'name');
        return this.lastBaseUrl + 'show/' + name + '/' + cdoc.id; // + (from ? '?from=' + from : '');
    }

    navigateBackToSearch(suffix?: string): Promise<boolean> {
        return this.commonRoutingService.navigateByUrl(this.getLastSearchUrl() + (suffix ? suffix : ''));
    }

    navigateToSearchPredecessor(suffix?: string): Promise<boolean> {
        return this.commonRoutingService.navigateByUrl(this.getLastSearchUrlPredecessor() + (suffix ? suffix : ''));
    }

    navigateToSearchSuccessor(suffix?: string): Promise<boolean> {
        return this.commonRoutingService.navigateByUrl(this.getLastSearchUrlSuccessor() + (suffix ? suffix : ''));
    }

    navigateToShow(cdoc: CommonDocRecord, from: string): Promise<boolean> {
        return this.commonRoutingService.navigateByUrl(this.getShowUrl(cdoc, from));
    }
}
