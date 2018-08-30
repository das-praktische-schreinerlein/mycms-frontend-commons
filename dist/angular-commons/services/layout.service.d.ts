import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare enum LayoutSize {
    VERYSMALL = 0,
    SMALL = 1,
    BIG = 2,
    VERYBIG = 3,
}
export interface LayoutSizeData {
    layoutSize: LayoutSize;
    width: number;
    height: number;
}
export declare class LayoutService {
    private layoutSizeObservable;
    private flgPrintmode;
    constructor();
    getLayoutSizeData(): BehaviorSubject<LayoutSizeData>;
    isPrintMode(): boolean;
    getBrowser(): string;
    isMobile(): boolean;
    isSpider(): boolean;
    isServer(): boolean;
    isDesktop(): boolean;
    protected calcLayoutSizeForWindow(): LayoutSizeData;
    protected calcLayoutSizeForWidth(width: number): LayoutSize;
}
export declare enum Layout {
    THIN = 0,
    FLAT = 1,
    SMALL = 2,
    BIG = 3,
    PAGE = 4,
}
export declare enum SearchFormLayout {
    STACKED = 0,
    GRID = 1,
}
