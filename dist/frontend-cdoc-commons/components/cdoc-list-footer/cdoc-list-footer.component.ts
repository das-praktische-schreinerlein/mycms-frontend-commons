import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';

@Component({
    selector: 'app-cdoc-list-footer',
    templateUrl: './cdoc-list-footer.component.html',
    styleUrls: ['./cdoc-list-footer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocListFooterComponent {

    @Input()
    public searchResult: CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>;

    @Output()
    public pageChange: EventEmitter<number> = new EventEmitter();

    constructor() {
    }

    onPageChange(page: number) {
        this.pageChange.emit(page);
    }
}
