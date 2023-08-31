import { PrintOptions, PrintService } from './print.service';
export declare class SimplePrintService extends PrintService {
    openPrintPreview(options: PrintOptions): Window;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PrintOptions): boolean;
    protected openPrintPreviewWindow(options: PrintOptions, target: string): Window;
    protected copyContentToPrintPreviewDocument(printDocument: Document, doc: Element, printId: string, options: PrintOptions): void;
}
