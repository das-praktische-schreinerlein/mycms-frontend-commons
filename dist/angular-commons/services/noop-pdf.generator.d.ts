import { PdfGenerator, PdfPrintOptions } from './pdf-print.service';
export declare class NoopPdfGenerator extends PdfGenerator {
    generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any>;
}
