import {ElementFilterType} from './layout.utils';

export interface PrintOptions {
    printElementFilter: {
        type: ElementFilterType;
        value: string;
    };
    previewWindow ?: {
        width: number;
        height ?: number;
    },
    printStyleIdFilter ?: RegExp;
}

export abstract class PrintService {
    public abstract openPrintPreview(options: PrintOptions): Window;

}
