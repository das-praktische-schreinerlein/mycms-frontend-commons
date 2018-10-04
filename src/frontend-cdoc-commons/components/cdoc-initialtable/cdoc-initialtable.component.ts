import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {ComponentUtils} from '../../../angular-commons/services/component.utils';
import {TimetableColumn} from '../cdoc-timetable/cdoc-timetable.component';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocSearchFormUtils} from '../..//services/cdoc-searchform-utils.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';

export interface InitialtableColumn extends TimetableColumn {}

@Component({
    selector: 'app-cdoc-initialtable',
    templateUrl: './cdoc-initialtable.component.html',
    styleUrls: ['./cdoc-initialtable.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocInitialtableComponent implements OnChanges {
    columns: InitialtableColumn[] = [];

    @Input()
    public searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;

    @Output()
    public columnClicked: EventEmitter<string> = new EventEmitter();

    constructor(private searchFormUtils: SearchFormUtils, private cdocSearchFormUtils: CommonDocSearchFormUtils) {
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (ComponentUtils.hasNgChanged(changes)) {
            this.renderInitialtable();
        }
    }

    onColumnClicked(key: any) {
        this.columnClicked.emit(key);
        return false;
    }

    private renderInitialtable() {
        const result = [];
        const values = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            this.cdocSearchFormUtils.getInitialValues(this.searchResult), false, [], true)
            .filter(value => {
                return value.name.match(/[a-zA-Z0-9]+/);
            })
            .sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

        const formValue = (this.searchResult.searchForm ? this.searchResult.searchForm.initial : '');
        for (const value of values) {
            const column = {
                width: 100 / values.length + '%',
                value: value['count'],
                label: value.name,
                key: value.id,
                active: formValue && formValue.indexOf(value.id) >= 0
            };
            result.push(column);
        }

        this.columns = result;
    }
}
