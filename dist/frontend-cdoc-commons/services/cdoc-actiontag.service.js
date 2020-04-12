import { EventEmitter } from '@angular/core';
import { utils } from 'js-data';
import { AngularHtmlService } from '../../angular-commons/services/angular-html.service';
var CommonDocActionTagService = /** @class */ (function () {
    function CommonDocActionTagService(router, cdocDataService, cdocPlaylistService, cdocAlbumService, appService) {
        this.router = router;
        this.cdocDataService = cdocDataService;
        this.cdocPlaylistService = cdocPlaylistService;
        this.cdocAlbumService = cdocAlbumService;
        this.appService = appService;
        this.configureComponent({});
    }
    CommonDocActionTagService.actionTagEventToMultiActionTagEvent = function (actionTagEvent) {
        return {
            records: actionTagEvent.record ? [actionTagEvent.record] : undefined,
            config: actionTagEvent.config,
            error: actionTagEvent.error,
            processed: actionTagEvent.processed,
            results: actionTagEvent.result ? [actionTagEvent.result] : undefined,
            set: actionTagEvent.set
        };
    };
    CommonDocActionTagService.multiActionTagEventToActionTagEvent = function (actionTagEvent) {
        return {
            record: actionTagEvent.records && actionTagEvent.records.length === 0 ? actionTagEvent.records[0] : undefined,
            config: actionTagEvent.config,
            error: actionTagEvent.error,
            processed: actionTagEvent.processed,
            result: actionTagEvent.results && actionTagEvent.results.length === 0 ? actionTagEvent.results[0] : undefined,
            set: actionTagEvent.set
        };
    };
    CommonDocActionTagService.actionTagEventEmitterToMultiActionTagEventEmitter = function (actionTagEventEmitter) {
        var multiRecordActionTagEventEmitter = new EventEmitter();
        multiRecordActionTagEventEmitter.subscribe(function (data) {
            actionTagEventEmitter.emit(CommonDocActionTagService.multiActionTagEventToActionTagEvent(data));
        }, function (error) {
            actionTagEventEmitter.error(error);
        });
        return multiRecordActionTagEventEmitter;
    };
    CommonDocActionTagService.prototype.getComponentConfig = function (config) {
        return {
            baseEditPath: 'cdocadmin'
        };
    };
    CommonDocActionTagService.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseEditPath = componentConfig.baseEditPath;
    };
    CommonDocActionTagService.prototype.processActionTagEvent = function (actionTagEvent, actionTagEventEmitter) {
        if (actionTagEvent.config.key === 'edit') {
            return this.processActionTagEventEdit(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.key === 'createBy') {
            return this.processActionTagEventCreate(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'albumtag') {
            return this.processActionTagEventAlbumTag(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'tag') {
            return this.processActionTagEventTag(actionTagEvent, actionTagEventEmitter);
        }
        else {
            return this.processActionTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    };
    CommonDocActionTagService.prototype.processActionTagEventEdit = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return new Promise(function (resolve, reject) {
            _this.router.navigate([_this.baseEditPath, 'edit', 'anonym', actionTagEvent.record.id]).then(function (value) {
                resolve(actionTagEvent.result);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    CommonDocActionTagService.prototype.processActionTagEventCreate = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        var payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return new Promise(function (resolve, reject) {
            _this.router.navigate([_this.baseEditPath, 'create', payload.type, actionTagEvent.record.id]).then(function (value) {
                resolve(actionTagEvent.result);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    CommonDocActionTagService.prototype.processActionTagEventAlbumTag = function (actionTagEvent, actionTagEventEmitter) {
        var payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        var key = payload['albumkey'];
        if (actionTagEvent.set) {
            this.cdocAlbumService.addToAlbum(key, actionTagEvent.record);
        }
        else {
            this.cdocAlbumService.removeFromAlbum(key, actionTagEvent.record);
        }
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.result = actionTagEvent.record;
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(actionTagEvent.result);
    };
    CommonDocActionTagService.prototype.processActionTagEventTag = function (actionTagEvent, actionTagEventEmitter) {
        var payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        payload['set'] = actionTagEvent.set;
        payload['name'] = actionTagEvent.config.name;
        var actinTagForm = {
            key: actionTagEvent.config.key,
            payload: payload,
            recordId: actionTagEvent.record.id,
            type: actionTagEvent.config.type
        };
        return this.cdocDataService.doActionTag(actionTagEvent.record, actinTagForm).then(function (cdoc) {
            actionTagEvent.processed = true;
            actionTagEvent.error = undefined;
            actionTagEvent.result = cdoc;
            actionTagEventEmitter.emit(actionTagEvent);
            return utils.resolve(actionTagEvent);
        }).catch(function (reason) {
            actionTagEvent.processed = true;
            actionTagEvent.error = reason;
            actionTagEventEmitter.emit(actionTagEvent);
            console.error('cdocactions failed:', reason);
            return utils.reject(reason);
        });
    };
    CommonDocActionTagService.prototype.processActionTagEventUnknown = function (actionTagEvent, actionTagEventEmitter) {
        actionTagEvent.processed = true;
        actionTagEvent.error = 'action not defined: ' + actionTagEvent.config;
        actionTagEvent.result = undefined;
        actionTagEventEmitter.error(actionTagEvent.error);
        return Promise.reject(actionTagEvent.error);
    };
    CommonDocActionTagService.prototype.processMultiRecordActionTagEvent = function (actionTagEvent, actionTagEventEmitter) {
        if (actionTagEvent.config.key === 'm3uplaylistexport') {
            return this.processMultiRecordActionTagEventPlaylistExport(actionTagEvent, actionTagEventEmitter);
        }
        else {
            return this.processActionMultiRecordTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    };
    CommonDocActionTagService.prototype.processMultiRecordActionTagEventPlaylistExport = function (actionTagEvent, actionTagEventEmitter) {
        AngularHtmlService.browserSaveTextAsFile(this.cdocPlaylistService.generateM3uForRecords('', actionTagEvent.records), 'playlist.m3u', 'application/m3u');
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.results = actionTagEvent.records;
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(actionTagEvent.results);
    };
    CommonDocActionTagService.prototype.processActionMultiRecordTagEventUnknown = function (actionTagEvent, actionTagEventEmitter) {
        actionTagEvent.processed = true;
        actionTagEvent.error = 'action not defined: ' + actionTagEvent.config;
        actionTagEvent.results = undefined;
        actionTagEventEmitter.error(actionTagEvent.error);
        return Promise.reject(actionTagEvent.error);
    };
    return CommonDocActionTagService;
}());
export { CommonDocActionTagService };
//# sourceMappingURL=cdoc-actiontag.service.js.map