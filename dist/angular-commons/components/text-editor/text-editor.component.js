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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractInlineComponent } from '../inline.component';
import { FormBuilder } from '@angular/forms';
import { AngularMarkdownService } from '../../services/angular-markdown.service';
import { PlatformService } from '../../services/platform.service';
// TODO move to commons
var TextEditorComponent = /** @class */ (function (_super) {
    __extends(TextEditorComponent, _super);
    function TextEditorComponent(cd, fb, angularMarkdownService, platformService) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.fb = fb;
        _this.angularMarkdownService = angularMarkdownService;
        _this.platformService = platformService;
        _this.flgDescRendered = false;
        _this.editFormGroup = _this.fb.group({
            descTxt: '',
            descTxtRecommended: '',
        });
        _this.editorCommands = {
            singleCommands: [],
            rangeCommands: []
        };
        _this.descTxt = '';
        _this.descTxtRecommended = '';
        _this.recommendAvailable = false;
        _this.recommendDesc = new EventEmitter();
        _this.changeDesc = new EventEmitter();
        return _this;
    }
    TextEditorComponent.prototype.onCallRecommendDesc = function () {
        this.recommendDesc.emit(true);
        return false;
    };
    TextEditorComponent.prototype.onInputChanged = function (value, field) {
        if (field === 'descTxt') {
            this.changeDesc.emit(value);
        }
        return false;
    };
    TextEditorComponent.prototype.useRecommendedDesc = function () {
        var descTxtRecommended = this.editFormGroup.getRawValue()['descTxtRecommended'] || '';
        this.setValue('descTxt', descTxtRecommended);
        this.onInputChanged(descTxtRecommended, 'descTxt');
        this.setValue('descTxtRecommended', undefined);
        this.renderDesc(true);
    };
    TextEditorComponent.prototype.addSingleCommand = function (command) {
        if (!this.platformService.isClient()) {
            return;
        }
        var textarea = document.querySelector('#descTxt');
        if (!textarea || textarea === undefined || textarea === null) {
            return;
        }
        var oldString = textarea.value;
        var startPos = textarea.selectionStart || 0;
        var newString = oldString.substring(0, startPos)
            + command.command
            + oldString.substring(startPos, oldString.length);
        this.setValue('descTxt', newString);
        this.renderDesc(true);
        textarea.focus();
        textarea.selectionStart = startPos;
        textarea.selectionEnd = startPos;
    };
    TextEditorComponent.prototype.addRangeCommand = function (command) {
        if (!this.platformService.isClient()) {
            return;
        }
        var textarea = document.querySelector('#descTxt');
        if (!textarea || textarea === undefined || textarea === null) {
            return;
        }
        var oldString = textarea.value;
        var startPos = textarea.selectionStart || 0;
        var endPos = textarea.selectionEnd || 0;
        var newString = oldString.substring(0, startPos)
            + command.commandStart
            + oldString.substring(startPos, endPos)
            + command.commandEnd
            + oldString.substring(endPos, oldString.length);
        this.setValue('descTxt', newString);
        this.renderDesc(true);
        textarea.focus();
        textarea.selectionStart = startPos;
        textarea.selectionEnd = startPos;
    };
    TextEditorComponent.prototype.setValue = function (field, value) {
        var config = {};
        config[field] = value;
        this.editFormGroup.patchValue(config);
    };
    TextEditorComponent.prototype.renderDesc = function (force) {
        if (this.flgDescRendered && !force) {
            return;
        }
        var desc = this.editFormGroup.getRawValue()['descTxt'] || '';
        if (!this.platformService.isClient()) {
            return desc;
        }
        this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#renderedDesc', desc, true);
        return '';
    };
    TextEditorComponent.prototype.updateData = function () {
        this.setValue('descTxtRecommended', this.descTxtRecommended);
        this.setValue('descTxt', this.descTxt);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "editorCommands", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "descTxt", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "descTxtRecommended", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "recommendAvailable", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "recommendDesc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "changeDesc", void 0);
    TextEditorComponent = __decorate([
        Component({
            selector: 'app-text-editor',
            templateUrl: './text-editor.component.html',
            styleUrls: ['./text-editor.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            FormBuilder,
            AngularMarkdownService,
            PlatformService])
    ], TextEditorComponent);
    return TextEditorComponent;
}(AbstractInlineComponent));
export { TextEditorComponent };
//# sourceMappingURL=text-editor.component.js.map