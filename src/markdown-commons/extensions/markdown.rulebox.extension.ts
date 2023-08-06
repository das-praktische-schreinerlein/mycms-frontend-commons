import {AbstractMarkdownExtension, MarkdownExtension, Token} from './markdown.extension';

const extenedBlockRules = {
    ruleBoxStart: /^ *(<|&lt;)\!---(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)/,
    ruleBoxEnd:   /^ *(<|&lt;)\!---\/(BOX\.INFO|BOX\.WARN|BOX\.ALERT|BOX|CONTAINER|STYLE?) *([#-_a-zA-Z,;0-9\.: ]*?) *---(>|&gt;)/
};

abstract class RuleBoxExtension extends AbstractMarkdownExtension {
    tokenizer(marked, src: string, tokens: Token[]): Token {
        const rule = this.tokenizerRegExp;    // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match) {
            const token: Token = {                            // Token to generate
                type: this.name,                      // Should match "name" above
                raw: match[0],                                // Text to consume from the source
                boxtype: match[2],
                attr: match[3],
                tokens: []                                    // Array where child inline tokens will be generated
            };

            return token;
        }
    }

}

class RuleBoxStartExtension extends RuleBoxExtension {
    public constructor() {
        super('ruleBoxStart', 'block', [],
            extenedBlockRules.ruleBoxStart, extenedBlockRules.ruleBoxStart);
    }

    renderer(marked, token: Token): string {
        const renderer = marked.parser.renderer;
        const type = token.boxtype;
        const param = token.attr;

        return renderer._renderExtendedMarkdownBoxStart(type, param);
    }
}


class RuleBoxEndExtension extends RuleBoxExtension {
    public constructor() {
        super('ruleBoxEnd', 'block', [],
            extenedBlockRules.ruleBoxEnd, extenedBlockRules.ruleBoxEnd);
    }

    renderer(marked, token: Token): string {
        const renderer = marked.parser.renderer;
        const type = token.boxtype;
        const param = token.attr;

        return renderer._renderExtendedMarkdownBoxEnd(type, param);
    }
}


export const MarkdownRuleBoxStartExtension: MarkdownExtension = (new RuleBoxStartExtension()).toMarkDownExtension();
export const MarkdownRuleBoxEndExtension: MarkdownExtension = (new RuleBoxEndExtension()).toMarkDownExtension();
