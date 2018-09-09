"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonDocActionTagService = /** @class */ (function () {
    function CommonDocActionTagService(router, cdocDataService, cdocAlbumService, appService) {
        this.router = router;
        this.cdocDataService = cdocDataService;
        this.cdocAlbumService = cdocAlbumService;
        this.appService = appService;
        this.configureComponent({});
    }
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
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return this.router.navigate([this.baseEditPath, 'edit', 'anonym', actionTagEvent.record.id]);
    };
    CommonDocActionTagService.prototype.processActionTagEventCreate = function (actionTagEvent, actionTagEventEmitter) {
        var payload = JSON.parse(JSON.stringify(actionTagEvent.config.payload));
        actionTagEvent.processed = true;
        actionTagEvent.error = undefined;
        actionTagEventEmitter.emit(actionTagEvent);
        return this.router.navigate([this.baseEditPath, 'create', payload.type, actionTagEvent.record.id]);
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
        return Promise.resolve(true);
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
        }).catch(function (reason) {
            actionTagEvent.processed = true;
            actionTagEvent.error = reason;
            actionTagEventEmitter.emit(actionTagEvent);
            console.error('cdocactions failed:', reason);
        });
    };
    CommonDocActionTagService.prototype.processActionTagEventUnknown = function (actionTagEvent, actionTagEventEmitter) {
        actionTagEventEmitter.emit(actionTagEvent);
        return Promise.resolve(true);
    };
    return CommonDocActionTagService;
}());
exports.CommonDocActionTagService = CommonDocActionTagService;
//# sourceMappingURL=cdoc-actiontag.service.js.map