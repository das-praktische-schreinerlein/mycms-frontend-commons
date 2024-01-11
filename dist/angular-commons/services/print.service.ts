import {ElementFilterType} from './layout.utils';

export enum PreviewWindowType {
    IFRAME, TAB, WINDOW
}

export interface PrintOptions {
    printElementFilter: {
        type: ElementFilterType;
        value: string;
    };
    previewWindow ?: {
        width: number;
        height ?: number;
        type ?: PreviewWindowType;
    },
    printStyleIdFilter ?: RegExp;
}

export abstract class PrintService {

    public static readonly PRINT_PREVIEW_IFRAME_CONTAINER_ID = 'print_preview_iframe_container';
    public static readonly PRINT_PREVIEW_IFRAME_ID = 'print_preview_iframe';
    public static readonly PRINT_PREVIEW_WINDOW_ID = 'print_preview_window';

    public abstract openPrintPreview(options: PrintOptions): Window;
    public abstract activatePrintStyles(printDocument: Document);

    public isPrintAvailable(): boolean {
        return false;
    }

}
