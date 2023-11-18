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
import { Injectable } from '@angular/core';
import { LayoutUtils } from './layout.utils';
import { PdfGenerator, PdfPrintService } from './pdf-print.service';
import { PrintService } from './print.service';
var SimplePdfPrintService = /** @class */ (function (_super) {
    __extends(SimplePdfPrintService, _super);
    function SimplePdfPrintService(printService, pdfGenerator) {
        var _this = _super.call(this) || this;
        _this.printService = printService;
        _this.pdfGenerator = pdfGenerator;
        return _this;
    }
    SimplePdfPrintService.prototype.printPdf = function (options) {
        var _this = this;
        var printWindow = this.printService.openPrintPreview(options);
        if (!printWindow) {
            return undefined;
        }
        var previewContainerId = 'printPreview';
        var printDocument = printWindow.document;
        var previewContainer = LayoutUtils.extractElementForFilter(printDocument, 'ID', previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            return undefined;
        }
        var printElement = LayoutUtils.extractElementForFilter(printDocument, options.printElementFilter.type, options.printElementFilter.value);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            return undefined;
        }
        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, options)) {
            console.error('error while preparing print-preview');
            return undefined;
        }
        // wait to load all styles;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.pdfGenerator.generatePdf(printWindow, printElement, options).then(function () {
                    printWindow.close();
                    resolve(printWindow);
                });
            }, options.waitForRenderingMs);
        });
    };
    SimplePdfPrintService.prototype.preparePrintPreviewDocumentForPrint = function (printWindow, printDocument, previewContainer, printElement, options) {
        var style = previewContainer.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }
        style += 'display: block; width:' + ((options.previewWindow && options.previewWindow.width) || window.innerWidth) + 'px';
        previewContainer.setAttribute('style', style);
        return true;
    };
    SimplePdfPrintService.prototype.isPrintPdfAvailable = function () {
        return this.pdfGenerator.isPrintPdfAvailable();
    };
    SimplePdfPrintService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PrintService, PdfGenerator])
    ], SimplePdfPrintService);
    return SimplePdfPrintService;
}(PdfPrintService));
export { SimplePdfPrintService };
//# sourceMappingURL=simple-pdf-print.service.js.map