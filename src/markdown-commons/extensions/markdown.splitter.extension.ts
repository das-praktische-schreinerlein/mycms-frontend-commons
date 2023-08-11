import {AbstractMarkdownExtension, MarkdownExtension, Token} from './markdown.extension';

interface SplitterToken extends Token {
    before: string,
    after: string,
}


const extendedBlockRules = {
    splitterStart: /(:\|:)/,
    splitter: /^([\s\S]*?)(:\|:)([\s\S]*)$/
};

class SplitterExtension extends AbstractMarkdownExtension {
    public constructor() {
        super('splitter', 'inline', [],
            extendedBlockRules.splitterStart,
            extendedBlockRules.splitter);
    }

    tokenizer(marked, src: string, tokens: SplitterToken[]): SplitterToken {
        const rule = this.tokenizerRegExp;              // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match) {
            return {                                             // Token to generate
                type: this.name,                      // Should match "name" above
                raw: match[0],                                // Text to consume from the source
                tokens: [],                                    // Array where child inline tokens will be generated
                before: marked.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
                after: marked.lexer.inlineTokens(match[3].trim())   // any further-nested inline tokens
            };
        }
    }

    renderer(marked, token: SplitterToken): string {
        const renderer = marked.parser.renderer;
        const type = token.boxtype;
        const param = token.attr;

        return renderer.renderExtendedMarkdownSplitter(type, param,
            marked.parser.parseInline(token.before),
            marked.parser.parseInline(token.after));
    }
}

export const MarkdownSplitterExtension: MarkdownExtension = (new SplitterExtension()).toMarkDownExtension();
