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
import { EventEmitter, Input, Output } from '@angular/core';
import { AppState } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ActionTagUtils } from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocMultiActionManager } from '../../services/cdoc-multiaction.manager';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
var CommonDocMultiActionHeaderComponent = /** @class */ (function (_super) {
    __extends(CommonDocMultiActionHeaderComponent, _super);
    function CommonDocMultiActionHeaderComponent(appService, contentUtils, cd) {
        var _this = _super.call(this, cd) || this;
        _this.appService = appService;
        _this.contentUtils = contentUtils;
        _this.cd = cd;
        _this.tagConfigs = [];
        _this.tags = [];
        _this.tagsValues = [];
        _this.tagsOptions = [];
        _this.tagsSettings = { dynamicTitleMaxItems: 5,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm',
            containerClasses: 'dropdown-inline',
            enableSearch: true,
            showUncheckAll: true,
            autoUnselect: true,
            selectionLimit: 1
        };
        _this.tagsTexts = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Aktion ausgewählt',
            checkedPlural: 'Aktion ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'Alle' };
        _this.inputParamValue = '';
        _this.selectParamValues = [];
        _this.selectParamOptions = [];
        _this.selectParamSettings = { dynamicTitleMaxItems: 5,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm',
            containerClasses: 'dropdown-inline',
            enableSearch: true,
            showUncheckAll: true,
            autoUnselect: false,
            selectionLimit: 0
        };
        _this.selectParamTexts = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Keyword ausgewählt',
            checkedPlural: 'Keyword ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '--',
            allSelected: 'Alle' };
        _this.flgShowInputParam = false;
        _this.flgShowSelectParam = false;
        _this.flgRecordsSelected = false;
        _this.submitSelectedMultiActions = new EventEmitter();
        return _this;
    }
    CommonDocMultiActionHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                _this.config = _this.appService.getAppConfig();
                _this.configureComponent(_this.config);
                _this.updateData();
            }
        });
    };
    CommonDocMultiActionHeaderComponent.prototype.onInputParamValue = function (event) {
        this.inputParamValue = event.target.value;
        this.doProcessAdditionalParameters();
        return true;
    };
    CommonDocMultiActionHeaderComponent.prototype.onSelectParamValue = function (event) {
        this.doProcessAdditionalParameters();
        return true;
    };
    CommonDocMultiActionHeaderComponent.prototype.onCheckAll = function (event) {
        var _this = this;
        if (this.searchResult) {
            this.searchResult.currentRecords.map(function (record) {
                if (event.target.checked) {
                    _this.multiActionManager.appendRecordToMultiActionTag(record);
                }
                else {
                    _this.multiActionManager.removeRecordFromMultiActionTag(record);
                }
            });
            // signal a change
            this.multiActionManager.setSelectedMultiActionTags(this.multiActionManager.getSelectedMultiActionTags());
        }
        return true;
    };
    CommonDocMultiActionHeaderComponent.prototype.onChangeSelectedMultiAction = function (event) {
        var _this = this;
        var actionTagConfigs = [];
        this.flgShowInputParam = false;
        this.flgShowSelectParam = false;
        this.tagsValues = StringUtils.uniqueKeywords(this.tagsValues.join(','));
        var _loop_1 = function (tagKey) {
            var actionTag = this_1.tags.find(function (value) { return value.config.key === tagKey; });
            if (actionTag) {
                var multiConfig = actionTag.config;
                actionTagConfigs.push(multiConfig);
                if (multiConfig.flgUseInput) {
                    this_1.flgShowInputParam = true;
                    this_1.inputParamValue = multiConfig.payload[multiConfig.inputFieldName];
                }
                if (multiConfig.flgUseSelect) {
                    this_1.flgShowSelectParam = true;
                    this_1.selectParamOptions = [];
                    this_1.selectParamValues = [];
                    if (Array.isArray(multiConfig.selectParameterConstants)) {
                        multiConfig.selectParameterConstants.map(function (value) {
                            _this.selectParamOptions.push({ id: value[0], name: value[1] });
                        });
                    }
                    else if (multiConfig.selectParameterValueListKey && this_1.selectValueMap &&
                        Array.isArray(this_1.selectValueMap.get(multiConfig.selectParameterValueListKey))) {
                        this_1.selectValueMap.get(multiConfig.selectParameterValueListKey).map(function (value) {
                            _this.selectParamOptions.push(value);
                        });
                    }
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.tagsValues; _i < _a.length; _i++) {
            var tagKey = _a[_i];
            _loop_1(tagKey);
        }
        this.multiActionManager.setSelectedMultiActionTags(actionTagConfigs);
        this.flgRecordsSelected = this.multiActionManager.getSelectedRecords().length > 0
            && this.multiActionManager.getSelectedMultiActionTags().length > 0;
        this.cd.markForCheck();
        return false;
    };
    CommonDocMultiActionHeaderComponent.prototype.onSubmitSelectedMultiActions = function (event) {
        this.submitSelectedMultiActions.emit(this.multiActionManager.getSelectedMultiActionTags());
        return false;
    };
    CommonDocMultiActionHeaderComponent.prototype.doProcessAdditionalParameters = function () {
        var _this = this;
        this.multiActionManager.getSelectedMultiActionTags().forEach(function (multiConfig) {
            if (multiConfig.flgUseSelect && multiConfig.flgUseInput) {
                _this.flgShowSelectParam = true;
                _this.flgShowInputParam = true;
                multiConfig.payload[multiConfig.inputFieldName] =
                    StringUtils.mergeKeywords(_this.inputParamValue, _this.selectParamValues.join(','), false);
            }
            else if (multiConfig.flgUseInput) {
                _this.flgShowInputParam = true;
                _this.flgShowSelectParam = false;
                multiConfig.payload[multiConfig.inputFieldName] = StringUtils.mergeKeywords(_this.inputParamValue, '', false);
            }
            else if (multiConfig.flgUseSelect) {
                _this.flgShowInputParam = false;
                _this.flgShowSelectParam = true;
                multiConfig.payload[multiConfig.inputFieldName] = StringUtils.mergeKeywords(_this.selectParamValues.join(','), '', false);
            }
        });
        this.cd.markForCheck();
    };
    CommonDocMultiActionHeaderComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.cdoc-multiactionheader.actionTags')) {
            return {
                tagConfigs: config['components']['cdoc-multiactionheader']['actionTags']
            };
        }
        else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    };
    CommonDocMultiActionHeaderComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.tagConfigs = componentConfig.tagConfigs;
    };
    CommonDocMultiActionHeaderComponent.prototype.updateData = function () {
        var _this = this;
        this.tagsOptions = [];
        if (this.searchResult === undefined) {
            this.tags = [];
        }
        else {
            this.tags = ActionTagUtils.generateTagsForRecords(this.tagConfigs, this.searchResult.currentRecords, this.config, { type: this.type });
            this.tags.map(function (value) {
                if (value.available) {
                    _this.tagsOptions.push({ id: value.config.key, name: value.config.name });
                }
            });
            if (this.multiActionManager) {
                if (this.searchResult.currentRecords !== undefined && this.multiActionManager.getSelectedRecords().length > 0) {
                    var recordToFind_1 = new Map();
                    this.multiActionManager.getSelectedRecords().map(function (value) {
                        recordToFind_1.set(value.id, value);
                    });
                    var idx = 0;
                    while (idx < this.searchResult.currentRecords.length && recordToFind_1.size > 0) {
                        var record = this.searchResult.currentRecords[idx];
                        if (recordToFind_1.has(record.id)) {
                            recordToFind_1.delete(record.id);
                        }
                        idx++;
                    }
                    recordToFind_1.forEach(function (record) {
                        _this.multiActionManager.removeRecordFromMultiActionTag(record);
                    });
                }
                this.multiActionManager.getSelectedRecordsObservable().subscribe(function (value) {
                    _this.flgRecordsSelected = _this.multiActionManager.getSelectedRecords().length > 0
                        && _this.multiActionManager.getSelectedMultiActionTags().length > 0;
                    _this.cd.markForCheck();
                });
            }
        }
        this.cd.markForCheck();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CommonDocMultiActionHeaderComponent.prototype, "searchResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CommonDocMultiActionManager)
    ], CommonDocMultiActionHeaderComponent.prototype, "multiActionManager", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Map)
    ], CommonDocMultiActionHeaderComponent.prototype, "selectValueMap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CommonDocMultiActionHeaderComponent.prototype, "type", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CommonDocMultiActionHeaderComponent.prototype, "submitSelectedMultiActions", void 0);
    return CommonDocMultiActionHeaderComponent;
}(AbstractInlineComponent));
export { CommonDocMultiActionHeaderComponent };
//# sourceMappingURL=cdoc-multiactionheader.component.js.map