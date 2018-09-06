import { EventEmitter } from '@angular/core';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { Router } from '@angular/router';
import { CommonDocAlbumService } from './cdoc-album.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { ActionTagEvent } from '../components/cdoc-actiontags/cdoc-actiontags.component';
export interface CommonDocActionTagServiceConfig {
    baseEditPath: string;
}
export declare abstract class CommonDocActionTagService<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> {
    protected router: Router;
    protected cdocDataService: D;
    protected cdocAlbumService: CommonDocAlbumService;
    protected appService: GenericAppService;
    protected baseEditPath: string;
    constructor(router: Router, cdocDataService: D, cdocAlbumService: CommonDocAlbumService, appService: GenericAppService);
    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig;
    protected configureComponent(config: {}): void;
    processActionTagEvent(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
    protected processActionTagEventEdit(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
    protected processActionTagEventCreate(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
    protected processActionTagEventAlbumTag(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
    protected processActionTagEventTag(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
    protected processActionTagEventUnknown(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any>;
}
