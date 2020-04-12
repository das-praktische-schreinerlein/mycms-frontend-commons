import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import {Layout, LayoutService, LayoutSize, LayoutSizeData} from '../../../angular-commons/services/layout.service';
import {CommonDocContentUtils, CommonItemData} from '../../services/cdoc-contentutils.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {BehaviorSubject} from 'rxjs';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {ActionTagEvent} from '../cdoc-actiontags/cdoc-actiontags.component';
import {CommonDocMultiActionManager} from '../../services/cdoc-multiaction.manager';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';

@Component({
    selector: 'app-cdoc-list-item',
    templateUrl: './cdoc-list-item.component.html',
    styleUrls: ['./cdoc-list-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocListItemComponent extends AbstractInlineComponent implements OnDestroy {
    private layoutSizeObservable: BehaviorSubject<LayoutSizeData>;
    listLayoutName = 'default';
    listItem: CommonItemData = {
        currentRecord: undefined,
        styleClassFor: undefined,
        thumbnailUrl: undefined,
        previewUrl: undefined,
        fullUrl: undefined,
        image: undefined,
        video: undefined,
        urlShow: undefined
    };
    LayoutSize = LayoutSize;
    layoutSize = LayoutSize.BIG;

    public contentUtils: CommonDocContentUtils;

    @Input()
    public record: CommonDocRecord;

    @Input()
    public rowNr?: undefined;

    @Input()
    public idx?: undefined;

    @Input()
    public backToSearchUrl: string;

    @Input()
    public layout: Layout;

    @Input()
    public short? = false;

    @Input()
    public multiActionManager?: CommonDocMultiActionManager<CommonDocRecord, CommonDocSearchForm,
        CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>,
        CommonDocDataService<CommonDocRecord, CommonDocSearchForm, CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>>>;

    @Output()
    public show: EventEmitter<CommonDocRecord> = new EventEmitter();

    @Output()
    public showImage: EventEmitter<CommonDocRecord> = new EventEmitter();

    constructor(contentUtils: CommonDocContentUtils, protected cd: ChangeDetectorRef,
        protected layoutService: LayoutService) {
        super(cd);
        this.contentUtils = contentUtils;
        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(layoutSizeData => {
            this.layoutSize = layoutSizeData.layoutSize;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        // this.layoutSizeObservable.unsubscribe();
    }

    public submitShow(cdoc: CommonDocRecord) {
        this.show.emit(cdoc);
        return false;
    }

    public submitShowImage(cdoc: CommonDocRecord) {
        this.showImage.emit(cdoc);
        return false;
    }

    public onActionTagEvent(event: ActionTagEvent) {
        if (event.result !== undefined) {
            this.record = <CommonDocRecord>event.result;
            this.multiActionManager.removeRecordFromMultiActionTag(this.record);
            this.updateData();
        }

        return false;
    }

    isMultiActionTagSelected(): boolean {
        return this.multiActionManager && this.multiActionManager.getSelectedMultiActionTags().length > 0;
    }

    isMultiActionAvailableForRecord(): boolean {
        return this.multiActionManager &&
            !this.multiActionManager.isMultiActionTagAvailableForRecord(<CommonDocRecord>this.listItem.currentRecord);
    }

    isMultiActionSelectedForRecord(): boolean {
        return this.multiActionManager && this.multiActionManager.isRecordOnMultiActionTag(<CommonDocRecord>this.listItem.currentRecord);
    }

    onChangeMultiActionForRecord(event): boolean {
        if (this.multiActionManager) {
            event.target.checked ?
                this.multiActionManager.appendRecordToMultiActionTag(<CommonDocRecord>this.listItem.currentRecord)
                : this.multiActionManager.removeRecordFromMultiActionTag(<CommonDocRecord>this.listItem.currentRecord);
        }

        return true;
    }

    protected updateData() {
        this.contentUtils.updateItemData(this.listItem, this.record, this.listLayoutName);
        if (this.multiActionManager) {
            this.multiActionManager.getSelectedMultiActionTagsObservable().subscribe(value => {
                this.cd.markForCheck();
            });
        }
        this.cd.markForCheck();
    }
}
