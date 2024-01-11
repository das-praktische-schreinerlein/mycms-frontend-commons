import { ElementFilterType } from './layout.utils';
export declare enum PreviewWindowType {
    IFRAME = 0,
    TAB = 1,
    WINDOW = 2
}
export interface PrintOptions {
    printElementFilter: {
        type: ElementFilterType;
        value: string;
    };
    previewWindow?: {
        width: number;
        height?: number;
        type?: PreviewWindowType;
    };
    printStyleIdFilter?: RegExp;
}
export declare abstract class PrintService {
    static readonly PRINT_PREVIEW_IFRAME_CONTAINER_ID = "print_preview_iframe_container";
    static readonly PRINT_PREVIEW_IFRAME_ID = "print_preview_iframe";
    static readonly PRINT_PREVIEW_WINDOW_ID = "print_preview_window";
    abstract openPrintPreview(options: PrintOptions): Window;
    abstract activatePrintStyles(printDocument: Document): any;
    isPrintAvailable(): boolean;
}
