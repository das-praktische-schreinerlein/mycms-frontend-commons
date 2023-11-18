import {PdfGenerator, PdfPrintOptions} from './pdf-print.service';
import {Injectable} from '@angular/core';
import {LayoutService} from './layout.service';

@Injectable()
export class PrintDialogPdfGenerator extends PdfGenerator {

    public constructor(protected layoutService: LayoutService) {
        super();
    }

    public generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any> {
        return new Promise<any>(resolve => {
            printWindow.print();
            resolve();
        });
    }

    public isPrintAvailable(): boolean {
        return this.layoutService.isDesktop() && window.print !== undefined;
    }

}
