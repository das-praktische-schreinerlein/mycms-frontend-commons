import { EventEmitter } from '@angular/core';
import { utils } from 'js-data';
import { AngularHtmlService } from '../../angular-commons/services/angular-html.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
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
        if (actionTagEvent.config.key === 'show') {
            return this.processActionTagEventShow(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.key === 'edit') {
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
        else if (actionTagEvent.config.type === 'link') {
            return this.processActionTagEventLink(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'noop') {
            return this.processActionTagEventNoop(actionTagEvent, actionTagEventEmitter);
        }
        else {
            return this.processActionTagEventUnknown(actionTagEvent, actionTagEventEmitter);
        }
    };
    CommonDocActionTagService.prototype.processActionTagEventShow = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        actionTagEvent.result = actionTagEvent.record;
        if (actionTagEvent.config.payload && actionTagEvent.config.payload['outlet']) {
            var outlets_1 = {};
            var outletName = actionTagEvent.config.payload['outlet'];
            outlets_1[outletName] = [outletName, 'show', 'anonym', actionTagEvent.record.id];
            return new Promise(function (resolve, reject) {
                _this.router.navigate([{ outlets: outlets_1 }]).then(function (value) {
                    resolve(actionTagEvent.result);
                }).catch(function (reason) {
                    reject(reason);
                });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.router.navigate([_this.baseEditPath, 'show', 'anonym', actionTagEvent.record.id]).then(function (value) {
                    resolve(actionTagEvent.result);
                }).catch(function (reason) {
                    reject(reason);
                });
            });
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
        payload['name'] = actionTagEvent.config.name;
        if (payload.hasOwnProperty('set')) {
            // tslint:disable-next-line:triple-equals
            if (payload['set'] != actionTagEvent.set) {
                console.log('dont override payload.set for ', actionTagEvent.config.name, payload['set'], actionTagEvent.set);
            }
        }
        else {
            payload['set'] = actionTagEvent.set;
        }
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
    CommonDocActionTagService.prototype.processActionTagEventLink = function (actionTagEvent, actionTagEventEmitter) {
        var payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        if (payload === undefined || payload.url === undefined) {
            var reason = 'payload and url required';
            actionTagEvent.processed = true;
            actionTagEvent.error = reason;
            actionTagEventEmitter.emit(actionTagEvent);
            console.error('cdocactions failed:', reason);
            return utils.reject(reason);
        }
        var target = payload.target;
        var url = payload.url;
        if (payload.replacements) {
            for (var field in payload.replacements) {
                if (!payload.replacements.hasOwnProperty(field)) {
                    continue;
                }
                url = url.replace('{{' + field + '}}', BeanUtils.getValue(actionTagEvent, payload.replacements[field]));
            }
        }
        window.open(url, target ? target : '_blank');
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEvent.result = actionTagEvent.record;
        actionTagEventEmitter.emit(actionTagEvent);
        return utils.resolve(actionTagEvent);
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
        else if (actionTagEvent.config.type === 'noop') {
            return this.processActionMultiRecordTagEventNoop(actionTagEvent, actionTagEventEmitter);
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
    CommonDocActionTagService.prototype.processActionTagEventNoop = function (actionTagEvent, actionTagEventEmitter) {
        actionTagEvent.processed = true;
        actionTagEvent.result = actionTagEvent.record;
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(actionTagEvent.record);
    };
    CommonDocActionTagService.prototype.processActionMultiRecordTagEventNoop = function (actionTagEvent, actionTagEventEmitter) {
        actionTagEvent.processed = true;
        actionTagEvent.results = actionTagEvent.records;
        actionTagEventEmitter.emit(actionTagEvent);
        actionTagEventEmitter.error(actionTagEvent.error);
        return Promise.resolve(actionTagEvent.results);
    };
    return CommonDocActionTagService;
}());
export { CommonDocActionTagService };
//# sourceMappingURL=cdoc-actiontag.service.js.map