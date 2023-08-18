export interface HtmlRender {
    name: string;
    [index: string]: any;
}
export declare abstract class AbstractHtmlRender {
    name: string;
    protected constructor(name: string);
    abstract postProcessHtml(parentSelector: string, args: {}): void;
}
