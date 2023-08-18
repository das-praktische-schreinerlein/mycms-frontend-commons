import { AbstractHtmlRender } from './html.renderer';
export declare class HtmlMermaidRenderer extends AbstractHtmlRender {
    name: string;
    constructor();
    protected configureMermaid(): void;
    postProcessHtml(parentSelector: string, args: {}): void;
}
