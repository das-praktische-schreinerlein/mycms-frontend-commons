var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { marked } from 'marked/marked.min.js';
/**
 * Renderer
 */
var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    function Renderer(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.allTagStyles = {};
        return _this;
    }
    Renderer.prototype.code = function (code, infostring, escaped) {
        var lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }
        code = code.replace(/\n$/, '') + '\n';
        if (!lang) {
            return '<pre' + this.genStyleClassAttrForTag('pre') + '><code' + this.genStyleClassAttrForTag('code') + '>'
                + (escaped ? code : marked.escape(code, true))
                + '\n</code></pre>\n';
        }
        return '<pre' + this.genStyleClassAttrForTag('pre') + '><code class="'
            + this.options.langPrefix
            + marked.escape(lang, true)
            + ' ' + this.genStyleClassesForTag('code')
            + '">'
            + (escaped ? code : marked.escape(code, true))
            + '\n</code></pre>\n';
    };
    Renderer.prototype.blockquote = function (quote) {
        var styleClass = this.genStyleClassAttrForTag('blockquote');
        return "<blockquote" + styleClass + ">\n" + quote + "</blockquote>\n";
    };
    Renderer.prototype.html = function (html) {
        return html;
    };
    Renderer.prototype.heading = function (text, level, raw, slugger) {
        var styleClass = this.genStyleClassAttrForTag('h' + level);
        if (this.options.headerIds) {
            var id = this.options.headerPrefix + slugger.slug(raw);
            return "<h" + level + " id=\"" + id + "\"" + styleClass + ">" + text + "</h" + level + ">\n";
        }
        // ignore IDs
        return "<h" + level + styleClass + ">" + text + "</h" + level + ">\n";
    };
    Renderer.prototype.hr = function () {
        var styleClass = this.genStyleClassAttrForTag('hr');
        return this.options.xhtml ? "<hr" + styleClass + "/>\n" : "<hr" + styleClass + ">\n";
    };
    Renderer.prototype.list = function (body, ordered, start) {
        var type = ordered ? 'ol' : 'ul', startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        var styleClass = this.genStyleClassAttrForTag(type);
        return '<' + type + startatt + (styleClass + ">\n") + body + '</' + type + '>\n';
    };
    Renderer.prototype.listitem = function (text) {
        var styleClass = this.genStyleClassAttrForTag('li');
        return "<li" + styleClass + ">" + text + "</li>\n";
    };
    Renderer.prototype.checkbox = function (checked) {
        return '<input '
            + (checked ? 'checked="" ' : '')
            + this.genStyleClassAttrForTag('checkbox')
            + 'disabled="" type="checkbox"'
            + (this.options.xhtml ? ' /' : '')
            + '> ';
    };
    Renderer.prototype.paragraph = function (text) {
        var styleClass = this.genStyleClassAttrForTag('p');
        return "<p" + styleClass + ">" + text + "</p>\n";
    };
    Renderer.prototype.table = function (header, body) {
        if (body) {
            var styleClass = this.genStyleClassAttrForTag('tbody');
            body = "<tbody" + styleClass + ">" + body + "</tbody>";
        }
        var tablestyleClass = this.genStyleClassAttrForTag('table');
        var theadstyleClass = this.genStyleClassAttrForTag('thead');
        return "<table" + tablestyleClass + ">\n"
            + ("<thead" + theadstyleClass + ">\n")
            + header
            + '</thead>\n'
            + body
            + '</table>\n';
    };
    Renderer.prototype.tablerow = function (content) {
        var styleClass = this.genStyleClassAttrForTag('tr');
        return "<tr" + styleClass + ">\n" + content + "</tr>\n";
    };
    Renderer.prototype.tablecell = function (content, flags) {
        var type = flags.header ? 'th' : 'td';
        var styleClass = this.genStyleClassAttrForTag(type);
        var tag = flags.align
            ? "<" + type + " align=\"" + flags.align + "\"" + styleClass + ">"
            : "<" + type + styleClass + ">";
        return tag + content + ("</" + type + ">\n");
    };
    Renderer.prototype.strong = function (text) {
        var styleClass = this.genStyleClassAttrForTag('strong');
        return "<strong" + styleClass + ">" + text + "</strong>";
    };
    Renderer.prototype.em = function (text) {
        var styleClass = this.genStyleClassAttrForTag('em');
        return "<em" + styleClass + ">" + text + "</em>";
    };
    Renderer.prototype.codespan = function (text) {
        var styleClass = this.genStyleClassAttrForTag('code');
        return "<code" + styleClass + ">" + text + "</code>";
    };
    Renderer.prototype.br = function () {
        var styleClass = this.genStyleClassAttrForTag('br');
        return this.options.xhtml ? "<br" + styleClass + "/>" : "<br" + styleClass + ">";
    };
    Renderer.prototype.del = function (text) {
        var styleClass = this.genStyleClassAttrForTag('del');
        return "<del" + styleClass + ">" + text + "</del>";
    };
    Renderer.prototype.link = function (href, title, text) {
        href = marked.cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }
        var out = '<a href="' + href + '"' + this.genStyleClassAttrForTag('a');
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    };
    Renderer.prototype.image = function (href, title, text) {
        href = marked.cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }
        var out = "<img src=\"" + href + "\" alt=\"" + text + "\"";
        if (title) {
            out += " title=\"" + title + "\"";
        }
        out += this.genStyleClassAttrForTag('img') + this.options.xhtml ? '/>' : '>';
        return out;
    };
    Renderer.prototype.text = function (text) {
        return text;
    };
    Renderer.prototype.genStyleClassesForTag = function (tag) {
        var styles = this.allTagStyles[tag];
        if (!styles) {
            return '';
        }
        return Object.getOwnPropertyNames(styles).join(' ');
    };
    ;
    Renderer.prototype.genStyleClassAttrForTag = function (tag) {
        var styleClasses = this.genStyleClassesForTag(tag);
        if (!styleClasses) {
            return '';
        }
        return ' class="' + styleClasses + '"';
    };
    ;
    Renderer.prototype.initStylesClassesForTags = function (prefix) {
        var renderer = this;
        var tags = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8',
            'img', 'a', 'p',
            'table', 'tr', 'td', 'th', 'tbody', 'thead',
            'br',
            'strong', 'em',
            'dl', 'dt', 'dd',
            'li', 'ul', 'ol',
            'container',
            'box', 'box-ue', 'box-container',
            'infobox', 'infobox-ue', 'infobox-container',
            'warnbox', 'warnbox-ue', 'warnbox-container',
            'alertbox', 'alertbox-ue', 'alertbox-container',
            'togglerparent', 'splitter1', 'splitter2'
        ];
        var allTagStyles = renderer.allTagStyles;
        tags.map(function (tag) {
            var style = (prefix ? prefix : '') + 'md-' + tag;
            var tagStyles = allTagStyles[tag];
            if (!tagStyles) {
                tagStyles = {};
            }
            tagStyles[style] = style;
            allTagStyles[tag] = tagStyles;
        });
        renderer.allTagStyles = allTagStyles;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownBoxhtmlStart = function (type, param) {
        var renderer = this;
        return '<div class="' + renderer.genStyleClassesForTag(type + 'box') + '">' +
            '<div class="' + renderer.genStyleClassesForTag(type + 'box-ue') + '">' + param + '</div>' +
            '<div class="' + renderer.genStyleClassesForTag(type + 'box-container') + '">';
    };
    ;
    Renderer.prototype.renderExtendedMarkdownBoxStart = function (type, param) {
        var renderer = this;
        var res = '';
        if (type.toLowerCase() === 'box') {
            res = '<div class="' + renderer.genStyleClassesForTag('box') + ' ' + param + '">';
        }
        else if (type.toLowerCase() === 'container') {
            res = '<div class="' + renderer.genStyleClassesForTag('container') + ' md-container-' + param + '" id="md-container-' + param + '">';
        }
        else if (type.toLowerCase() === 'box.info') {
            res = renderer.renderExtendedMarkdownBoxhtmlStart('info', param);
        }
        else if (type.toLowerCase() === 'box.warn') {
            res = renderer.renderExtendedMarkdownBoxhtmlStart('warn', param);
        }
        else if (type.toLowerCase() === 'box.alert') {
            res = renderer.renderExtendedMarkdownBoxhtmlStart('alert', param);
        }
        else if (type.toLowerCase() === 'style' && param) {
            // do set style for next elements
            // split params elements:styles
            var params = param.split(':');
            var tags = [], styles_1 = [];
            if (params.length > 0) {
                tags = params[0].split(' ');
                if (params.length > 1) {
                    styles_1 = params[1].split(' ');
                }
            }
            // set styles for all tags
            var allTagStyles_1 = renderer.allTagStyles;
            tags.map(function (tag) {
                var tagStyles = allTagStyles_1[tag];
                if (!tagStyles) {
                    tagStyles = {};
                }
                styles_1.map(function (style) {
                    tagStyles[style] = style;
                });
                allTagStyles_1[tag] = tagStyles;
            });
            renderer.allTagStyles = allTagStyles_1;
        }
        return res;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownBoxEnd = function (type, param) {
        var renderer = this;
        var res = '';
        if (type.toLowerCase() === 'box') {
            res = '</div>';
        }
        else if (type.toLowerCase() === 'box.info' ||
            type.toLowerCase() === 'box.alert' ||
            type.toLowerCase() === 'box.warn') {
            res = '</div></div>';
        }
        else if (type.toLowerCase() === 'container') {
            res = '</div>';
        }
        else if (type.toLowerCase() === 'style' && param) {
            // do reset style for next elements
            // split params elements:styles
            var params = param.split(':');
            var tags = [], styles_2 = [];
            if (params.length > 0) {
                tags = params[0].split(' ');
                if (params.length > 1) {
                    styles_2 = params[1].split(' ');
                }
            }
            // reset styles for all tags
            var allTagStyles_2 = renderer.allTagStyles;
            tags.map(function (tag) {
                styles_2.map(function (style) {
                    if (allTagStyles_2[tag] && allTagStyles_2[tag][style]) {
                        allTagStyles_2[tag][style] = '';
                        delete allTagStyles_2[tag][style];
                    }
                });
            });
        }
        return res;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownToggler = function (type, attr) {
        var renderer = this;
        var appBaseVarName = this.options.appBaseVarName;
        if (!appBaseVarName) {
            appBaseVarName = 'jshAppBase';
        }
        var res = '';
        var params = (attr || '').split(',');
        var togglerType = 'icon', id;
        if (params.length > 0) {
            id = params[0].replace(' ');
            if (params.length > 1) {
                togglerType = params[1];
            }
        }
        if (type.toLowerCase() === 'toggler' && id !== undefined && id !== '') {
            res = '<div class="' + renderer.genStyleClassesForTag('togglerparent') + ' md-togglerparent-' + id + '" id="md-togglerparent-' + id + '"></div>' +
                '<script>' +
                appBaseVarName + '.get(\'UIToggler\').appendToggler(".md-togglerparent-' + id + '", ".md-container-' + id + '", "' + togglerType + '");' +
                '</script>';
        }
        return res;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownTogglerAppend = function (type, attr) {
        var renderer = this;
        var appBaseVarName = this.options.appBaseVarName;
        if (!appBaseVarName) {
            appBaseVarName = 'jshAppBase';
        }
        var res = '';
        var params = (attr || '').split(',');
        var togglerType = 'icon', tags = [], styles = [];
        var flgInsertBefore = (type === 'TOGGLER.BEFORE');
        if (params.length > 0) {
            if (params.length > 1) {
                togglerType = params[1];
            }
            // split params elements:styles
            var filter = params[0].replace(' ').split(':');
            if (filter.length > 0) {
                tags = filter[0].split(' ');
                if (filter.length > 1) {
                    styles = filter[1].split(' ');
                }
            }
            tags.map(function (tag) {
                styles.map(function (style) {
                    res = '<script>' + appBaseVarName + '.get(\'UIToggler\').appendTogglerForElements("' +
                        tag + '.' + style + '", "' + togglerType + '", ' + flgInsertBefore + ');</script>';
                });
            });
        }
        return res;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownTOC = function (type, attr) {
        var renderer = this;
        var appBaseVarName = this.options.appBaseVarName;
        if (!appBaseVarName) {
            appBaseVarName = 'jshAppBase';
        }
        var res = '';
        if (marked.nextTocId === undefined) {
            marked.nextTocId = 1;
        }
        if (type.toLowerCase() === 'toc') {
            var tocId = 'jsh-md-toc-container-' + marked.nextTocId, tocElement = appBaseVarName + '.$(\'div.' + tocId + '\')', srcElement = tocElement + '.parents(\'div\')', settings = 'undefined';
            res = '<div class="jsh-md-toc-container ' + tocId + '" id="' + tocId + '"></div>' +
                '<script>' + appBaseVarName + '.get(\'Renderer\').addTOCForBlock(' +
                tocElement + ', ' + srcElement + ', ' + settings + ');</script>';
        }
        marked.nextTocId++;
        return res;
    };
    ;
    Renderer.prototype.renderExtendedMarkdownSplitter = function (type, attr, first, second) {
        var renderer = this;
        return '<label class="' + renderer.genStyleClassesForTag('splitter1') + '">' + first + '</label>' +
            '<span class="' + renderer.genStyleClassesForTag('splitter2') + '">' + second + '</span>';
    };
    ;
    return Renderer;
}(marked.Renderer));
export { Renderer };
//# sourceMappingURL=renderer.js.map