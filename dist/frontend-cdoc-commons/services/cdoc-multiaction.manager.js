"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise_serial = require("promise-serial");
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var CommonDocMultiActionManager = /** @class */ (function () {
    function CommonDocMultiActionManager(appService, actionTagService) {
        this.appService = appService;
        this.actionTagService = actionTagService;
        this.selectedActionTags = [];
        this.selectedRecords = [];
        this.selectedMultiActionTagsObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.selectedRecordsObservable = new BehaviorSubject_1.BehaviorSubject([]);
        this.configureComponent({});
    }
    CommonDocMultiActionManager.prototype.configureComponent = function (config) {
    };
    CommonDocMultiActionManager.prototype.getSelectedMultiActionTags = function () {
        return this.selectedActionTags;
    };
    CommonDocMultiActionManager.prototype.getSelectedMultiActionTagsObservable = function () {
        return this.selectedMultiActionTagsObservable;
    };
    CommonDocMultiActionManager.prototype.getSelectedRecords = function () {
        return this.selectedRecords;
    };
    CommonDocMultiActionManager.prototype.getSelectedRecordsObservable = function () {
        return this.selectedRecordsObservable;
    };
    CommonDocMultiActionManager.prototype.setSelectedMultiActionTags = function (actionTags) {
        this.selectedActionTags = actionTags;
        this.selectedMultiActionTagsObservable.next(this.selectedActionTags);
    };
    CommonDocMultiActionManager.prototype.removeRecordFromMultiActionTag = function (record) {
        while (this.isRecordOnMultiActionTag(record)) {
            this.selectedRecords.splice(this.selectedRecords.findIndex(function (value) { return value.id === record.id; }), 1);
        }
        this.selectedRecordsObservable.next(this.selectedRecords);
    };
    CommonDocMultiActionManager.prototype.appendRecordToMultiActionTag = function (record) {
        if (!this.isRecordOnMultiActionTag(record)) {
            this.selectedRecords.push(record);
        }
        this.selectedRecordsObservable.next(this.selectedRecords);
    };
    CommonDocMultiActionManager.prototype.isRecordOnMultiActionTag = function (record) {
        return this.selectedRecords.findIndex(function (value) { return value.id === record.id; }) > -1;
    };
    CommonDocMultiActionManager.prototype.isMultiActionTagAvailableForRecord = function (record) {
        return true;
    };
    CommonDocMultiActionManager.prototype.processActionTags = function () {
        var _this = this;
        return new Promise(function (allresolve, allreject) {
            var funcs = [];
            var me = _this;
            var _loop_1 = function (actionTag) {
                funcs.push(function () {
                    return me.processRecordsForActionTag(actionTag);
                });
            };
            for (var _i = 0, _a = _this.selectedActionTags; _i < _a.length; _i++) {
                var actionTag = _a[_i];
                _loop_1(actionTag);
            }
            return Promise_serial(funcs, { parallelize: 1 }).then(function (arrayOfResults) {
                return allresolve();
            }).catch(function errorSearch(reason) {
                console.error('processActionTags failed:', reason);
                return allreject(reason);
            });
        });
    };
    CommonDocMultiActionManager.prototype.processRecordsForActionTag = function (actionTag) {
        var _this = this;
        return new Promise(function (allresolve, allreject) {
            var funcs = [];
            var me = _this;
            if (actionTag.multiRecordTag) {
                funcs.push(function () {
                    return me.processMultiActionTagForRecords(actionTag, me.selectedRecords);
                });
            }
            else {
                var _loop_2 = function (record) {
                    funcs.push(function () {
                        return me.processActionTagForRecord(actionTag, record);
                    });
                };
                for (var _i = 0, _a = _this.selectedRecords; _i < _a.length; _i++) {
                    var record = _a[_i];
                    _loop_2(record);
                }
            }
            return Promise_serial(funcs, { parallelize: 1 }).then(function (arrayOfResults) {
                return allresolve();
            }).catch(function errorSearch(reason) {
                console.error('processRecordsForActionTag failed:', reason);
                return allreject(reason);
            });
        });
    };
    CommonDocMultiActionManager.prototype.processActionTagForRecord = function (actionTagConfig, record) {
        var _this = this;
        var actionTagEvent = {
            config: actionTagConfig,
            record: record,
            result: undefined,
            error: undefined,
            processed: false,
            set: true
        };
        var actionTagEventEmitter = new core_1.EventEmitter();
        return new Promise(function (resolve, reject) {
            actionTagEventEmitter.subscribe(function (value) {
                if (value.error !== undefined) {
                    reject(value.error);
                }
                resolve(value);
            }, function (error) {
                reject(error);
            });
            _this.actionTagService.processActionTagEvent(actionTagEvent, actionTagEventEmitter)
                .then(function (value) {
                resolve(value);
            })
                .catch(function (reason) {
                reject(reason);
            });
        });
    };
    CommonDocMultiActionManager.prototype.processMultiActionTagForRecords = function (actionTagConfig, records) {
        var _this = this;
        var actionTagEvent = {
            config: actionTagConfig,
            records: records,
            results: undefined,
            error: undefined,
            processed: false,
            set: true
        };
        var actionTagEventEmitter = new core_1.EventEmitter();
        return new Promise(function (resolve, reject) {
            actionTagEventEmitter.subscribe(function (value) {
                if (value.error !== undefined) {
                    reject(value.error);
                }
                resolve(value);
            }, function (error) {
                reject(error);
            });
            _this.actionTagService.processMultiRecordActionTagEvent(actionTagEvent, actionTagEventEmitter)
                .then(function (value) {
                return resolve(value);
            })
                .catch(function (reason) {
                return reject(reason);
            });
        });
    };
    return CommonDocMultiActionManager;
}());
exports.CommonDocMultiActionManager = CommonDocMultiActionManager;
//# sourceMappingURL=cdoc-multiaction.manager.js.map