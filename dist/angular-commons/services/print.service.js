var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { LayoutUtils } from './layout.utils';
var PrintService = /** @class */ (function () {
    function PrintService() {
    }
    PrintService.prototype.printPreview = function (idRefFilter, classNameFilter, tagNameFilter, width, height, printCssIdRegExp) {
        var doc = LayoutUtils.extractElementForFilter(document, idRefFilter, classNameFilter, tagNameFilter);
        if (!doc) {
            console.error('cant find printElement for print-preview (idRefFilter/classNameFilter/tagNameFilter)', idRefFilter, classNameFilter, tagNameFilter);
            return undefined;
        }
        var printWindow = this.openPrintPreviewWindow(width, height, 'print_preview');
        var printDocument = printWindow.document;
        var previewContainerId = 'printPreview';
        this.copyContentToPrintPreviewDocument(printDocument, doc, printCssIdRegExp, previewContainerId);
        var previewContainer = LayoutUtils.extractElementForFilter(printDocument, previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            return undefined;
        }
        var printElement = LayoutUtils.extractElementForFilter(printDocument, idRefFilter, classNameFilter, tagNameFilter);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            return undefined;
        }
        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, width)) {
            console.error('error while preparing print-preview');
            return undefined;
        }
        return printWindow;
    };
    PrintService.prototype.preparePrintPreviewDocumentForPrint = function (printWindow, printDocument, previewContainer, printElement, width) {
        return true;
    };
    PrintService.prototype.openPrintPreviewWindow = function (width, height, target) {
        var printPreviewWindow = window.open('about:blank', target);
        if (width || height) {
            console.log('resize print_preview x/y', width || window.innerWidth, height || window.innerHeight);
            printPreviewWindow.resizeTo(width || window.innerWidth, height || window.innerHeight);
        }
        return printPreviewWindow;
    };
    PrintService.prototype.copyContentToPrintPreviewDocument = function (printDocument, doc, printCssIdRegExp, printId) {
        printDocument.open();
        printDocument.write('<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<base href="/" />' +
            '</head>' +
            '<body>' +
            '<div id="' + printId + '" class="container-print-preview">' +
            doc.outerHTML +
            '</div>' +
            '</body>' +
            '</html>');
        var printCssStyles = [];
        console.log('copy links/styles');
        document.head.querySelectorAll('link, style').forEach(function (htmlElement) {
            if (htmlElement.id.match(new RegExp(printCssIdRegExp))) {
                printCssStyles.push(htmlElement.cloneNode(true));
                return;
            }
            printDocument.head.appendChild(htmlElement.cloneNode(true));
        });
        // put printCss to end override all other styles
        if (printCssStyles.length > 0) {
            for (var _i = 0, printCssStyles_1 = printCssStyles; _i < printCssStyles_1.length; _i++) {
                var printCss = printCssStyles_1[_i];
                console.log('append matching printCss-links/styles at the end', printCssIdRegExp, printCss.id);
                printDocument.head.appendChild(printCss);
                printCss.setAttribute('media', 'all');
            }
        }
    };
    PrintService = __decorate([
        Injectable()
    ], PrintService);
    return PrintService;
}());
export { PrintService };
//# sourceMappingURL=print.service.js.map