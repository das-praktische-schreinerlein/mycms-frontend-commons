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
import { jsPDF } from 'jspdf';
import { PdfGenerator } from './pdf-print.service';
import { LayoutUtils } from './layout.utils';
var JsPdfGenerator = /** @class */ (function (_super) {
    __extends(JsPdfGenerator, _super);
    function JsPdfGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsPdfGenerator.prototype.generatePdf = function (printWindow, printElement, options) {
        this.preparePrintWindow(printWindow, printElement, options);
        var fileName = options.fileName;
        var pdf = new jsPDF({
            orientation: options.pdfOptions.orientation,
            unit: 'pt',
            format: options.pdfOptions.format,
            precision: 16,
            compress: true
        });
        var srcWidth = printElement.scrollWidth || printElement['offsetWidth'];
        return pdf.html(printElement, {
            html2canvas: {
                scale: (595.26 - 80) / srcWidth,
                scrollY: 0
            },
            // does not pass margin: [240, 260, 240, 260],
            x: 40,
            y: 40
        })
            .then(function () {
            pdf.save(fileName);
            return Promise.resolve();
        });
    };
    JsPdfGenerator.prototype.preparePrintWindow = function (printWindow, printElement, options) {
        // TODO check why jspdf cant hide css with display:none
        LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles(printWindow.document);
    };
    JsPdfGenerator.prototype.isPrintPdfAvailable = function () {
        return true;
    };
    JsPdfGenerator = __decorate([
        Injectable()
    ], JsPdfGenerator);
    return JsPdfGenerator;
}(PdfGenerator));
export { JsPdfGenerator };
//# sourceMappingURL=jspdf.generator.js.map