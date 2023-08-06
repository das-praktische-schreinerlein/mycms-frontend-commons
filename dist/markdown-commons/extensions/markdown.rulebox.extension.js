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
var extenedBlockRules = {
    ruleBoxStart: /^ *(<|&lt;)\!---(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)/,
    ruleBoxEnd: /^ *(<|&lt;)\!---\/(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)/
};
var RuleBoxExtension = /** @class */ (function (_super) {
    __extends(RuleBoxExtension, _super);
    function RuleBoxExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RuleBoxExtension.prototype.tokenizer = function (marked, src, tokens) {
        var rule = this.tokenizerRegExp; // Regex for the complete token, anchor to string start
        var match = rule.exec(src);
        if (match) {
            var token = {
                type: this.name,
                raw: match[0],
                boxtype: match[2],
                attr: match[3],
                tokens: [] // Array where child inline tokens will be generated
            };
            return token;
        }
    };
    return RuleBoxExtension;
}(AbstractMarkdownExtension));
var RuleBoxStartExtension = /** @class */ (function (_super) {
    __extends(RuleBoxStartExtension, _super);
    function RuleBoxStartExtension() {
        return _super.call(this, 'ruleBoxStart', 'block', [], extenedBlockRules.ruleBoxStart, extenedBlockRules.ruleBoxStart) || this;
    }
    RuleBoxStartExtension.prototype.renderer = function (marked, token) {
        var renderer = marked.parser.renderer;
        var type = token.boxtype;
        var param = token.attr;
        return renderer._renderExtendedMarkdownBoxStart(type, param);
    };
    return RuleBoxStartExtension;
}(RuleBoxExtension));
var RuleBoxEndExtension = /** @class */ (function (_super) {
    __extends(RuleBoxEndExtension, _super);
    function RuleBoxEndExtension() {
        return _super.call(this, 'ruleBoxEnd', 'block', [], extenedBlockRules.ruleBoxEnd, extenedBlockRules.ruleBoxEnd) || this;
    }
    RuleBoxEndExtension.prototype.renderer = function (marked, token) {
        var renderer = marked.parser.renderer;
        var type = token.boxtype;
        var param = token.attr;
        return renderer._renderExtendedMarkdownBoxEnd(type, param);
    };
    return RuleBoxEndExtension;
}(RuleBoxExtension));
export var MarkdownRuleBoxStartExtension = (new RuleBoxStartExtension()).toMarkDownExtension();
export var MarkdownRuleBoxEndExtension = (new RuleBoxEndExtension()).toMarkDownExtension();
//# sourceMappingURL=markdown.rulebox.extension.js.map