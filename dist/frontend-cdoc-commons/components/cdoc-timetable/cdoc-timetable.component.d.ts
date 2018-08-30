import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { SearchParameterUtils } from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export interface TimetableColumn {
    width: string;
    label: string;
    key: string;
    value: string;
    class: string;
    active: boolean;
}
export declare class CommonDocTimetableComponent extends AbstractInlineComponent {
    private searchParameterUtils;
    private searchFormUtils;
    protected cd: ChangeDetectorRef;
    columns: TimetableColumn[];
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    columnClicked: EventEmitter<string>;
    constructor(searchParameterUtils: SearchParameterUtils, searchFormUtils: SearchFormUtils, cd: ChangeDetectorRef);
    onColumnClicked(key: any): boolean;
    protected updateData(): void;
}
