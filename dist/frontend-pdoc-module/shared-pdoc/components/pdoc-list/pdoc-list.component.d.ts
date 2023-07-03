import { ChangeDetectorRef } from '@angular/core';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonDocListComponent } from '../../../../frontend-cdoc-commons/components/cdoc-list/cdoc-list.component';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { PDocSearchFormConverter } from '../../services/pdoc-searchform-converter.service';
import { Layout } from '../../../../angular-commons/services/layout.service';
export declare class PDocListComponent extends CommonDocListComponent<PDocRecord, PDocSearchForm, PDocSearchResult> {
    private searchFormConverter;
    protected cd: ChangeDetectorRef;
    Layout: typeof Layout;
    constructor(searchFormConverter: PDocSearchFormConverter, cd: ChangeDetectorRef);
    getBackToSearchUrl(searchResult: PDocSearchResult): string;
    protected updateData(): void;
}
