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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractInlineComponent } from '../inline.component';
import { FormBuilder } from '@angular/forms';
import { AngularMarkdownService } from '../../services/angular-markdown.service';
import { PlatformService } from '../../services/platform.service';
import { LayoutService } from '../../services/layout.service';
import { ToastrService } from 'ngx-toastr';
import { AngularHtmlService } from '../../services/angular-html.service';
export var TextEditorLayout;
(function (TextEditorLayout) {
    TextEditorLayout[TextEditorLayout["TOPDOWN"] = 0] = "TOPDOWN";
    TextEditorLayout[TextEditorLayout["TOPDOWNFULLSCREEN"] = 1] = "TOPDOWNFULLSCREEN";
    TextEditorLayout[TextEditorLayout["LEFTRIGHT"] = 2] = "LEFTRIGHT";
    TextEditorLayout[TextEditorLayout["LEFTRIGHTFULLSCREEN"] = 3] = "LEFTRIGHTFULLSCREEN";
})(TextEditorLayout || (TextEditorLayout = {}));
var TextEditorComponent = /** @class */ (function (_super) {
    __extends(TextEditorComponent, _super);
    function TextEditorComponent(cd, fb, angularMarkdownService, toastr, platformService, layoutService) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.fb = fb;
        _this.angularMarkdownService = angularMarkdownService;
        _this.toastr = toastr;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.TextEditorLayout = TextEditorLayout;
        _this.currentLayoutMode = TextEditorLayout.LEFTRIGHT;
        _this.descContainerLeftRightOptions = { height: '700px' };
        _this.descContainerTopDownOptions = { height: '700px' };
        _this.renderedDescContainerLeftRightOptions = { height: '1000px' };
        _this.renderedDescContainerTopDownOptions = { height: '1000px' };
        _this.flgDescRendered = false;
        _this.renderingRunning = false;
        _this.renderTimer = undefined;
        _this.lastRenderUpdate = undefined;
        _this.editFormGroup = _this.fb.group({
            descMd: '',
            descMdRecommended: '',
        });
        _this.editorCommands = {
            singleCommands: [],
            rangeCommands: [],
            commandBlocks: []
        };
        _this.autoUpdateInterval = 3000;
        _this.sampleDesc = '';
        _this.suggestedFileName = 'document.md';
        _this.descMd = '';
        _this.descMdRecommended = '';
        _this.recommendAvailable = false;
        _this.availableLayoutModes = [
            TextEditorLayout.TOPDOWN,
            TextEditorLayout.LEFTRIGHT
        ];
        _this.startLayoutMode = TextEditorLayout.LEFTRIGHT;
        _this.recommendDesc = new EventEmitter();
        _this.changeDesc = new EventEmitter();
        _this.changeRenderedDescId = new EventEmitter();
        _this.fileLoaded = new EventEmitter();
        return _this;
    }
    TextEditorComponent.prototype.ngOnInit = function () {
        var me = this;
        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(function (layoutSizeData) {
            me.onResize(layoutSizeData);
        });
        me.onResize(this.layoutSizeObservable.value);
        this.onLayoutChanged(this.startLayoutMode || TextEditorLayout.LEFTRIGHT);
        this.updateRenderInterval();
    };
    TextEditorComponent.prototype.onCallRecommendDesc = function () {
        this.recommendDesc.emit(true);
        return false;
    };
    TextEditorComponent.prototype.onInputChanged = function (value, field) {
        if (field === 'descMd') {
            this.changeDesc.emit(value);
            this.flgDescRendered = false;
        }
        return false;
    };
    TextEditorComponent.prototype.onLayoutChanged = function (layout) {
        this.currentLayoutMode = layout;
        // render after layout has changed
        var me = this;
        setTimeout(function () { me.renderDesc(true); }, 500);
        return false;
    };
    TextEditorComponent.prototype.onFileSelected = function (event) {
        for (var _i = 0, _a = event.srcElement.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.processFile(file);
        }
    };
    TextEditorComponent.prototype.onFileSave = function () {
        var filename = this.suggestedFileName;
        AngularHtmlService.browserSaveTextAsFile(this.editFormGroup.getRawValue()['descMd'] || '', filename, 'text/markdown');
        return true;
    };
    TextEditorComponent.prototype.onUseSampleDesc = function () {
        var sampleDesc = this.sampleDesc;
        this.setValue('descMd', sampleDesc);
        this.onInputChanged(sampleDesc, 'descMd');
        this.renderDesc(true);
        return false;
    };
    TextEditorComponent.prototype.useRecommendedDesc = function () {
        var descMdRecommended = this.editFormGroup.getRawValue()['descMdRecommended'] || '';
        this.setValue('descMd', descMdRecommended);
        this.onInputChanged(descMdRecommended, 'descMd');
        this.setValue('descMdRecommended', undefined);
        this.renderDesc(true);
    };
    TextEditorComponent.prototype.addSingleCommand = function (command) {
        if (!this.platformService.isClient()) {
            return;
        }
        var descId = this.getCurrentDescId();
        var textarea = document.querySelector('#' + descId);
        if (!textarea || textarea === undefined || textarea === null) {
            return;
        }
        var oldString = textarea.value;
        var startPos = textarea.selectionStart || 0;
        var newString = oldString.substring(0, startPos)
            + command.command
            + oldString.substring(startPos, oldString.length);
        this.setValue('descMd', newString);
        this.onInputChanged(newString, 'descMd');
        this.renderDesc(true);
        textarea.focus();
        textarea.selectionStart = startPos;
        textarea.selectionEnd = startPos;
    };
    TextEditorComponent.prototype.addRangeCommand = function (command) {
        if (!this.platformService.isClient()) {
            return;
        }
        var descId = this.getCurrentDescId();
        var textarea = document.querySelector('#' + descId);
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
        this.setValue('descMd', newString);
        this.onInputChanged(newString, 'descMd');
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
        if (this.renderingRunning || (this.flgDescRendered && !force)) {
            return;
        }
        var curTime = (new Date()).getTime();
        if (!force && (this.lastRenderUpdate && (curTime - this.lastRenderUpdate) < this.autoUpdateInterval)) {
            return;
        }
        this.renderingRunning = true;
        var desc = this.editFormGroup.getRawValue()['descMd'] || '';
        if (!this.platformService.isClient()) {
            this.renderingRunning = false;
            return desc;
        }
        var renderedDescId = this.getCurrentRenderedDescId();
        this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#' + renderedDescId, desc, true);
        this.renderingRunning = false;
        this.lastRenderUpdate = curTime;
        this.changeRenderedDescId.emit(renderedDescId);
        this.onResize(this.layoutSizeObservable.value);
        return '';
    };
    TextEditorComponent.prototype.updateData = function () {
        this.setValue('descMdRecommended', this.descMdRecommended);
        this.setValue('descMd', this.descMd);
        this.updateRenderInterval();
    };
    TextEditorComponent.prototype.updateRenderInterval = function () {
        if (this.renderTimer) {
            clearInterval(this.renderTimer);
        }
        if (this.autoUpdateInterval) {
            var me_1 = this;
            this.renderTimer = setInterval(function () { me_1.renderDesc(false); }, this.autoUpdateInterval);
        }
    };
    TextEditorComponent.prototype.getCurrentDescId = function () {
        var descId = 'descMdLeftRight';
        if (this.isTopDownLayout(this.currentLayoutMode)) {
            descId = 'descMdTopDown';
        }
        return descId;
    };
    TextEditorComponent.prototype.getCurrentRenderedDescId = function () {
        var descId = 'renderedDescLeftRight';
        if (this.isTopDownLayout(this.currentLayoutMode)) {
            descId = 'renderedDescTopDown';
        }
        return descId;
    };
    TextEditorComponent.prototype.isTopDownLayout = function (layout) {
        return layout !== undefined && (TextEditorLayout.TOPDOWN === layout || TextEditorLayout.TOPDOWNFULLSCREEN === layout);
    };
    TextEditorComponent.prototype.onResize = function (layoutSizeData) {
        var maxHeight = 1200;
        if (layoutSizeData.height < maxHeight + 50) {
            maxHeight = layoutSizeData.height - 50;
        }
        // leftRight
        this.descContainerLeftRightOptions = {
            height: this.calcContainerHeight(maxHeight, this.textEditorTop, this.descMdLeftRight) + 'px'
        };
        this.renderedDescContainerLeftRightOptions = {
            height: this.calcContainerHeight(maxHeight, this.textEditorTop, this.renderedDescContainerLeftRight) + 'px'
        };
        // topDown
        var offset = 0;
        if (this.descMdTopDown !== undefined && this.renderedDescContainerTopDown !== undefined) {
            offset = this.renderedDescContainerTopDown.nativeElement.getBoundingClientRect().y
                - this.textEditorTop.nativeElement.getBoundingClientRect().y
                - this.descMdTopDown.nativeElement.getBoundingClientRect().height;
        }
        var topDownHeight = ((maxHeight - offset) / 2) + 'px';
        this.descContainerTopDownOptions = { height: topDownHeight };
        this.renderedDescContainerTopDownOptions = { height: topDownHeight };
        this.cd.markForCheck();
    };
    TextEditorComponent.prototype.calcContainerHeight = function (maxHeight, anchor, container) {
        if (anchor === undefined || container === undefined) {
            return maxHeight;
        }
        return maxHeight - (container.nativeElement.getBoundingClientRect().y - anchor.nativeElement.getBoundingClientRect().y);
    };
    TextEditorComponent.prototype.processFile = function (file) {
        var me = this;
        var reader = new FileReader();
        var maxLength = 1000000;
        if (file.size > maxLength) {
            me.toastr.warning('Die Markdown-Datei darf höchstes ' + maxLength / 1000000 + 'MB sein.', 'Oje!');
            return;
        }
        if (!file.name.toLowerCase().endsWith('.md')) {
            me.toastr.warning('Es dürfen nur .md Dateien geladen werden.', 'Oje!');
            return;
        }
        reader.onload = (function (theFile) {
            return function (e) {
                var src = e.target.result;
                me.setValue('descMd', src);
                me.onInputChanged(src, 'descMd');
                me.fileLoaded.emit(file.name);
            };
        })(file);
        // Read in the file as a data URL.
        reader.readAsText(file);
    };
    __decorate([
        ViewChild('textEditorTop'),
        __metadata("design:type", ElementRef)
    ], TextEditorComponent.prototype, "textEditorTop", void 0);
    __decorate([
        ViewChild('descMdLeftRight'),
        __metadata("design:type", ElementRef)
    ], TextEditorComponent.prototype, "descMdLeftRight", void 0);
    __decorate([
        ViewChild('renderedDescContainerLeftRight'),
        __metadata("design:type", ElementRef)
    ], TextEditorComponent.prototype, "renderedDescContainerLeftRight", void 0);
    __decorate([
        ViewChild('descMdTopDown'),
        __metadata("design:type", ElementRef)
    ], TextEditorComponent.prototype, "descMdTopDown", void 0);
    __decorate([
        ViewChild('renderedDescContainerTopDown'),
        __metadata("design:type", ElementRef)
    ], TextEditorComponent.prototype, "renderedDescContainerTopDown", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "editorCommands", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "autoUpdateInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "sampleDesc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "suggestedFileName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "descMd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "descMdRecommended", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "recommendAvailable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TextEditorComponent.prototype, "availableLayoutModes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextEditorComponent.prototype, "startLayoutMode", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "recommendDesc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "changeDesc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "changeRenderedDescId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextEditorComponent.prototype, "fileLoaded", void 0);
    TextEditorComponent = __decorate([
        Component({
            selector: 'app-text-editor',
            templateUrl: './text-editor.component.html',
            styleUrls: ['./text-editor.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            FormBuilder,
            AngularMarkdownService, ToastrService,
            PlatformService, LayoutService])
    ], TextEditorComponent);
    return TextEditorComponent;
}(AbstractInlineComponent));
export { TextEditorComponent };
//# sourceMappingURL=text-editor.component.js.map