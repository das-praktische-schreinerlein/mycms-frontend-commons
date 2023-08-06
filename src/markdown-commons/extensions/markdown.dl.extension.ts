import {AbstractMarkdownExtension, MarkdownExtension, Token} from './markdown.extension';

interface DescriptionToken extends Token {
    dt: string,
    dd: string,
}


class DescriptionListExtension extends AbstractMarkdownExtension {
    public constructor() {
        super('descriptionList', 'block', [],
            /:[^:\n]/,
            /^(?::[^:\n]+:[^:\n]*(?:\n|$))+/);
    }

    tokenizer(marked, src: string, tokens: Token[]): Token {
        const rule = this.tokenizerRegExp;    // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match) {
            const token: Token = {                            // Token to generate
                type: this.name,                              // Should match "name" above
                raw: match[0],                                // Text to consume from the source
                text: match[0].trim(),                        // Additional custom properties
                tokens: []                                    // Array where child inline tokens will be generated
            };

            marked.lexer.inline(token.text, token.tokens);      // Queue this data to be processed for inline tokens

            return token;
        }
    }

    renderer(marked, token: Token): string {
        return `<dl>${marked.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
    }
}

class DescriptionExtension extends AbstractMarkdownExtension {
    public constructor() {
        super('description', 'inline', ['dt', 'dd'],
            /:/,
            /^:([^:\n]+):([^:\n]*)(?:\n|$)/);
    }

    tokenizer(marked, src: string, tokens: DescriptionToken[]): DescriptionToken {
        const rule = this.tokenizerRegExp;              // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match) {
            return {                                             // Token to generate
                type: this.name,                                 // Should match "name" above
                raw: match[0],                                   // Text to consume from the source
                dt: marked.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
                dd: marked.lexer.inlineTokens(match[2].trim())   // any further-nested inline tokens
            };
        }
    }

    renderer(marked, token: DescriptionToken): string {
        return `\n<dt>${marked.parser.parseInline(token.dt)}</dt><dd>${marked.parser.parseInline(token.dd)}</dd>`;
    }
}

export const MarkdownDescriptionListExtension: MarkdownExtension = (new DescriptionListExtension()).toMarkDownExtension();
export const MarkdownDescriptionExtension: MarkdownExtension = (new DescriptionExtension()).toMarkDownExtension();

