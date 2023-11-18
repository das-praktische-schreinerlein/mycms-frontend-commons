import { PdfGenerator, PdfPrintOptions } from './pdf-print.service';
import { LayoutService } from './layout.service';
export declare class PrintDialogPdfGenerator extends PdfGenerator {
    protected layoutService: LayoutService;
    constructor(layoutService: LayoutService);
    generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any>;
    isPrintPdfAvailable(): boolean;
}
