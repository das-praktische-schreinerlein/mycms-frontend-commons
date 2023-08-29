export declare class PrintService {
    printPreview(idRefFilter: string, classNameFilter?: string, tagNameFilter?: string, width?: number, height?: number, printCssIdRegExp?: string): Window;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, width: number): boolean;
    protected openPrintPreviewWindow(width: number, height: number, target: string): Window;
    protected copyContentToPrintPreviewDocument(printDocument: Document, doc: Element, printCssIdRegExp: string, printId: string): void;
}
