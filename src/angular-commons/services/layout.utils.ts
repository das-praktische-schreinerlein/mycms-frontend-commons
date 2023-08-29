export class LayoutUtils {
    public static setDisplayNoneStyleOnElementHiddenCssStyles(printDocument: Document): Element[] {
        const rulesDisplayNone = ['print-hidden'].concat(LayoutUtils.getCssSelectorsForStyleSheetList(printDocument.styleSheets));
        const elements = LayoutUtils.setDisplayNoneStyleOnElementForCssRules(printDocument, rulesDisplayNone)

        return elements;
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
        for (let i = 0; i < elements.length; i++) {
            const doc = elements[i];
            LayoutUtils.setDisplayNoneStyleOnElement(doc);
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

    public static extractElementForFilter(document: Document, idRefFilter: string, classNameFilter ?: string,
                                          tagNameFilter ?: string): Element {
        let doc: Element;

        if (idRefFilter) {
            console.log('find element with idRefFilter', idRefFilter);
            doc = document.getElementById(idRefFilter);
            if (!doc) {
                console.error('cant find element with idRefFilter', idRefFilter);
                return;
            }

            return doc;
        } else if (classNameFilter) {
            console.log('find element with classNameFilter', classNameFilter);
            const docs = document.getElementsByClassName(classNameFilter);
            if (docs.length <= 0) {
                console.error('cant find element with classNameFilter', classNameFilter);
                return;
            }

            doc = docs.item(0);

            return doc;
        } else if (tagNameFilter) {
            console.log('find element with tagNameFilter', tagNameFilter);
            const docs = document.getElementsByTagName(tagNameFilter);
            if (docs.length <= 0) {
                console.error('cant find element with tag tagNameFilter', tagNameFilter);
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
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
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
            for (let k = 0; k < selectors.length; k++) {
                if (rule.style.display && rule.style.display.startsWith('none')) {
                    rulesDisplayNone.push(selectors[k].trim().replace(/\./, ''));
                }
            }
        }


        return rulesDisplayNone;
    }
}
