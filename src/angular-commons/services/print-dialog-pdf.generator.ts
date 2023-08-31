import {PdfGenerator, PdfPrintOptions} from './pdf-print.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PrintDialogPdfGenerator extends PdfGenerator {

    public generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any> {
        return new Promise<any>(resolve => {
            printWindow.print();
            resolve();
        });
    }
}
