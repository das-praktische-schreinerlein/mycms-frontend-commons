import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AbstractInlineComponent } from '../../../../angular-commons/components/inline.component';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonDocMultiActionManager } from '../../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { Router } from '@angular/router';
import { Layout } from '../../../../angular-commons/services/layout.service';
import { PDocActionTagService } from '../../../shared-pdoc/services/pdoc-actiontag.service';
export declare class PDocSelectSearchComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected actionService: PDocActionTagService;
    protected router: Router;
    Layout: typeof Layout;
    selectMultiActionManager: CommonDocMultiActionManager<PDocRecord, import("@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform").CommonDocSearchForm, import("@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult").CommonDocSearchResult<PDocRecord, import("@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform").CommonDocSearchForm>, import("@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service").PDocDataService>;
    selectFilter: {};
    modal?: boolean;
    baseId: string;
    type: string;
    nameFilterValues: string[];
    appendSelected: EventEmitter<CommonDocRecord[]>;
    constructor(cd: ChangeDetectorRef, appService: GenericAppService, actionService: PDocActionTagService, router: Router);
    onInputChanged(value: any, field: string): boolean;
    onCreateNewRecord(id: string): boolean;
    onRecordClickedOnMap(pdoc: PDocRecord): boolean;
    onChangeSelectFilter(): boolean;
    onAppendSelectedRecords(): boolean;
    getRecordFilters(): any;
    protected configureComponent(): void;
    protected updateData(): void;
}
