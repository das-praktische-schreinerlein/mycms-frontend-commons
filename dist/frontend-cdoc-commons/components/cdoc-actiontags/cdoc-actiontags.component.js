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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ActionTagUtils } from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import { CommonDocAlbumService } from '../../services/cdoc-album.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { CommonDocContentUtils } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
var CommonDocActionTagsComponent = /** @class */ (function (_super) {
    __extends(CommonDocActionTagsComponent, _super);
    function CommonDocActionTagsComponent(appService, contentUtils, cdocAlbumService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.contentUtils = contentUtils;
        _this.cdocAlbumService = cdocAlbumService;
        _this.cd = cd;
        _this.item = {
            currentRecord: undefined,
            styleClassFor: undefined,
            thumbnailUrl: undefined,
            previewUrl: undefined,
            fullUrl: undefined,
            image: undefined,
            video: undefined,
            urlShow: undefined
        };
        _this.tagConfigs = [];
        _this.tags = [];
        _this.styleClass = '';
        _this.toggleClass = 'hideInactive';
        return _this;
    }
    CommonDocActionTagsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                _this.config = _this.appService.getAppConfig();
                _this.configureComponent(_this.config);
                _this.updateData();
            }
        });
    };
    CommonDocActionTagsComponent.prototype.setTag = function (tag) {
        this.actionTagEvent.emit({ config: tag.config, set: true, record: this.record, processed: false, error: undefined,
            result: undefined });
        return false;
    };
    CommonDocActionTagsComponent.prototype.unsetTag = function (tag) {
        this.actionTagEvent.emit({ config: tag.config, set: false, record: this.record, processed: false, error: undefined,
            result: undefined });
        return false;
    };
    CommonDocActionTagsComponent.prototype.hideInactive = function () {
        if (this.tags.length > 4) {
            this.toggleClass = 'hideInactive';
        }
        else {
            this.toggleClass = 'showInactive';
        }
    };
    CommonDocActionTagsComponent.prototype.showInactive = function () {
        this.toggleClass = 'showInactive';
    };
    CommonDocActionTagsComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.cdoc-actions.actionTags')) {
            return {
                tagConfigs: config['components']['cdoc-actions']['actionTags']
            };
        }
        else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    };
    CommonDocActionTagsComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.tagConfigs = componentConfig.tagConfigs;
    };
    CommonDocActionTagsComponent.prototype.updateData = function () {
        this.contentUtils.updateItemData(this.item, this.record, 'default');
        if (this.record === undefined) {
            this.tags = [];
        }
        else {
            this.cdocAlbumService.initAlbenForDocId(this.item.currentRecord);
            this.tags = ActionTagUtils.generateTags(this.tagConfigs, this.item.currentRecord, this.config, { type: this.type });
        }
        this.hideInactive();
        if (this.type === 'actionTagsBig') {
            this.styleClass = 'btn-navigation';
        }
        else {
            this.styleClass = '';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", CommonDocRecord)
    ], CommonDocActionTagsComponent.prototype, "record", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocActionTagsComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", EventEmitter)
    ], CommonDocActionTagsComponent.prototype, "actionTagEvent", void 0);
    CommonDocActionTagsComponent = __decorate([
        Component({
            selector: 'app-cdoc-actiontags',
            templateUrl: './cdoc-actiontags.component.html',
            styleUrls: ['./cdoc-actiontags.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, CommonDocContentUtils,
            CommonDocAlbumService, ChangeDetectorRef])
    ], CommonDocActionTagsComponent);
    return CommonDocActionTagsComponent;
}(AbstractInlineComponent));
export { CommonDocActionTagsComponent };
//# sourceMappingURL=cdoc-actiontags.component.js.map