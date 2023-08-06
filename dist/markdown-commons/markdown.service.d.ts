import { MarkdownExtension } from './extensions/markdown.extension';
export declare class MarkdownService {
    constructor(extensions?: MarkdownExtension[]);
    renderMarkdown(markdown: string): string;
}
