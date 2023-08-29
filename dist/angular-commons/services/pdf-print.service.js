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
import { Injectable } from '@angular/core';
import { PrintService } from './print.service';
import { jsPDF } from 'jspdf';
import { LayoutUtils } from './layout.utils';
var PdfPrintService = /** @class */ (function (_super) {
    __extends(PdfPrintService, _super);
    function PdfPrintService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PdfPrintService.prototype.printPreview = function (idRefFilter, classNameFilter, tagNameFilter, width, height, printCssIdRegExp) {
        var printWindow = _super.prototype.printPreview.call(this, idRefFilter, classNameFilter, tagNameFilter, width, height, printCssIdRegExp);
        if (!printWindow) {
            return undefined;
        }
        var printDocument = printWindow.document;
        var printElement = LayoutUtils.extractElementForFilter(printDocument, 'printPreview');
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', 'printPreview');
            return undefined;
        }
        // TODO add safe2Pdf, print-Button on html of Print-page
        // TODO add jsPDF minified as external js
        // TODO inline-jspdf so that is is only loaded in prntpage
        // TODO add codesnippet into exteernal js only loaded on printpage
        var fileName = 'filename.pdf';
        var pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
            precision: 16 // or "smart", default is 16
        });
        var srcWidth = printElement.scrollWidth;
        pdf.html(printElement, {
            html2canvas: {
                scale: 595.26 / srcWidth,
                scrollY: 0
            },
            x: 0,
            y: 0
        })
            .then(function () {
            pdf.save(fileName);
            printWindow.close();
        });
        return printWindow;
    };
    PdfPrintService.prototype.preparePrintPreviewDocumentForPrint = function (printWindow, printDocument, previewContainer, printElement, width) {
        _super.prototype.preparePrintPreviewDocumentForPrint.call(this, printWindow, printDocument, previewContainer, printElement, width);
        LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles(printDocument);
        var style = previewContainer.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }
        style += 'display: block; width:' + (width || window.innerWidth) + 'px';
        previewContainer.setAttribute('style', style);
        return true;
    };
    PdfPrintService = __decorate([
        Injectable()
    ], PdfPrintService);
    return PdfPrintService;
}(PrintService));
export { PdfPrintService };
//# sourceMappingURL=pdf-print.service.js.map