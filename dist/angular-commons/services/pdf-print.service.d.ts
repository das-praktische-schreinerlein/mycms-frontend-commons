import { PrintService } from './print.service';
export declare class PdfPrintService extends PrintService {
    printPreview(idRefFilter: string, classNameFilter?: string, tagNameFilter?: string, width?: number, height?: number, printCssIdRegExp?: string): Window;
    protected preparePrintPreviewDocumentForPrint(printWindow: Window, printDocument: Document, previewContainer: Element, printElement: Element, width: number): boolean;
}
