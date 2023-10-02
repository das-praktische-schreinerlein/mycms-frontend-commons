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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { FormBuilder } from '@angular/forms';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
var OdImageEditorComponent = /** @class */ (function (_super) {
    __extends(OdImageEditorComponent, _super);
    function OdImageEditorComponent(cd, fb) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.fb = fb;
        _this.editFormGroup = _this.fb.group(OdImageEditorComponent_1.EDITABLE_FIELDS.reduce(function (map, obj) {
            map['imgobj_' + obj] = {};
            return map;
        }, {}));
        _this.imageWidth = 0;
        _this.rect = {};
        _this.drag = false;
        _this.ctx = undefined;
        _this.mainImageUrl = undefined;
        _this.mainImageObject = undefined;
        _this.changeValue = new EventEmitter();
        return _this;
    }
    OdImageEditorComponent_1 = OdImageEditorComponent;
    OdImageEditorComponent.prototype.onInputChanged = function (value, field) {
        if (field.startsWith('imgobj_')) {
            this.submitChangedValues();
        }
        return false;
    };
    OdImageEditorComponent.prototype.onLoadMainImage = function () {
        if (this.mainImage !== undefined) {
            this.mainImageCanvas.nativeElement.height = this.mainImage.nativeElement.height;
            this.mainImageCanvas.nativeElement.width = this.mainImage.nativeElement.width;
            this.imageWidth = this.mainImage.nativeElement['width'];
            this.ctx = this.mainImageCanvas.nativeElement.getContext('2d');
            this.ctx.drawImage(this.mainImage.nativeElement, 0, 0);
            this.updateImageObject();
            this.cd.markForCheck();
        }
        return false;
    };
    OdImageEditorComponent.prototype.onResizeMainImage = function () {
        if (this.mainImage !== undefined && this.mainImage.nativeElement['width'] !== this.imageWidth) {
            this.imageWidth = this.mainImage.nativeElement['width'];
            this.updateImageObject();
            this.cd.markForCheck();
        }
        return false;
    };
    OdImageEditorComponent.prototype.updateImageObject = function () {
        if (this.mainImage && this.mainImage.nativeElement['width']) {
            if (!BeanUtils.getValue(this.editFormGroup.getRawValue(), 'imgobj_imgWidth')) {
                this.setValue('imgobj_imgWidth', this.mainImage.nativeElement['width']);
            }
            if (!BeanUtils.getValue(this.editFormGroup.getRawValue(), 'imgobj_imgHeight')) {
                this.setValue('imgobj_imgHeight', this.mainImage.nativeElement['height']);
            }
        }
        return false;
    };
    OdImageEditorComponent.prototype.setValue = function (field, value) {
        var config = {};
        config[field] = value;
        this.editFormGroup.patchValue(config);
    };
    OdImageEditorComponent.prototype.onMouseDown = function (event) {
        if (this.rect.h !== 0 || this.rect.w !== 0) {
            this.ctx.drawImage(this.mainImage.nativeElement, 0, 0);
        }
        this.rect.startX = event.offsetX;
        this.rect.startY = event.offsetY;
        this.rect.w = 0;
        this.rect.h = 0;
        this.drag = true;
        return false;
    };
    OdImageEditorComponent.prototype.onMouseUp = function (event) {
        this.drag = false;
        var calcFactor = BeanUtils.getValue(this.editFormGroup.getRawValue(), 'imgobj_imgWidth') / this.imageWidth;
        this.setValue('imgobj_objWidth', this.rect.w * calcFactor);
        this.setValue('imgobj_objHeight', this.rect.h * calcFactor);
        this.setValue('imgobj_objX', this.rect.startX * calcFactor);
        this.setValue('imgobj_objY', this.rect.startY * calcFactor);
        this.submitChangedValues();
        return false;
    };
    OdImageEditorComponent.prototype.onMouseMove = function (event) {
        if (this.drag) {
            this.rect.w = event.offsetX - this.rect.startX;
            this.rect.h = event.offsetY - this.rect.startY;
            this.draw();
        }
        return false;
    };
    OdImageEditorComponent.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    };
    OdImageEditorComponent.prototype.updateData = function () {
        var formValueConfig = {};
        for (var _i = 0, _a = OdImageEditorComponent_1.EDITABLE_FIELDS; _i < _a.length; _i++) {
            var editablefield = _a[_i];
            formValueConfig['imgobj_' + editablefield] = this.mainImageObject
                ? [this.mainImageObject[editablefield]]
                : [];
        }
        this.editFormGroup = this.fb.group(formValueConfig);
        this.onLoadMainImage();
    };
    OdImageEditorComponent.prototype.submitChangedValues = function () {
        var values = __assign({}, this.mainImageObject);
        for (var _i = 0, _a = OdImageEditorComponent_1.EDITABLE_FIELDS; _i < _a.length; _i++) {
            var editableField = _a[_i];
            values[editableField] = BeanUtils.getValue(this.editFormGroup.getRawValue(), 'imgobj_' + editableField);
        }
        this.changeValue.emit(values);
    };
    var OdImageEditorComponent_1;
    OdImageEditorComponent.EDITABLE_FIELDS = [
        'imgWidth',
        'imgHeight',
        'objX',
        'objY',
        'objWidth',
        'objHeight',
        'precision'
    ];
    __decorate([
        ViewChild('mainImage'),
        __metadata("design:type", ElementRef)
    ], OdImageEditorComponent.prototype, "mainImage", void 0);
    __decorate([
        ViewChild('mainImageCanvas'),
        __metadata("design:type", ElementRef)
    ], OdImageEditorComponent.prototype, "mainImageCanvas", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OdImageEditorComponent.prototype, "mainImageUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OdImageEditorComponent.prototype, "mainImageObject", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OdImageEditorComponent.prototype, "changeValue", void 0);
    OdImageEditorComponent = OdImageEditorComponent_1 = __decorate([
        Component({
            selector: 'app-odimage-editor',
            templateUrl: './odimage-editor.component.html',
            styleUrls: ['./odimage-editor.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            FormBuilder])
    ], OdImageEditorComponent);
    return OdImageEditorComponent;
}(AbstractInlineComponent));
export { OdImageEditorComponent };
//# sourceMappingURL=odimage-editor.component.js.map