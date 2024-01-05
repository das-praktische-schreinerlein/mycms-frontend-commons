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
import { PreviewWindowType, PrintService } from './print.service';
import { LayoutService } from './layout.service';
var SimplePrintService = /** @class */ (function (_super) {
    __extends(SimplePrintService, _super);
    function SimplePrintService(layoutService) {
        var _this = _super.call(this) || this;
        _this.layoutService = layoutService;
        return _this;
    }
    SimplePrintService_1 = SimplePrintService;
    SimplePrintService.prototype.openPrintPreview = function (options) {
        if (!options || !options.printElementFilter) {
            console.error('cant find printElement for print-preview - no printElementFilter applied', options);
        }
        var doc = LayoutUtils.extractElementForFilter(document, options.printElementFilter.type, options.printElementFilter.value);
        if (!doc) {
            console.error('cant find printElement for print-preview (printElementFilter)', options.printElementFilter);
            return undefined;
        }
        var printWindow = this.openPrintPreviewWindow(options, SimplePrintService_1.PRINT_PREVIEW_WINDOW_ID);
        var printDocument = printWindow.document;
        var previewContainerId = 'printPreview';
        this.copyContentToPrintPreviewDocument(printDocument, doc, previewContainerId, options);
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
        return printWindow;
    };
    SimplePrintService.prototype.preparePrintPreviewDocumentForPrint = function (printWindow, printDocument, previewContainer, printElement, options) {
        return true;
    };
    SimplePrintService.prototype.openPrintPreviewWindow = function (options, target) {
        var previewIFrameContainer = document.getElementById(SimplePrintService_1.PRINT_PREVIEW_IFRAME_CONTAINER_ID);
        if (previewIFrameContainer === null
            || (options !== undefined && options.previewWindow !== undefined && options.previewWindow.type !== undefined
                && options.previewWindow.type !== PreviewWindowType.IFRAME)) {
            return this.openPrintPreviewRealWindow(options, target);
        }
        return this.openPrintPreviewIFrameWindow(options, target);
    };
    SimplePrintService.prototype.openPrintPreviewIFrameWindow = function (options, target) {
        var previewIFrameContainer = document.getElementById(SimplePrintService_1.PRINT_PREVIEW_IFRAME_CONTAINER_ID);
        if (previewIFrameContainer === undefined) {
            return;
        }
        var printPreviewWindow = document.getElementById(SimplePrintService_1.PRINT_PREVIEW_IFRAME_ID)['contentWindow'];
        if (printPreviewWindow) {
            if (options.previewWindow && (options.previewWindow.width || options.previewWindow.height)) {
                console.log('resize print_preview x/y', options.previewWindow.width || window.innerWidth, options.previewWindow.height || window.innerHeight);
                printPreviewWindow.resizeTo(options.previewWindow.width || window.innerWidth, options.previewWindow.height || window.innerHeight);
            }
            printPreviewWindow.document.open();
            printPreviewWindow.document.write('');
            printPreviewWindow.document.close();
            previewIFrameContainer.style.display = 'block';
        }
        return printPreviewWindow;
    };
    SimplePrintService.prototype.openPrintPreviewRealWindow = function (options, target) {
        var features = 'popup=yes;';
        if (options.previewWindow.width) {
            features += 'width=' + options.previewWindow.width + ';';
        }
        if (options.previewWindow.height) {
            features += 'height=' + options.previewWindow.height + ';';
        }
        var printPreviewWindow = window.open('about:blank', target, features);
        if (options.previewWindow && (options.previewWindow.width || options.previewWindow.height)) {
            console.log('resize print_preview x/y', options.previewWindow.width || window.innerWidth, options.previewWindow.height || window.innerHeight);
            printPreviewWindow.resizeTo(options.previewWindow.width || window.innerWidth, options.previewWindow.height || window.innerHeight);
        }
        return printPreviewWindow;
    };
    SimplePrintService.prototype.copyContentToPrintPreviewDocument = function (printDocument, doc, printId, options) {
        printDocument.open();
        printDocument.write('<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<base href="' + document.baseURI + '" />' +
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
            if (options.printStyleIdFilter && htmlElement.id.match(options.printStyleIdFilter)) {
                printCssStyles.push(htmlElement.cloneNode(true));
                return;
            }
            printDocument.head.appendChild(htmlElement.cloneNode(true));
        });
        // put printCss to end override all other styles
        if (printCssStyles.length > 0) {
            for (var _i = 0, printCssStyles_1 = printCssStyles; _i < printCssStyles_1.length; _i++) {
                var printCss = printCssStyles_1[_i];
                console.log('append matching printCss-links/styles at the end', options.printStyleIdFilter, printCss.id);
                printDocument.head.appendChild(printCss);
                printCss.setAttribute('media', 'all');
            }
        }
    };
    SimplePrintService.prototype.isPrintAvailable = function () {
        return this.layoutService.isDesktop() && window.print !== undefined;
    };
    var SimplePrintService_1;
    SimplePrintService = SimplePrintService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LayoutService])
    ], SimplePrintService);
    return SimplePrintService;
}(PrintService));
export { SimplePrintService };
//# sourceMappingURL=simple-print.service.js.map