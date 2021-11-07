var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
import { EventEmitter, Input, Output } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { AppState } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var CommonDocLinkedPlaylistsComponent = /** @class */ (function (_super) {
    __extends(CommonDocLinkedPlaylistsComponent, _super);
    function CommonDocLinkedPlaylistsComponent(sanitizer, commonRoutingService, cdocRoutingService, appService, actionTagService, toastr, cdocDataService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.sanitizer = sanitizer;
        _this.commonRoutingService = commonRoutingService;
        _this.cdocRoutingService = cdocRoutingService;
        _this.appService = appService;
        _this.actionTagService = actionTagService;
        _this.toastr = toastr;
        _this.cdocDataService = cdocDataService;
        _this.cd = cd;
        _this.appendAvailable = false;
        _this.editAvailable = false;
        _this.showAvailable = false;
        _this.maxPlaylistValues = {};
        _this.small = false;
        _this.actionTagEvent = new EventEmitter();
        return _this;
    }
    CommonDocLinkedPlaylistsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
                _this.updateData();
            }
        });
    };
    CommonDocLinkedPlaylistsComponent.prototype.submitShow = function (event, linkedPlaylist) {
        this.commonRoutingService.navigateByUrl(this.getUrl(linkedPlaylist));
        return false;
    };
    CommonDocLinkedPlaylistsComponent.prototype.submitChangePosition = function (event, linkedPlaylist) {
        this.processAction({ config: {
                key: 'assignplaylist',
                name: 'assignplaylist',
                shortName: 'assignplaylist',
                type: 'assignplaylist',
                payload: {
                    playlistkey: linkedPlaylist.name,
                    set: true,
                    position: linkedPlaylist.position
                },
                showFilter: [],
                configAvailability: [],
                multiRecordTag: false,
                recordAvailability: [],
                profileAvailability: []
            },
            set: true,
            record: this.record,
            processed: false,
            error: undefined,
            result: undefined });
        return false;
    };
    CommonDocLinkedPlaylistsComponent.prototype.submitAddToPlaylist = function (event) {
        this.processAction({ config: {
                key: 'assignplaylist',
                name: 'assignplaylist',
                shortName: 'assignplaylist',
                type: 'assignplaylist',
                payload: {
                    playlistkey: undefined,
                    set: true,
                    position: undefined
                },
                showFilter: [],
                configAvailability: [],
                multiRecordTag: false,
                recordAvailability: [],
                profileAvailability: []
            },
            set: true,
            record: this.record,
            processed: false,
            error: undefined,
            result: undefined });
        return false;
    };
    CommonDocLinkedPlaylistsComponent.prototype.processAction = function (actionTagEvent) {
        var _this = this;
        return this.actionTagService.processActionTagEvent(actionTagEvent, this.actionTagEvent).then(function (value) {
            _this.updateData();
        }).catch(function (reason) {
            _this.toastr.error('Es gibt leider Probleme - am besten noch einmal probieren :-(', 'Oje!');
        });
    };
    CommonDocLinkedPlaylistsComponent.prototype.getShowUrl = function (linkedPlaylist) {
        return this.sanitizer.bypassSecurityTrustUrl(this.getUrl(linkedPlaylist));
    };
    CommonDocLinkedPlaylistsComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.appendAvailable = componentConfig.appendAvailable;
        this.editAvailable = componentConfig.editAvailable;
        this.showAvailable = componentConfig.showAvailable;
    };
    CommonDocLinkedPlaylistsComponent.prototype.getComponentConfig = function (config) {
        var appendAvailable = false;
        if (BeanUtils.getValue(config, 'components.cdoc-linked-playlists.appendAvailable')) {
            appendAvailable = BeanUtils.getValue(config, 'components.cdoc-linked-playlists.appendAvailable');
        }
        var editAvailable = false;
        if (BeanUtils.getValue(config, 'components.cdoc-linked-playlists.editAvailable')) {
            editAvailable = BeanUtils.getValue(config, 'components.cdoc-linked-playlists.editAvailable');
        }
        var showAvailable = false;
        if (BeanUtils.getValue(config, 'components.cdoc-linked-playlists.showAvailable')) {
            showAvailable = BeanUtils.getValue(config, 'components.cdoc-linked-playlists.showAvailable');
        }
        return {
            editAvailable: editAvailable,
            appendAvailable: appendAvailable,
            showAvailable: showAvailable
        };
    };
    CommonDocLinkedPlaylistsComponent.prototype.getUrl = function (linkedPlaylist) {
        return this.cdocRoutingService.getShowUrl(this.cdocDataService.newRecord({ id: 'PLAYLIST_' + linkedPlaylist.refId,
            name: linkedPlaylist.name, type: 'PLAYLIST' }), '');
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof R !== "undefined" && R) === "function" && _a || Object)
    ], CommonDocLinkedPlaylistsComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocLinkedPlaylistsComponent.prototype, "small", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocLinkedPlaylistsComponent.prototype, "actionTagEvent", void 0);
    return CommonDocLinkedPlaylistsComponent;
}(AbstractInlineComponent));
export { CommonDocLinkedPlaylistsComponent };
//# sourceMappingURL=cdoc-linked-playlists.component.js.map