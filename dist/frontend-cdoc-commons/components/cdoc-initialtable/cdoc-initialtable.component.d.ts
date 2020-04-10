import { EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { TimetableColumn } from '../cdoc-timetable/cdoc-timetable.component';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchFormUtils } from '../..//services/cdoc-searchform-utils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
export interface InitialtableColumn extends TimetableColumn {
}
export declare class CommonDocInitialtableComponent implements OnChanges {
    private searchFormUtils;
    private cdocSearchFormUtils;
    columns: InitialtableColumn[];
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    columnClicked: EventEmitter<string>;
    constructor(searchFormUtils: SearchFormUtils, cdocSearchFormUtils: CommonDocSearchFormUtils);
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    onColumnClicked(key: any): boolean;
    private renderInitialtable;
}
