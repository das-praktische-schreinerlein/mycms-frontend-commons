import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {ActionTagForm} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {Router} from '@angular/router';
import {CommonDocAlbumService} from './cdoc-album.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {ActionTagEvent} from '../components/cdoc-actiontags/cdoc-actiontags.component';
import {utils} from 'js-data';

export interface CommonDocActionTagServiceConfig {
    baseEditPath: string;
}

export abstract class CommonDocActionTagService <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> {
    protected baseEditPath: string;

    constructor(protected router: Router, protected cdocDataService: D,
                protected cdocAlbumService: CommonDocAlbumService, protected appService: GenericAppService) {
        this.configureComponent({});
    }

    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig {
        return {
            baseEditPath: 'cdocadmin'
        };
    }

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.baseEditPath = componentConfig.baseEditPath;
    }

    public processActionTagEvent(actionTagEvent: ActionTagEvent,
                                 actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        if (actionTagEvent.config.key === 'edit') {
            return this.processActionTagEventEdit(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.key === 'createBy') {
            return this.processActionTagEventCreate(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.type === 'albumtag') {
            return this.processActionTagEventAlbumTag(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.type === 'tag') {
            return this.processActionTagEventTag(actionTagEvent, actionTagEventEmitter);
        } else {
            return this.processActionTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    }

    protected processActionTagEventEdit(actionTagEvent: ActionTagEvent,
                                        actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return this.router.navigate([ this.baseEditPath, 'edit', 'anonym', actionTagEvent.record.id ] );
    }

    protected processActionTagEventCreate(actionTagEvent: ActionTagEvent,
                                          actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return this.router.navigate([ this.baseEditPath, 'create', payload.type, actionTagEvent.record.id ] );
    }

    protected processActionTagEventAlbumTag(actionTagEvent: ActionTagEvent,
                                            actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        const key = payload['albumkey'];
        if (actionTagEvent.set) {
            this.cdocAlbumService.addToAlbum(key, <R>actionTagEvent.record);
        } else {
            this.cdocAlbumService.removeFromAlbum(key, <R>actionTagEvent.record);
        }
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.result = actionTagEvent.record;
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(true);

    }

    protected processActionTagEventTag(actionTagEvent: ActionTagEvent,
                                       actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        payload['set'] = actionTagEvent.set;
        payload['name'] = actionTagEvent.config.name;
        const actinTagForm: ActionTagForm = {
            key: actionTagEvent.config.key,
            payload: payload,
            recordId: actionTagEvent.record.id,
            type: actionTagEvent.config.type
        };

        return this.cdocDataService.doActionTag(<R>actionTagEvent.record, actinTagForm).then(cdoc => {
            actionTagEvent.processed = true;
            actionTagEvent.error = undefined;
            actionTagEvent.result = cdoc;
            actionTagEventEmitter.emit(actionTagEvent);
            return utils.resolve(actionTagEvent);
        }).catch(reason => {
            actionTagEvent.processed = true;
            actionTagEvent.error = reason;
            actionTagEventEmitter.emit(actionTagEvent);
            console.error('cdocactions failed:', reason);
            return utils.reject(reason);
        });
    }

    protected processActionTagEventUnknown(actionTagEvent: ActionTagEvent,
                                           actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<any> {
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(true);
    }
}
