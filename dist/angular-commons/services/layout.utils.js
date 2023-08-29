var LayoutUtils = /** @class */ (function () {
    function LayoutUtils() {
    }
    LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles = function (printDocument) {
        var rulesDisplayNone = ['print-hidden'].concat(LayoutUtils.getCssSelectorsForStyleSheetList(printDocument.styleSheets));
        var elements = LayoutUtils.setDisplayNoneStyleOnElementForCssRules(printDocument, rulesDisplayNone);
        return elements;
    };
    LayoutUtils.setDisplayNoneStyleOnElementForCssRules = function (printDocument, rulesDisplayNone) {
        var elements = [];
        for (var _i = 0, rulesDisplayNone_1 = rulesDisplayNone; _i < rulesDisplayNone_1.length; _i++) {
            var ruleDisplayNone = rulesDisplayNone_1[_i];
            var docs = printDocument.getElementsByClassName(ruleDisplayNone);
            if (docs.length > 0) {
                for (var i = 0; i < docs.length; i++) {
                    elements.push(docs[i]);
                }
            }
        }
        LayoutUtils.setDisplayNoneStyleOnElements(elements);
        return elements;
    };
    LayoutUtils.setDisplayNoneStyleOnElements = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            var doc = elements[i];
            LayoutUtils.setDisplayNoneStyleOnElement(doc);
        }
        return elements;
    };
    LayoutUtils.setDisplayNoneStyleOnElement = function (element) {
        var style = element.getAttribute('style') || '';
        if (style) {
            style = style + '; ';
        }
        style += 'display: none !important';
        element.setAttribute('style', style);
        return element;
    };
    LayoutUtils.extractElementForFilter = function (document, idRefFilter, classNameFilter, tagNameFilter) {
        var doc;
        if (idRefFilter) {
            console.log('find element with idRefFilter', idRefFilter);
            doc = document.getElementById(idRefFilter);
            if (!doc) {
                console.error('cant find element with idRefFilter', idRefFilter);
                return;
            }
            return doc;
        }
        else if (classNameFilter) {
            console.log('find element with classNameFilter', classNameFilter);
            var docs = document.getElementsByClassName(classNameFilter);
            if (docs.length <= 0) {
                console.error('cant find element with classNameFilter', classNameFilter);
                return;
            }
            doc = docs.item(0);
            return doc;
        }
        else if (tagNameFilter) {
            console.log('find element with tagNameFilter', tagNameFilter);
            var docs = document.getElementsByTagName(tagNameFilter);
            if (docs.length <= 0) {
                console.error('cant find element with tag tagNameFilter', tagNameFilter);
                return;
            }
            doc = docs.item(0);
            return doc;
        }
        else {
            console.error('cant find element no filter supplied');
        }
    };
    LayoutUtils.getCssSelectorsForStyleSheetList = function (sheets) {
        var rulesDisplayNone = [];
        for (var i = 0; i < sheets.length; i++) {
            var sheet = sheets[i];
            if (!sheet['cssRules']) {
                continue;
            }
            rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRules(sheet['cssRules']));
        }
        return rulesDisplayNone;
    };
    LayoutUtils.getCssSelectorsForCssRules = function (rules) {
        var rulesDisplayNone = [];
        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule['selectorText']) {
                rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRule(rule));
            }
            else if (rule['cssRules']) {
                rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRules(rule['cssRules']));
            }
        }
        return rulesDisplayNone;
    };
    LayoutUtils.getCssSelectorsForCssRule = function (rule) {
        var rulesDisplayNone = [];
        if (rule.selectorText) {
            var selectors = rule.selectorText.split(',');
            for (var k = 0; k < selectors.length; k++) {
                if (rule.style.display && rule.style.display.startsWith('none')) {
                    rulesDisplayNone.push(selectors[k].trim().replace(/\./, ''));
                }
            }
        }
        return rulesDisplayNone;
    };
    return LayoutUtils;
}());
export { LayoutUtils };
//# sourceMappingURL=layout.utils.js.map