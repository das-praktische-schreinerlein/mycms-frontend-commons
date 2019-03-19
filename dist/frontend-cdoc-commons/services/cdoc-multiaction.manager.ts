import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocActionTagService} from './cdoc-actiontag.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import * as Promise_serial from 'promise-serial';
import {ActionTagEvent, MultiRecordActionTagEvent} from '../components/cdoc-actiontags/cdoc-actiontags.component';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MultiActionTagConfig} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {utils} from 'js-data';

export class CommonDocMultiActionManager <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> {
    protected selectedActionTags: MultiActionTagConfig[] = [];
    protected selectedRecords: R[] = [];
    private selectedMultiActionTagsObservable: Subject<MultiActionTagConfig[]> = new BehaviorSubject<MultiActionTagConfig[]>([]);
    private selectedRecordsObservable: Subject<R[]> = new BehaviorSubject<R[]>([]);

    constructor(protected appService: GenericAppService, protected actionTagService: CommonDocActionTagService<R, F, S, D>) {
        this.configureComponent({});
    }

    protected configureComponent(config: {}): void {
    }

    public getSelectedMultiActionTags(): MultiActionTagConfig[] {
        return this.selectedActionTags;
    }

    public getSelectedMultiActionTagsObservable(): Subject<MultiActionTagConfig[]> {
        return this.selectedMultiActionTagsObservable;
    }

    public getSelectedRecords(): R[] {
        return this.selectedRecords;
    }

    public getSelectedRecordsObservable(): Subject<R[]> {
        return this.selectedRecordsObservable;
    }

    public setSelectedMultiActionTags(actionTags: MultiActionTagConfig[]): void {
        this.selectedActionTags = actionTags;
        this.selectedMultiActionTagsObservable.next(this.selectedActionTags);
    }

    public removeRecordFromMultiActionTag(record: R): void {
        while (this.isRecordOnMultiActionTag(record)) {
            this.selectedRecords.splice(this.selectedRecords.findIndex(value => value.id === record.id), 1);
        }
        this.selectedRecordsObservable.next(this.selectedRecords);
    }

    public appendRecordToMultiActionTag(record: R): void {
        if (!this.isRecordOnMultiActionTag(record)) {
            this.selectedRecords.push(record);
        }
        this.selectedRecordsObservable.next(this.selectedRecords);
    }

    public isRecordOnMultiActionTag(record: R): boolean {
        return this.selectedRecords.findIndex(value => value.id === record.id) > -1;
    }

    public isMultiActionTagAvailableForRecord(record: R): boolean {
        return true;
    }

    public processActionTags(): Promise<any> {
        return new Promise<R[]>((allresolve, allreject) => {
            const funcs = [];
            const me = this;
            for (const actionTag of this.selectedActionTags) {
                funcs.push(function () {
                    return me.processRecordsForActionTag(actionTag);
                });
            }

            return Promise_serial(funcs, {parallelize: 1}).then(arrayOfResults => {
                return allresolve();
            }).catch(function errorSearch(reason) {
                console.error('processActionTags failed:', reason);
                return allreject(reason);
            });
        });
    }

    private processRecordsForActionTag(actionTag: MultiActionTagConfig): Promise<any> {
        return new Promise<R[]>((allresolve, allreject) => {
            const funcs = [];
            const me = this;
            if (actionTag.multiRecordTag) {
                funcs.push(function () {
                    return me.processMultiActionTagForRecords(actionTag, me.selectedRecords);
                });
            } else {
                for (const record of this.selectedRecords) {
                    funcs.push(function () {
                        return me.processActionTagForRecord(actionTag, record);
                    });
                }
            }

            return Promise_serial(funcs, {parallelize: 1}).then(arrayOfResults => {
                return allresolve();
            }).catch(function errorSearch(reason) {
                console.error('processRecordsForActionTag failed:', reason);
                return allreject(reason);
            });
        });
    }

    private processActionTagForRecord(actionTagConfig: MultiActionTagConfig, record: R): Promise<any> {
        const actionTagEvent: ActionTagEvent = {
            config: actionTagConfig,
            record: record,
            result: undefined,
            error: undefined,
            processed: false,
            set: true
        };
        const actionTagEventEmitter: EventEmitter<ActionTagEvent> = new EventEmitter<ActionTagEvent>();

        return this.actionTagService.processActionTagEvent(actionTagEvent, actionTagEventEmitter).catch(reason => {
            return utils.reject(reason);
        });
    }

    private processMultiActionTagForRecords(actionTagConfig: MultiActionTagConfig, records: R[]): Promise<any> {
        const actionTagEvent: MultiRecordActionTagEvent = {
            config: actionTagConfig,
            records: records,
            results: undefined,
            error: undefined,
            processed: false,
            set: true
        };
        const actionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent> = new EventEmitter<MultiRecordActionTagEvent>();

        return this.actionTagService.processMultiRecordActionTagEvent(actionTagEvent, actionTagEventEmitter).catch(reason => {
            return utils.reject(reason);
        });
    }
}
