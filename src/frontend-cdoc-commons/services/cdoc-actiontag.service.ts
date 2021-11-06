import {EventEmitter} from '@angular/core';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {ActionTagForm} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {Router} from '@angular/router';
import {CommonDocAlbumService} from './cdoc-album.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {ActionTagEvent, MultiRecordActionTagEvent} from '../components/cdoc-actiontags/cdoc-actiontags.component';
import {utils} from 'js-data';
import {AngularHtmlService} from '../../angular-commons/services/angular-html.service';
import {CommonDocPlaylistService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-playlist.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';

export interface CommonDocActionTagServiceConfig {
    baseEditPath: string;
}

export abstract class CommonDocActionTagService <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> {
    protected baseEditPath: string;

    public static actionTagEventToMultiActionTagEvent(actionTagEvent: ActionTagEvent): MultiRecordActionTagEvent {
        return {
            records: actionTagEvent.record ? [actionTagEvent.record] : undefined,
            config: actionTagEvent.config,
            error: actionTagEvent.error,
            processed: actionTagEvent.processed,
            results: actionTagEvent.result ? [actionTagEvent.result] : undefined,
            set: actionTagEvent.set
        };
    }

    public static multiActionTagEventToActionTagEvent(actionTagEvent: MultiRecordActionTagEvent): ActionTagEvent {
        return {
            record: actionTagEvent.records && actionTagEvent.records.length === 0 ? actionTagEvent.records[0] : undefined,
            config: actionTagEvent.config,
            error: actionTagEvent.error,
            processed: actionTagEvent.processed,
            result: actionTagEvent.results && actionTagEvent.results.length === 0 ? actionTagEvent.results[0] : undefined,
            set: actionTagEvent.set
        };
    }

    public static actionTagEventEmitterToMultiActionTagEventEmitter(actionTagEventEmitter: EventEmitter<ActionTagEvent>):
        EventEmitter<MultiRecordActionTagEvent> {
        const multiRecordActionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent> = new EventEmitter<MultiRecordActionTagEvent>();
        multiRecordActionTagEventEmitter.subscribe((data: MultiRecordActionTagEvent) => {
            actionTagEventEmitter.emit(CommonDocActionTagService.multiActionTagEventToActionTagEvent(data));
        }, (error: any) => {
            actionTagEventEmitter.error(error);
        });

        return multiRecordActionTagEventEmitter;
    }

    constructor(protected router: Router, protected cdocDataService: D,
                protected cdocPlaylistService: CommonDocPlaylistService<R>,
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
                                 actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        if (actionTagEvent.config.key === 'edit') {
            return this.processActionTagEventEdit(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.key === 'createBy') {
            return this.processActionTagEventCreate(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.type === 'albumtag') {
            return this.processActionTagEventAlbumTag(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.type === 'tag') {
            return this.processActionTagEventTag(actionTagEvent, actionTagEventEmitter);
        } else if (actionTagEvent.config.type === 'link') {
            return this.processActionTagEventLink(actionTagEvent, actionTagEventEmitter);
        } else {
            return this.processActionTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    }

    protected processActionTagEventEdit(actionTagEvent: ActionTagEvent,
                                        actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return new Promise<R>((resolve, reject) => {
            this.router.navigate([ this.baseEditPath, 'edit', 'anonym', actionTagEvent.record.id ]).then(value => {
                resolve(<R>actionTagEvent.result);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    protected processActionTagEventCreate(actionTagEvent: ActionTagEvent,
                                          actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return new Promise<R>((resolve, reject) => {
            this.router.navigate([ this.baseEditPath, 'create', payload.type, actionTagEvent.record.id ]).then(value => {
                resolve(<R>actionTagEvent.result);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    protected processActionTagEventAlbumTag(actionTagEvent: ActionTagEvent,
                                            actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
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
        return Promise.resolve(<R>actionTagEvent.result);

    }

    protected processActionTagEventTag(actionTagEvent: ActionTagEvent,
                                       actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        payload['name'] = actionTagEvent.config.name;
        if (payload.hasOwnProperty('set')) {
            // tslint:disable-next-line:triple-equals
            if (payload['set'] != actionTagEvent.set) {
                console.log('dont override payload.set for ', actionTagEvent.config.name, payload['set'], actionTagEvent.set);
            }
        } else {
            payload['set'] = actionTagEvent.set;
        }

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

    protected processActionTagEventLink(actionTagEvent: ActionTagEvent,
                                        actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        const payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        if (payload === undefined || payload.url === undefined) {
            const reason = 'payload and url required';
            actionTagEvent.processed = true;
            actionTagEvent.error = reason;
            actionTagEventEmitter.emit(actionTagEvent);
            console.error('cdocactions failed:', reason);
            return utils.reject(reason);
        }

        const target = payload.target;
        let url: string = payload.url;
        if (payload.replacements) {
            for (const field in payload.replacements) {
                if (!payload.replacements.hasOwnProperty(field)) {
                    continue;
                }

                url = url.replace('{{' + field + '}}',
                    BeanUtils.getValue(actionTagEvent, payload.replacements[field]));
            }
        }

        window.open(url, target ? target : '_blank');

        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.result = actionTagEvent.record;
        actionTagEventEmitter.emit(actionTagEvent);

        return utils.resolve(actionTagEvent);
    }

    protected processActionTagEventUnknown(actionTagEvent: ActionTagEvent,
                                           actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<R> {
        actionTagEvent.processed = true;
        actionTagEvent.error = 'action not defined: '+ actionTagEvent.config;
        actionTagEvent.result = undefined;
        actionTagEventEmitter.error(actionTagEvent.error);
        return Promise.reject(actionTagEvent.error);
    }

    public processMultiRecordActionTagEvent(actionTagEvent: MultiRecordActionTagEvent,
                                            actionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<R[]> {
        if (actionTagEvent.config.key === 'm3uplaylistexport') {
            return this.processMultiRecordActionTagEventPlaylistExport(actionTagEvent, actionTagEventEmitter);
        } else {
            return this.processActionMultiRecordTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    }

    protected processMultiRecordActionTagEventPlaylistExport(actionTagEvent: MultiRecordActionTagEvent,
                                                             actionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<R[]> {
        AngularHtmlService.browserSaveTextAsFile(
            this.cdocPlaylistService.generateM3uForRecords('', <R[]>actionTagEvent.records),
            'playlist.m3u', 'application/m3u');
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.results = actionTagEvent.records;
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(<R[]>actionTagEvent.results);

    }


    protected processActionMultiRecordTagEventUnknown(actionTagEvent: MultiRecordActionTagEvent,
                                                      actionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<R[]> {
        actionTagEvent.processed = true;
        actionTagEvent.error = 'action not defined: '+ actionTagEvent.config;
        actionTagEvent.results = undefined;
        actionTagEventEmitter.error(actionTagEvent.error);
        return Promise.reject(actionTagEvent.error);
    }
}
