import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CommonDocContentUtils, CommonItemData } from '../../services/cdoc-contentutils.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocAudioplayerComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    contentUtils: CommonDocContentUtils;
    listItem: CommonItemData;
    audioplayer: any;
    record: CommonDocRecord;
    width: 150;
    styleClass: 'picture-small';
    show: EventEmitter<CommonDocRecord>;
    constructor(contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef);
    submitShow(cdoc: CommonDocRecord): boolean;
    startPlaying(): void;
    protected updateData(): void;
}
