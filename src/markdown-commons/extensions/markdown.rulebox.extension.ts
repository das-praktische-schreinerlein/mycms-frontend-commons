import {AbstractHtmlMarkdownExtension, AbstractMarkdownExtension, MarkdownExtension, Token} from './markdown.extension';

const extendedBlockRules = {
    ruleBoxStart: /^(\s*)(<|&lt;)\!---(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)(\s*)/,
    ruleBoxEnd:   /^(\s*)(<|&lt;)\!---\/(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)(\s*)/
};

abstract class RuleBoxExtension extends AbstractHtmlMarkdownExtension {
    tokenizer(marked, src: string, tokens: Token[]): Token {
        const rule = this.tokenizerRegExp;    // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match && match.length === 7) {
            const token: Token = {                            // Token to generate
                type: this.name,                      // Should match "name" above
                raw: match[0],                                // Text to consume from the source
                boxtype: match[3],
                attr: match[4],
                tokens: []                                    // Array where child inline tokens will be generated
            };

            return token;
        }
    }

}

class RuleBoxStartExtension extends RuleBoxExtension {
    public constructor() {
        super('ruleBoxStart', 'block', [],
            extendedBlockRules.ruleBoxStart, extendedBlockRules.ruleBoxStart);
    }

    renderer(marked, token: Token): string {
        const renderer = marked.parser.renderer;
        const type = token.boxtype;
        const param = token.attr;

        return renderer.renderExtendedMarkdownBoxStart(type, param);
    }
}


class RuleBoxEndExtension extends RuleBoxExtension {
    public constructor() {
        super('ruleBoxEnd', 'block', [],
            extendedBlockRules.ruleBoxEnd, extendedBlockRules.ruleBoxEnd);
    }

    renderer(marked, token: Token): string {
        const renderer = marked.parser.renderer;
        const type = token.boxtype;
        const param = token.attr;

        return renderer.renderExtendedMarkdownBoxEnd(type, param);
    }
}


export const MarkdownRuleBoxStartExtension: MarkdownExtension = (new RuleBoxStartExtension()).toMarkDownExtension();
export const MarkdownRuleBoxEndExtension: MarkdownExtension = (new RuleBoxEndExtension()).toMarkDownExtension();
