import {MarkdownExtension} from './markdown.extension';
import {MarkdownDescriptionExtension, MarkdownDescriptionListExtension} from './markdown.dl.extension';
import {MarkdownRuleBoxEndExtension, MarkdownRuleBoxStartExtension} from './markdown.rulebox.extension';
import {MarkdownSplitterExtension} from './markdown.splitter.extension';
import {MarkdownTogglerAppendExtension, MarkdownTogglerExtension} from './markdown.toggler.extension';

export const MarkdownDefaultExtensions: MarkdownExtension[] = [
    MarkdownDescriptionListExtension,
    MarkdownDescriptionExtension,
    MarkdownRuleBoxStartExtension,
    MarkdownRuleBoxEndExtension,
    MarkdownSplitterExtension,
    MarkdownTogglerExtension,
    MarkdownTogglerAppendExtension
];
