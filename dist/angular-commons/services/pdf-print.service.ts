import {Injectable} from '@angular/core';
import {PrintService} from './print.service';
import {jsPDF} from 'jspdf';
import {LayoutUtils} from './layout.utils';

@Injectable()
export class PdfPrintService extends PrintService {
    public printPreview(idRefFilter: string, classNameFilter ?: string, tagNameFilter ?: string, width ?: number, height ?: number,
                        printCssIdRegExp?: string): Window {
        const printWindow = super.printPreview(idRefFilter, classNameFilter, tagNameFilter, width, height, printCssIdRegExp);
        if (!printWindow) {
            return undefined;
        }

        const printDocument = printWindow.document;
        const printElement: Element = LayoutUtils.extractElementForFilter(printDocument, 'printPreview');
        if (!printElement) {
            console.error('cant find copied printElement for print-preview (printPreview)', 'printPreview');
            return undefined;
        }


        // TODO add safe2Pdf, print-Button on html of Print-page
        // TODO add jsPDF minified as external js
        // TODO inline-jspdf so that is is only loaded in prntpage
        // TODO add codesnippet into exteernal js only loaded on printpage
        const fileName = 'filename.pdf';
        const pdf = new jsPDF(
            {
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
                precision: 16 // or "smart", default is 16
            }
        );

        const srcWidth = printElement.scrollWidth;
        pdf.html(<HTMLElement>printElement, {
            html2canvas: {
                scale: 595.26 / srcWidth, // 595.26 is the width of A4 page
                scrollY: 0
            },
            x: 0,
            y: 0
        })
            .then(() => {
                pdf.save(fileName);
                printWindow.close();
            });

        return printWindow;
    }

    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document,
                                                  previewContainer: Element, printElement: Element, width: number) {
        super.preparePrintPreviewDocumentForPrint(printWindow, printDocument, previewContainer, printElement, width);

        LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles(printDocument);

        let style = previewContainer.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }
        style += 'display: block; width:' + (width || window.innerWidth) + 'px';

        previewContainer.setAttribute('style', style);

        return true;
    }

}
