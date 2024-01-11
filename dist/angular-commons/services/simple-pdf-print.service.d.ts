import { PdfGenerator, PdfPrintOptions, PdfPrintService } from './pdf-print.service';
import { PrintService } from './print.service';
export declare class SimplePdfPrintService extends PdfPrintService {
    protected printService: PrintService;
    protected pdfGenerator: PdfGenerator;
    static readonly PRINT_PREPARE_CSS_ID = "print-prepare-pdf.css";
    constructor(printService: PrintService, pdfGenerator: PdfGenerator);
    isPrintPdfAvailable(): boolean;
    printPdf(options: PdfPrintOptions): Promise<Window>;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PdfPrintOptions): boolean;
    protected prepareSrcForPrint(options: PdfPrintOptions): void;
    protected onErrorPrintDocument(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PdfPrintOptions): void;
    protected afterPrintDocument(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PdfPrintOptions): void;
    protected setMediaForPrintPrepareCss(value: string): void;
}
