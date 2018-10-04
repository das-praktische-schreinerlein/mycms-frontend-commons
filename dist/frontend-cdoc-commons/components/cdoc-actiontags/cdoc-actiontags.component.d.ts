import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { BaseEntityRecord } from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ActionTag, ActionTagConfig } from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import { CommonDocAlbumService } from '../../services/cdoc-album.service';
import { CommonDocContentUtils, CommonItemData } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
export interface ActionTagEvent {
    record: BaseEntityRecord;
    result: BaseEntityRecord;
    config: ActionTagConfig;
    set: boolean;
    processed: boolean;
    error: any;
}
export interface MultiRecordActionTagEvent {
    records: BaseEntityRecord[];
    results: BaseEntityRecord[];
    config: ActionTagConfig;
    set: boolean;
    processed: boolean;
    error: any;
}
export interface CommonDocActionTagsComponentConfig {
    tagConfigs: ActionTagConfig[];
}
export declare class CommonDocActionTagsComponent extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected contentUtils: CommonDocContentUtils;
    protected cdocAlbumService: CommonDocAlbumService;
    protected cd: ChangeDetectorRef;
    item: CommonItemData;
    tagConfigs: ActionTagConfig[];
    tags: ActionTag[];
    styleClass: string;
    toggleClass: string;
    protected config: any;
    record: CommonDocRecord;
    type?: string;
    actionTagEvent: EventEmitter<ActionTagEvent>;
    constructor(appService: GenericAppService, contentUtils: CommonDocContentUtils, cdocAlbumService: CommonDocAlbumService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    setTag(tag: ActionTag): boolean;
    unsetTag(tag: ActionTag): boolean;
    hideInactive(): void;
    showInactive(): void;
    protected getComponentConfig(config: {}): CommonDocActionTagsComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
}
