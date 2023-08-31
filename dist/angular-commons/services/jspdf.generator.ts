import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import {PdfGenerator, PdfPrintOptions} from './pdf-print.service';

@Injectable()
export class JsPdfGenerator extends PdfGenerator {

    public generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any> {
        // TODO add safe2Pdf, print-Button on html of Print-page
        // TODO add jsPDF minified as external js
        // TODO inline-jspdf so that is is only loaded in prntpage
        // TODO add codesnippet into exteernal js only loaded on printpage
        const fileName = options.fileName;
        const pdf = new jsPDF(
            {
                orientation: options.pdfOptions.orientation,
                unit: 'pt',
                format: options.pdfOptions.format,
                precision: 16 // or "smart", default is 16
            }
        );

        const srcWidth = printElement.scrollWidth;
        return pdf.html(<HTMLElement>printElement, {
            html2canvas: {
                scale: 595.26 / srcWidth, // 595.26 is the width of A4 page
                scrollY: 0
            },
            x: 0,
            y: 0
        })
            .then(() => {
                pdf.save(fileName);

                return Promise.resolve();
            });
    }
}
