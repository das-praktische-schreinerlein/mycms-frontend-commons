import { PdfGenerator, PdfPrintOptions } from './pdf-print.service';
export declare class JsPdfGenerator extends PdfGenerator {
    generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any>;
    protected preparePrintWindow(printWindow: Window, printElement: Element, options: PdfPrintOptions): void;
    isPrintPdfAvailable(): boolean;
}
