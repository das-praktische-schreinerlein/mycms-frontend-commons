var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocActionTagService } from '../../../frontend-cdoc-commons/services/cdoc-actiontag.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { PDocReplaceFormComponent } from '../components/pdoc-replaceform/pdoc-replaceform.component';
import { ToastrService } from 'ngx-toastr';
import * as Promise_serial from 'promise-serial';
import { PDocAssignFormComponent } from '../components/pdoc-assignform/pdoc-assignform.component';
import { PDocAssignJoinFormComponent } from '../components/pdoc-assignjoinform/pdoc-assignjoinform.component';
import { PDocActionTagService } from '../../shared-pdoc/services/pdoc-actiontag.service';
import { PDocAlbumService } from '../../shared-pdoc/services/pdoc-album.service';
var PDocAdminActionTagService = /** @class */ (function (_super) {
    __extends(PDocAdminActionTagService, _super);
    function PDocAdminActionTagService(router, cdocDataService, albumService, appService, modalService, toastr) {
        var _this = _super.call(this, router, cdocDataService, albumService, appService, toastr) || this;
        _this.modalService = modalService;
        _this.toastr = toastr;
        _this.configureComponent({});
        return _this;
    }
    PDocAdminActionTagService.prototype.getComponentConfig = function (config) {
        return {
            baseEditPath: 'pdocadmin'
        };
    };
    PDocAdminActionTagService.prototype.processActionTagEventUnknown = function (actionTagEvent, actionTagEventEmitter) {
        if (actionTagEvent.config.type === 'replace') {
            return this.processActionTagEventReplace(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'assign') {
            return this.processActionTagEventAssign(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'assignjoin') {
            return this.processActionTagEventAssignJoin(actionTagEvent, actionTagEventEmitter);
        }
        else {
            return _super.prototype.processActionTagEventUnknown.call(this, actionTagEvent, actionTagEventEmitter);
        }
    };
    PDocAdminActionTagService.prototype.processActionMultiRecordTagEventUnknown = function (actionTagEvent, actionTagEventEmitter) {
        if (actionTagEvent.config.type === 'replace') {
            return this.processMultiActionTagEventReplace(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'assign') {
            return this.processMultiActionTagEventAssign(actionTagEvent, actionTagEventEmitter);
        }
        else if (actionTagEvent.config.type === 'assignjoin') {
            return this.processMultiActionTagEventAssignJoin(actionTagEvent, actionTagEventEmitter);
        }
        else {
            return _super.prototype.processActionMultiRecordTagEventUnknown.call(this, actionTagEvent, actionTagEventEmitter);
        }
    };
    PDocAdminActionTagService.prototype.processActionTagEventReplace = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.processMultiActionTagEventReplace(CommonDocActionTagService.actionTagEventToMultiActionTagEvent(actionTagEvent), CommonDocActionTagService.actionTagEventEmitterToMultiActionTagEventEmitter(actionTagEventEmitter)).then(function (value) {
                resolve(value !== undefined && value.length > 0 ? value[0] : undefined);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    PDocAdminActionTagService.prototype.processMultiActionTagEventReplace = function (multiActionTagEvent, multiActionTagEventEmitter) {
        var formResultObservable = new Subject();
        var promise = this.processMultiActionFormTagEvent(multiActionTagEvent, multiActionTagEventEmitter, formResultObservable);
        var modalRef = this.modalService.open(PDocReplaceFormComponent);
        modalRef.componentInstance.records = multiActionTagEvent.records;
        modalRef.componentInstance.resultObservable = formResultObservable;
        return promise;
    };
    PDocAdminActionTagService.prototype.processActionTagEventAssign = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.processMultiActionTagEventAssign(CommonDocActionTagService.actionTagEventToMultiActionTagEvent(actionTagEvent), CommonDocActionTagService.actionTagEventEmitterToMultiActionTagEventEmitter(actionTagEventEmitter)).then(function (value) {
                resolve(value !== undefined && value.length > 0 ? value[0] : undefined);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    PDocAdminActionTagService.prototype.processMultiActionTagEventAssign = function (multiActionTagEvent, multiActionTagEventEmitter) {
        var formResultObservable = new Subject();
        var promise = this.processMultiActionFormTagEvent(multiActionTagEvent, multiActionTagEventEmitter, formResultObservable);
        var modalRef = this.modalService.open(PDocAssignFormComponent);
        modalRef.componentInstance.records = multiActionTagEvent.records;
        modalRef.componentInstance.resultObservable = formResultObservable;
        return promise;
    };
    PDocAdminActionTagService.prototype.processActionTagEventAssignJoin = function (actionTagEvent, actionTagEventEmitter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.processMultiActionTagEventAssignJoin(CommonDocActionTagService.actionTagEventToMultiActionTagEvent(actionTagEvent), CommonDocActionTagService.actionTagEventEmitterToMultiActionTagEventEmitter(actionTagEventEmitter)).then(function (value) {
                resolve(value !== undefined && value.length > 0 ? value[0] : undefined);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    PDocAdminActionTagService.prototype.processMultiActionTagEventAssignJoin = function (multiActionTagEvent, multiActionTagEventEmitter) {
        var formResultObservable = new Subject();
        var promise = this.processMultiActionFormTagEvent(multiActionTagEvent, multiActionTagEventEmitter, formResultObservable);
        var modalRef = this.modalService.open(PDocAssignJoinFormComponent);
        modalRef.componentInstance.records = multiActionTagEvent.records;
        modalRef.componentInstance.resultObservable = formResultObservable;
        return promise;
    };
    PDocAdminActionTagService.prototype.processMultiActionFormTagEvent = function (multiActionTagEvent, multiActionTagEventEmitter, formResultObservable) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var me = _this;
            multiActionTagEvent.processed = true;
            multiActionTagEvent.error = undefined;
            formResultObservable.subscribe(function (editResult) {
                multiActionTagEvent.config.payload = editResult;
                var actionTagEventPromises = [];
                var _loop_1 = function (record) {
                    var actionTagEventEmitter = new EventEmitter();
                    var actionTagEvent = {
                        config: multiActionTagEvent.config,
                        error: undefined,
                        processed: true,
                        record: record,
                        set: multiActionTagEvent.set,
                        result: undefined
                    };
                    actionTagEventEmitter.subscribe(function (data) {
                        multiActionTagEvent.results = multiActionTagEvent.results !== undefined ? multiActionTagEvent.results : [];
                        multiActionTagEvent.results.push(data.result);
                    }, function (error) {
                        multiActionTagEvent.error = error;
                    });
                    actionTagEventPromises.push(function () {
                        return me.processActionTagEventTag(actionTagEvent, actionTagEventEmitter);
                    });
                };
                for (var _i = 0, _a = multiActionTagEvent.records; _i < _a.length; _i++) {
                    var record = _a[_i];
                    _loop_1(record);
                }
                Promise_serial(actionTagEventPromises, { parallelize: 1 }).then(function () {
                    // this.router.navigate([ this.baseEditPath, 'edit', 'anonym', actionTagEvent.record.id ] );
                    multiActionTagEvent.processed = true;
                    multiActionTagEvent.error = undefined;
                    multiActionTagEventEmitter.emit(multiActionTagEvent);
                    var newUrl = _this.router.url;
                    // TODO: check this in angular 6
                    _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                        _this.router.navigateByUrl(newUrl);
                    });
                }).catch(function (reason) {
                    _this.toastr.error('Oopps... Da lief wohl was schief :-(', 'Oje');
                    multiActionTagEvent.processed = true;
                    multiActionTagEvent.error = reason;
                    multiActionTagEvent.results = undefined;
                    multiActionTagEventEmitter.emit(multiActionTagEvent);
                    reject(multiActionTagEvent.error);
                });
                formResultObservable = undefined;
            }, function (error) {
                multiActionTagEvent.processed = true;
                multiActionTagEvent.error = error;
                multiActionTagEvent.results = undefined;
                reject(multiActionTagEvent.error);
                formResultObservable = undefined;
            });
        });
    };
    PDocAdminActionTagService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, PDocDataService,
            PDocAlbumService,
            GenericAppService, NgbModal,
            ToastrService])
    ], PDocAdminActionTagService);
    return PDocAdminActionTagService;
}(PDocActionTagService));
export { PDocAdminActionTagService };
//# sourceMappingURL=pdoc-admin-actiontag.service.js.map