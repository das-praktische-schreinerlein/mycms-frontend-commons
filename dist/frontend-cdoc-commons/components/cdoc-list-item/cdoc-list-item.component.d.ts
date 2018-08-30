import { ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { Layout, LayoutService, LayoutSize } from '../../../angular-commons/services/layout.service';
import { CommonDocContentUtils, CommonItemData } from '../../services/cdoc-contentutils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
export declare class CommonDocListItemComponent extends AbstractInlineComponent implements OnDestroy {
    protected cd: ChangeDetectorRef;
    protected layoutService: LayoutService;
    private layoutSizeObservable;
    listLayoutName: string;
    listItem: CommonItemData;
    LayoutSize: typeof LayoutSize;
    layoutSize: LayoutSize;
    contentUtils: CommonDocContentUtils;
    record: CommonDocRecord;
    backToSearchUrl: string;
    layout: Layout;
    short?: boolean;
    show: EventEmitter<CommonDocRecord>;
    showImage: EventEmitter<CommonDocRecord>;
    constructor(contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService);
    ngOnDestroy(): void;
    submitShow(cdoc: CommonDocRecord): boolean;
    submitShowImage(cdoc: CommonDocRecord): boolean;
    onActionTagEvent(event: ActionTagEvent): boolean;
    protected updateData(): void;
}
