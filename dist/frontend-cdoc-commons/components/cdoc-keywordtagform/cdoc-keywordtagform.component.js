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
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var Subject_1 = require("rxjs/Subject");
var component_utils_1 = require("../../../angular-commons/services/component.utils");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var CommonDocKeywordTagFormComponent = /** @class */ (function (_super) {
    __extends(CommonDocKeywordTagFormComponent, _super);
    function CommonDocKeywordTagFormComponent(fb, activeModal, cd, toastr) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.activeModal = activeModal;
        _this.cd = cd;
        _this.toastr = toastr;
        _this.lastRecords = undefined;
        _this.editPrefix = '';
        _this.keywordSuggestions = [];
        _this.validForSubmit = false;
        _this.showLoadingSpinner = false;
        _this.keywordFormGroup = _this.fb.group({
            keywords: ''
        });
        return _this;
    }
    CommonDocKeywordTagFormComponent.prototype.ngOnInit = function () {
        this.updateData();
    };
    CommonDocKeywordTagFormComponent.prototype.onCancel = function () {
        this.activeModal.close('Cancel click');
        this.resultObservable.error('canceled');
        return false;
    };
    CommonDocKeywordTagFormComponent.prototype.onSubmitKeywordKey = function (set) {
        if (!this.checkFormAndSetValidFlag()) {
            return false;
        }
        var me = this;
        var event = {
            action: 'keyword',
            ids: me.records.map(function (value) { return value.id; }),
            keywords: this.keywordFormGroup.getRawValue()['keywords'],
            keywordAction: set ? 'set' : 'unset'
        };
        this.resultObservable.next(event);
        this.activeModal.close('Save click');
        return false;
    };
    CommonDocKeywordTagFormComponent.prototype.setKeyword = function (keyword) {
        var keywords = this.keywordFormGroup.getRawValue()['keywords'];
        if (keywords && keywords.length > 0) {
            keywords = keywords + ', ' + keyword;
        }
        else {
            keywords = keyword;
        }
        this.keywordFormGroup.patchValue({ keywords: keywords });
        this.checkFormAndSetValidFlag();
    };
    CommonDocKeywordTagFormComponent.prototype.unsetKeyword = function (keyword) {
        var keywords = this.keywordFormGroup.getRawValue()['keywords'];
        if (keywords.length > 0) {
            keywords = keywords.replace(new RegExp(' ' + keyword + ','), '')
                .replace(new RegExp('^' + keyword + ', '), '')
                .replace(new RegExp(', ' + keyword + '$'), '')
                .replace(new RegExp('^' + keyword + '$'), '');
        }
        this.keywordFormGroup.patchValue({ keywords: keywords });
        this.checkFormAndSetValidFlag();
    };
    CommonDocKeywordTagFormComponent.prototype.updateData = function () {
        var changes = {};
        changes['records'] = new core_1.SimpleChange(this.records, this.lastRecords, false);
        if (this.records != null && !component_utils_1.ComponentUtils.hasNgChanged(changes)) {
            return;
        }
        this.lastRecords = this.records;
        this.validForSubmit = false;
        this.keywordFormGroup.patchValue({ keywords: '' });
        this.updateKeywordSuggestions();
        this.checkFormAndSetValidFlag();
    };
    CommonDocKeywordTagFormComponent.prototype.getComponentConfig = function (config) {
        var prefix = '';
        if (bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.editPrefix')) {
            prefix = bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-keywords.editPrefix');
        }
        return {
            editPrefix: prefix
        };
    };
    CommonDocKeywordTagFormComponent.prototype.updateKeywordSuggestions = function () {
        var suggestions = [];
        for (var _i = 0, _a = this.records; _i < _a.length; _i++) {
            var record = _a[_i];
            if (record.keywords !== undefined) {
                suggestions = suggestions.concat(record.keywords.replace(/ /g, '').split(','));
            }
        }
        this.keywordSuggestions = suggestions;
        return true;
    };
    CommonDocKeywordTagFormComponent.prototype.checkForm = function () {
        if (this.keywordFormGroup.getRawValue()['keywords'].length > 0) {
            return true;
        }
        return false;
    };
    CommonDocKeywordTagFormComponent.prototype.checkFormAndSetValidFlag = function (event) {
        if (this.checkForm()) {
            this.validForSubmit = true;
            this.cd.markForCheck();
            return true;
        }
        else {
            this.validForSubmit = false;
            this.cd.markForCheck();
            return false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocKeywordTagFormComponent.prototype, "records", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Subject_1.Subject)
    ], CommonDocKeywordTagFormComponent.prototype, "resultObservable", void 0);
    return CommonDocKeywordTagFormComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocKeywordTagFormComponent = CommonDocKeywordTagFormComponent;
//# sourceMappingURL=cdoc-keywordtagform.component.js.map