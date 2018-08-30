import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CommonDocContentUtils, CommonItemData } from '../../services/cdoc-contentutils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocVideoplayerComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    contentUtils: CommonDocContentUtils;
    listItem: CommonItemData;
    maxWidth: number;
    maxHeight: number;
    maxFullWidth: number;
    maxFullHeight: number;
    videoplayer: any;
    record: CommonDocRecord;
    width: 300;
    forceWidth: string;
    styleClass: 'picture-small';
    showFullScreenVideo: boolean;
    showPreview: boolean;
    show: EventEmitter<CommonDocRecord>;
    constructor(contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef);
    submitShow(cdoc: CommonDocRecord): boolean;
    protected updateData(): void;
}
