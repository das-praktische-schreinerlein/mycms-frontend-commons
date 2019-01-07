import {Injectable} from '@angular/core';
import {CommonRoutingService} from '../../angular-commons/services/common-routing.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {StringUtils} from "@dps/mycms-commons/dist/commons/utils/string.utils";

@Injectable()
export class CommonDocRoutingService {
    protected lastSearchUrl = '/cdoc/search/';
    protected lastBaseUrl = '/cdoc/';

    constructor(protected commonRoutingService: CommonRoutingService) {
    }

    setLastSearchUrl(lastSearchUrl: string): void {
        this.lastSearchUrl = lastSearchUrl;
    }

    getLastSearchUrl(): string {
        return this.lastSearchUrl;
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

    navigateToShow(cdoc: CommonDocRecord, from: string): Promise<boolean> {
        return this.commonRoutingService.navigateByUrl(this.getShowUrl(cdoc, from));
    }
}
