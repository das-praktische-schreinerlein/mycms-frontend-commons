import {MarkdownExtension} from './markdown.extension';
import {MarkdownDescriptionExtension, MarkdownDescriptionListExtension} from './markdown.dl.extension';
import {MarkdownRuleBoxEndExtension, MarkdownRuleBoxStartExtension} from './markdown.rulebox.extension';

export const MarkdownDefaultExtensions: MarkdownExtension[] = [
    MarkdownDescriptionListExtension,
    MarkdownDescriptionExtension,
    MarkdownRuleBoxStartExtension,
    MarkdownRuleBoxEndExtension
];
