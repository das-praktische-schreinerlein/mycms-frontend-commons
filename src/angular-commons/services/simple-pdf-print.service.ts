import {Injectable} from '@angular/core';
import {LayoutUtils} from './layout.utils';
import {PdfGenerator, PdfPrintOptions, PdfPrintService} from './pdf-print.service';
import {PreviewWindowType, PrintService} from './print.service';
import {SimplePrintService} from './simple-print.service';

@Injectable()
export class SimplePdfPrintService extends PdfPrintService {
    public static readonly PRINT_PREPARE_CSS_ID = 'print-prepare-pdf.css';

    constructor(protected printService: PrintService, protected pdfGenerator: PdfGenerator) {
        super();
    }

    public printPdf(options: PdfPrintOptions): Promise<Window> {
        this.prepareSrcForPrint(options);

        const printWindow = this.printService.openPrintPreview(options);
        if (!printWindow) {
            this.onErrorPrintDocument(undefined, undefined, undefined, undefined, options);
            return undefined;
        }

        const previewContainerId = 'printPreview';
        const printDocument = printWindow.document;
        const previewContainer: Element = LayoutUtils.extractElementForFilter(printDocument, 'ID',  previewContainerId);
        if (!previewContainer) {
            console.error('cant find copied printElement for print-preview (printPreview)', previewContainerId);
            this.onErrorPrintDocument(printWindow, printDocument, previewContainer, undefined, options);
            return undefined;
        }

        const printElement: Element = LayoutUtils.extractElementForFilter(printDocument,
            options.printElementFilter.type,
            options.printElementFilter.value);
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', printElement);
            this.onErrorPrintDocument(printWindow, printDocument, previewContainer, printElement, options);
            return undefined;
        }

        if (!this.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, options)) {
            console.error('error while preparing print-preview');
            this.onErrorPrintDocument(printWindow, printDocument, previewContainer, printElement, options);
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

                    this.afterPrintDocument(printWindow, printDocument, previewContainer, printElement, options);
                    resolve(printWindow);
                });
            }, options.waitForRenderingMs);
        });
    }

    public isPrintPdfAvailable(): boolean {
        return this.pdfGenerator.isPrintPdfAvailable();
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

    protected prepareSrcForPrint(options: PdfPrintOptions) {
        this.setMediaForPrintPrepareCss('all');
    }

    protected onErrorPrintDocument(printWindow: Window, printDocument: Document,
                                   previewContainer: Element, printElement: Element, options: PdfPrintOptions) {
        this.setMediaForPrintPrepareCss('print');
    }

    protected afterPrintDocument(printWindow: Window, printDocument: Document,
                                 previewContainer: Element, printElement: Element, options: PdfPrintOptions) {
        this.setMediaForPrintPrepareCss('print');
    }

    protected setMediaForPrintPrepareCss(value: string): void {
        const stylesheet = document.getElementById(SimplePdfPrintService.PRINT_PREPARE_CSS_ID);
        if (stylesheet !== null) {
            stylesheet.setAttribute('media', value);
        }
    }
}
