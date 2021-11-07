import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
import { CommonDocRoutingService } from '../../services/cdoc-routing.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
import { ToastrService } from 'ngx-toastr';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocActionTagService } from '../../services/cdoc-actiontag.service';
import { BaseLinkedPlaylistRecord } from '@dps/mycms-commons/dist/search-commons/model/records/baselinkedplaylist-record';
export interface CommonDocLinkedPlaylistsComponentConfig {
    appendAvailable: boolean;
    editAvailable: boolean;
    showAvailable: boolean;
}
export declare abstract class CommonDocLinkedPlaylistsComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>, A extends CommonDocActionTagService<R, F, S, D>, P extends BaseLinkedPlaylistRecord> extends AbstractInlineComponent implements OnInit {
    private sanitizer;
    private commonRoutingService;
    private cdocRoutingService;
    protected appService: GenericAppService;
    protected actionTagService: A;
    protected toastr: ToastrService;
    protected cdocDataService: D;
    protected cd: ChangeDetectorRef;
    appendAvailable: boolean;
    editAvailable: boolean;
    linkedPlaylists: P[];
    showAvailable: boolean;
    maxPlaylistValues: {};
    record: R;
    small?: boolean;
    actionTagEvent: EventEmitter<ActionTagEvent>;
    constructor(sanitizer: DomSanitizer, commonRoutingService: CommonRoutingService, cdocRoutingService: CommonDocRoutingService, appService: GenericAppService, actionTagService: A, toastr: ToastrService, cdocDataService: D, cd: ChangeDetectorRef);
    ngOnInit(): void;
    submitShow(event: any, linkedPlaylist: P): boolean;
    submitChangePosition(event: any, linkedPlaylist: P): boolean;
    submitAddToPlaylist(event: any): boolean;
    protected processAction(actionTagEvent: ActionTagEvent): Promise<void>;
    getShowUrl(linkedPlaylist: P): SafeUrl;
    protected abstract updateData(): any;
    protected configureComponent(config: {}): void;
    protected getComponentConfig(config: {}): CommonDocLinkedPlaylistsComponentConfig;
    private getUrl;
}
