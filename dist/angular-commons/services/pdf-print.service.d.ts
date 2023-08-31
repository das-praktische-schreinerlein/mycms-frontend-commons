import { PrintOptions } from './print.service';
export interface PdfPrintOptions extends PrintOptions {
    fileName: string;
    pdfOptions: {
        orientation: 'landscape' | 'portrait';
        format: 'a4';
    };
    waitForRenderingMs: number;
}
export declare abstract class PdfGenerator {
    abstract generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any>;
}
export declare abstract class PdfPrintService {
    abstract printPdf(options: PdfPrintOptions): Promise<Window>;
}
