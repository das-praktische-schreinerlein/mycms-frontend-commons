export declare type ElementFilterType = 'ID' | 'CLASS' | 'TAG';
export declare class LayoutUtils {
    static setDisplayNoneStyleOnElementHiddenCssStyles(printDocument: Document): Element[];
    static setDisplayNoneStyleOnElementForCssRules(printDocument: Document, rulesDisplayNone: string[]): Element[];
    static setDisplayNoneStyleOnElements(elements: Element[]): Element[];
    static setDisplayNoneStyleOnElement(element: Element): Element;
    static extractElementForFilter(document: Document, filterType: ElementFilterType, filter: string): Element;
    static getCssSelectorsForStyleSheetList(sheets: StyleSheetList): string[];
    static getCssSelectorsForCssRules(rules: CSSRule[]): string[];
    static getCssSelectorsForCssRule(rule: CSSPageRule): string[];
}
