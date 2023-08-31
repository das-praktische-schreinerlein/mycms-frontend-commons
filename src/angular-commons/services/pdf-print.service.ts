import {PrintOptions} from './print.service';

export interface PdfPrintOptions extends PrintOptions {
    fileName: string;
    pdfOptions: {
        orientation: 'landscape' | 'portrait';
        format: 'a4'
    },
    waitForRenderingMs: number;
}

export abstract class PdfGenerator {
    public abstract generatePdf(printWindow: Window, printElement: Element, options: PdfPrintOptions): Promise<any>;
}

export abstract class PdfPrintService {
    public abstract printPdf(options: PdfPrintOptions): Promise<Window>;
}
