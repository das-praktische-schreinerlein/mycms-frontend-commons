var LayoutUtils = /** @class */ (function () {
    function LayoutUtils() {
    }
    LayoutUtils.setDisplayNoneStyleOnElementHiddenCssStyles = function (printDocument) {
        var rulesDisplayNone = ['print-hidden'].concat(LayoutUtils.getCssSelectorsForStyleSheetList(printDocument.styleSheets));
        return LayoutUtils.setDisplayNoneStyleOnElementForCssRules(printDocument, rulesDisplayNone);
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
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            LayoutUtils.setDisplayNoneStyleOnElement(element);
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
    LayoutUtils.extractElementForFilter = function (document, filterType, filter) {
        if (!filter) {
            console.error('cant find element no filter supplied');
            return undefined;
        }
        var doc;
        if (filterType === 'ID') {
            console.log('find element with idRefFilter', filter);
            doc = document.getElementById(filter);
            if (!doc) {
                console.error('cant find element with idRefFilter', filter);
                return;
            }
            return doc;
        }
        else if (filterType === 'CLASS') {
            console.log('find element with classNameFilter', filter);
            var docs = document.getElementsByClassName(filter);
            if (docs.length <= 0) {
                console.error('cant find element with classNameFilter', filter);
                return;
            }
            doc = docs.item(0);
            return doc;
        }
        else if (filterType === 'TAG') {
            console.log('find element with tagNameFilter', filter);
            var docs = document.getElementsByTagName(filter);
            if (docs.length <= 0) {
                console.error('cant find element with tag tagNameFilter', filter);
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
            try {
                var sheet = sheets[i];
                if (!sheet['cssRules']) {
                    continue;
                }
                rulesDisplayNone = rulesDisplayNone.concat(this.getCssSelectorsForCssRules(sheet['cssRules']));
            }
            catch (e) {
                console.warn('error while reading sheets', e);
            }
        }
        return rulesDisplayNone;
    };
    LayoutUtils.getCssSelectorsForCssRules = function (rules) {
        var rulesDisplayNone = [];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var element = rules_1[_i];
            var rule = element;
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
            for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
                var element = selectors_1[_i];
                if (rule.style.display && rule.style.display.startsWith('none')) {
                    rulesDisplayNone.push(element.trim().replace(/\./, ''));
                }
            }
        }
        return rulesDisplayNone;
    };
    return LayoutUtils;
}());
export { LayoutUtils };
//# sourceMappingURL=layout.utils.js.map