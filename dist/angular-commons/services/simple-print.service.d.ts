import { PrintOptions, PrintService } from './print.service';
import { LayoutService } from './layout.service';
export declare class SimplePrintService extends PrintService {
    protected layoutService: LayoutService;
    constructor(layoutService: LayoutService);
    isPrintAvailable(): boolean;
    openPrintPreview(options: PrintOptions): Window;
    activatePrintStyles(printDocument: Document): void;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, options: PrintOptions): boolean;
    protected openPrintPreviewWindow(options: PrintOptions, target: string): Window;
    protected openPrintPreviewIFrameWindow(options: PrintOptions, target: string): Window;
    protected openPrintPreviewRealWindow(options: PrintOptions, target: string): Window;
    protected copyContentToPrintPreviewDocument(printDocument: Document, doc: Element, printId: string, options: PrintOptions): void;
}
