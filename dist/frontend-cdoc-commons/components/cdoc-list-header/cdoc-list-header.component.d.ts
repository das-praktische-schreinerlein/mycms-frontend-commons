import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { Layout } from '../../../angular-commons/services/layout.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocListHeaderComponent extends AbstractInlineComponent implements OnInit {
    fb: FormBuilder;
    private appService;
    protected cd: ChangeDetectorRef;
    autoPlayAllowed: boolean;
    Layout: typeof Layout;
    availableLayouts?: Layout[];
    availableSorts?: string[];
    availablePerPage?: number[];
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    perPage: number;
    sort: string;
    layout: Layout;
    showAutoplay?: boolean;
    pauseAutoplay?: boolean;
    pageChange: EventEmitter<number>;
    perPageChange: EventEmitter<number>;
    sortChange: EventEmitter<string>;
    layoutChange: EventEmitter<Layout>;
    headerFormGroup: FormGroup;
    constructor(fb: FormBuilder, appService: GenericAppService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onShowIntervalNext(): boolean;
    onPageChange(page: number): void;
    onPerPageChange(): void;
    onSortChange(): void;
    onLayoutChange(): void;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
}
