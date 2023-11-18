import { PdfGenerator, PdfPrintOptions, PdfPrintService } from './pdf-print.service';
import { PrintService } from './print.service';
export declare class SimplePdfPrintService extends PdfPrintService {
    protected printService: PrintService;
    protected pdfGenerator: PdfGenerator;
    constructor(printService: PrintService, pdfGenerator: PdfGenerator);
    printPdf(options: PdfPrintOptions): Promise<Window>;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PdfPrintOptions): boolean;
    isPrintPdfAvailable(): boolean;
}
