import { EventEmitter } from '@angular/core';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export declare class CommonDocListFooterComponent {
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    pageChange: EventEmitter<number>;
    constructor();
    onPageChange(page: number): void;
}
