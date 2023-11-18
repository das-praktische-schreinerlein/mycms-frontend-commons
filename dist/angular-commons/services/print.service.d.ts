import { ElementFilterType } from './layout.utils';
export interface PrintOptions {
    printElementFilter: {
        type: ElementFilterType;
        value: string;
    };
    previewWindow?: {
        width: number;
        height?: number;
    };
    printStyleIdFilter?: RegExp;
}
export declare abstract class PrintService {
    abstract openPrintPreview(options: PrintOptions): Window;
    isPrintAvailable(): boolean;
}
