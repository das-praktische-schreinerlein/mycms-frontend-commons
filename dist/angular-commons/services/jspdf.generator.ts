import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import {PdfGenerator, PdfPrintOptions} from './pdf-print.service';
import {LayoutUtils} from './layout.utils';

@Injectable()
export class JsPdfGenerator extends PdfGenerator {

    public generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any> {
        this.preparePrintWindow(printWindow, printElement, options);

        const fileName = options.fileName;
        const pdf = new jsPDF(
            {
                orientation: options.pdfOptions.orientation,
                unit: 'pt',
                format: options.pdfOptions.format,
                precision: 16, // or "smart", default is 16
                compress: true
            }
        );

        const srcWidth = printElement.scrollWidth || printElement['offsetWidth'];
        return pdf.html(<HTMLElement>printElement, {
            html2canvas: {
                scale: (595.26 - 80) / srcWidth, // 595.26 is the width of A4 page
                scrollY: 0
            },
            // does not pass margin: [240, 260, 240, 260],
            x: 40,
            y: 40
        })
            .then(() => {
                pdf.save(fileName);

                return Promise.resolve();
            });
    }

    protected preparePrintWindow(printWindow: Window, printElement: Element, options: PdfPrintOptions): void {
        // TODO check why jspdf cant hide css with display:none
        LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles(printWindow.document);
    }

    public isPrintPdfAvailable(): boolean {
        return true;
    }
}
