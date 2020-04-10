import { EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { TimetableColumn } from '../cdoc-timetable/cdoc-timetable.component';
import { SearchFormUtils } from '../../../angular-commons/services/searchform-utils.service';
import { CommonDocSearchFormUtils } from '../../services/cdoc-searchform-utils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
export interface TypetableColumn extends TimetableColumn {
}
export declare class CommonDocTypetableComponent implements OnChanges {
    private searchFormUtils;
    private cdocSearchFormUtils;
    columns: TypetableColumn[];
    searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;
    columnClicked: EventEmitter<string>;
    constructor(searchFormUtils: SearchFormUtils, cdocSearchFormUtils: CommonDocSearchFormUtils);
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    onColumnClicked(key: any): boolean;
    private renderTypetable;
}
