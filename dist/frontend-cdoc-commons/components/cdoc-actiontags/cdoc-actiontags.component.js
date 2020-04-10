"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var actiontag_utils_1 = require("@dps/mycms-commons/dist/commons/utils/actiontag.utils");
var cdoc_album_service_1 = require("../../services/cdoc-album.service");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var cdoc_contentutils_service_1 = require("../../services/cdoc-contentutils.service");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var cdoc_entity_record_1 = require("@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record");
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
            if (appState === generic_app_service_1.AppState.Ready) {
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
        if (bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-actions.actionTags')) {
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
            this.tags = actiontag_utils_1.ActionTagUtils.generateTags(this.tagConfigs, this.item.currentRecord, this.config, { type: this.type });
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
        core_1.Input(),
        __metadata("design:type", cdoc_entity_record_1.CommonDocRecord)
    ], CommonDocActionTagsComponent.prototype, "record", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocActionTagsComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocActionTagsComponent.prototype, "actionTagEvent", void 0);
    CommonDocActionTagsComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-actiontags',
            templateUrl: './cdoc-actiontags.component.html',
            styleUrls: ['./cdoc-actiontags.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [generic_app_service_1.GenericAppService, cdoc_contentutils_service_1.CommonDocContentUtils,
            cdoc_album_service_1.CommonDocAlbumService, core_1.ChangeDetectorRef])
    ], CommonDocActionTagsComponent);
    return CommonDocActionTagsComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocActionTagsComponent = CommonDocActionTagsComponent;
//# sourceMappingURL=cdoc-actiontags.component.js.map