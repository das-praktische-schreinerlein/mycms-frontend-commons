import {Injectable} from '@angular/core';
import {LayoutUtils} from './layout.utils';
import {PdfGenerator, PdfPrintOptions, PdfPrintService} from './pdf-print.service';
import {PreviewWindowType, PrintService} from './print.service';
import {SimplePrintService} from './simple-print.service';

@Injectable()
export class SimplePdfPrintService extends PdfPrintService {

    constructor(protected printService: PrintService, protected pdfGenerator: PdfGenerator) {
        super();
    }

    public printPdf(options: PdfPrintOptions): Promise<Window> {
        const printWindow = this.printService.openPrintPreview(options);
        if (!printWindow) {
            return undefined;
        }

        const previewContainerId = 'printPreview';
        const printDocument = printWindow.document;
        const previewContainer: Element = LayoutUtils.extractElementForFilter(printDocument, 'ID',  previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            return undefined;
        }

        const printElement: Element = LayoutUtils.extractElementForFilter(printDocument,
            options.printElementFilter.type,
            options.printElementFilter.value);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            return undefined;
        }

        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, options)) {
            console.error('error while preparing print-preview');
            return undefined;
        }

        // wait to load all styles;
        return new Promise<Window>(resolve => {
            setTimeout(() => {
                this.pdfGenerator.generatePdf(printWindow, printElement, options).then(() => {
                    const previewIFrameContainer = document.getElementById(SimplePrintService.PRINT_PREVIEW_IFRAME_CONTAINER_ID);
                    if (previewIFrameContainer === null
                        || (options !== undefined && options.previewWindow !== undefined && options.previewWindow.type !== undefined
                            && options.previewWindow.type !== PreviewWindowType.IFRAME)) {
                        printWindow.close();
                    } else {
                        previewIFrameContainer.style.display = 'none';
                    }

                    resolve(printWindow);
                });
            }, options.waitForRenderingMs);
        });
    }

    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document,
                                                  previewContainer: Element, printElement: Element, options: PdfPrintOptions) {
        let style = previewContainer.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }
        style += 'display: block; width:' + ((options.previewWindow && options.previewWindow.width) || window.innerWidth) + 'px';

        previewContainer.setAttribute('style', style);

        return true;
    }

    public isPrintPdfAvailable(): boolean {
        return this.pdfGenerator.isPrintPdfAvailable();
    }
}
