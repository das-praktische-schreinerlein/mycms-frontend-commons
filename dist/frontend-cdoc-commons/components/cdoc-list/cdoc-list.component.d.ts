import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Layout } from '../../../angular-commons/services/layout.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocListComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>> extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    searchResult: S;
    baseSearchUrl: string;
    layout: Layout;
    short?: boolean;
    show: EventEmitter<R>;
    Layout: typeof Layout;
    constructor(cd: ChangeDetectorRef);
    onShow(record: R): boolean;
    getBackToSearchUrl(searchResult: S): string;
    protected updateData(): void;
}
