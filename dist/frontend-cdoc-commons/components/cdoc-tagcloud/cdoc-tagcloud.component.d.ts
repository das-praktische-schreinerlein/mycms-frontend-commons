import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export interface TagcloudEntry {
    size: string;
    label: string;
    class: string;
    count: number;
}
export declare class CommonDocTagcloudComponent extends AbstractInlineComponent {
    private searchParameterUtils;
    private searchFormUtils;
    protected cd: ChangeDetectorRef;
    columns: TagcloudEntry[];
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    facetName: string;
    label?: string;
    max?: number;
    valuePrefix?: string;
    labelPrefix?: string;
    sortKey?: string;
    columnClicked: EventEmitter<string>;
    columnsFound: EventEmitter<number>;
    minCount: number;
    maxCount: number;
    factor: number;
    constructor(searchParameterUtils: SearchParameterUtils, searchFormUtils: SearchFormUtils, cd: ChangeDetectorRef);
    onColumnClicked(key: any): boolean;
    protected updateData(): void;
    calcSizeClass(count: number): number;
}
