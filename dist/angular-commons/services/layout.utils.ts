export type ElementFilterType = 'ID' | 'CLASS' | 'TAG';

export class LayoutUtils {
    public static setDisplayNoneStyleOnElementHiddenCssStyles(printDocument: Document): Element[] {
        const rulesDisplayNone = ['print-hidden'].concat(LayoutUtils.getCssSelectorsForStyleSheetList(printDocument.styleSheets));

        return LayoutUtils.setDisplayNoneStyleOnElementForCssRules(printDocument, rulesDisplayNone);
    }

    public static setDisplayNoneStyleOnElementForCssRules(printDocument: Document, rulesDisplayNone: string[]): Element[] {
        const elements: Element[] = [];
        for (const ruleDisplayNone of rulesDisplayNone) {
            const docs = printDocument.getElementsByClassName(ruleDisplayNone);
            if (docs.length > 0) {
                for (let i = 0; i < docs.length; i++) {
                    elements.push(docs[i]);
                }
            }
        }

        LayoutUtils.setDisplayNoneStyleOnElements(elements);

        return elements;
    }

    public static setDisplayNoneStyleOnElements(elements: Element[]): Element[] {
        for (const element of elements) {
            LayoutUtils.setDisplayNoneStyleOnElement(element);
        }

        return elements;
    }

    public static setDisplayNoneStyleOnElement(element: Element): Element {
        let style = element.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }

        style += 'display: none !important';

        element.setAttribute('style', style);

        return element;
    }

    public static extractElementForFilter(document: Document, filterType: ElementFilterType, filter: string): Element {
        if (! filter) {
            console.error('cant find element no filter supplied');
            return undefined;
        }

        let doc: Element;
        if (filterType === 'ID') {
            console.log('find element with idRefFilter', filter);
            doc = document.getElementById(filter);
            if (!doc) {
                console.error('cant find element with idRefFilter', filter);
                return;
            }

            return doc;
        } else if (filterType === 'CLASS') {
            console.log('find element with classNameFilter', filter);
            const docs = document.getElementsByClassName(filter);
            if (docs.length <= 0) {
                console.error('cant find element with classNameFilter', filter);
                return;
            }

            doc = docs.item(0);

            return doc;
        } else if (filterType === 'TAG') {
            console.log('find element with tagNameFilter', filter);
            const docs = document.getElementsByTagName(filter);
            if (docs.length <= 0) {
                console.error('cant find element with tag tagNameFilter', filter);
                return;
            }

            doc = docs.item(0);

            return doc;
        } else {
            console.error('cant find element no filter supplied');
        }
    }

    public static getCssSelectorsForStyleSheetList(sheets: StyleSheetList): string[] {
        let rulesDisplayNone = [];
        for (let i = 0; i < sheets.length; i++) {
            const sheet = sheets[i];
            if (!sheet['cssRules']) {
                continue;
            }

            rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRules(sheet['cssRules']));
        }

        return rulesDisplayNone;
    }

    public static getCssSelectorsForCssRules(rules: CSSRule[]): string[] {
        let rulesDisplayNone = [];
        for (const element of rules) {
            const rule = element;
            if (rule['selectorText']) {
                rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRule(<CSSPageRule>rule));
            } else if (rule['cssRules']) {
                rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRules(<CSSRule[]>rule['cssRules']));
            }
        }

        return rulesDisplayNone;
    }

    public static getCssSelectorsForCssRule(rule: CSSPageRule): string[] {
        const rulesDisplayNone = [];
        if (rule.selectorText) {
            const selectors = rule.selectorText.split(',');
            for (const element of selectors) {
                if (rule.style.display && rule.style.display.startsWith('none')) {
                    rulesDisplayNone.push(element.trim().replace(/\./, ''));
                }
            }
        }


        return rulesDisplayNone;
    }
}
