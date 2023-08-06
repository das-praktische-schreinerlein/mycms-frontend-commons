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
import { AbstractMarkdownExtension } from './markdown.extension';
var DescriptionListExtension = /** @class */ (function (_super) {
    __extends(DescriptionListExtension, _super);
    function DescriptionListExtension() {
        return _super.call(this, 'descriptionList', 'block', [], /:[^:\n]/, /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/) || this;
    }
    DescriptionListExtension.prototype.tokenizer = function (marked, src, tokens) {
        var rule = this.tokenizerRegExp; // Regex for the complete token, anchor to string start
        var match = rule.exec(src);
        if (match) {
            var token = {
                type: this.name,
                raw: match[0],
                text: match[0].trim(),
                tokens: [] // Array where child inline tokens will be generated
            };
            marked.lexer.inline(token.text, token.tokens); // Queue this data to be processed for inline tokens
            return token;
        }
    };
    DescriptionListExtension.prototype.renderer = function (marked, token) {
        return "<dl>" + marked.parser.parseInline(token.tokens) + "\n</dl>"; // parseInline to turn child tokens into HTML
    };
    return DescriptionListExtension;
}(AbstractMarkdownExtension));
var DescriptionExtension = /** @class */ (function (_super) {
    __extends(DescriptionExtension, _super);
    function DescriptionExtension() {
        return _super.call(this, 'description', 'inline', ['dt', 'dd'], /:/, /^:([^:\n]+):([^:\n]*)(?:\n|$)/) || this;
    }
    DescriptionExtension.prototype.tokenizer = function (marked, src, tokens) {
        var rule = this.tokenizerRegExp; // Regex for the complete token, anchor to string start
        var match = rule.exec(src);
        if (match) {
            return {
                type: this.name,
                raw: match[0],
                dt: marked.lexer.inlineTokens(match[1].trim()),
                dd: marked.lexer.inlineTokens(match[2].trim()) // any further-nested inline tokens
            };
        }
    };
    DescriptionExtension.prototype.renderer = function (marked, token) {
        return "\n<dt>" + marked.parser.parseInline(token.dt) + "</dt><dd>" + marked.parser.parseInline(token.dd) + "</dd>";
    };
    return DescriptionExtension;
}(AbstractMarkdownExtension));
export var MarkdownDescriptionListExtension = (new DescriptionListExtension()).toMarkDownExtension();
export var MarkdownDescriptionExtension = (new DescriptionExtension()).toMarkDownExtension();
//# sourceMappingURL=markdown.dl.extension.js.map