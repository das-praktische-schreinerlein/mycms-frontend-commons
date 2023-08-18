export interface HtmlRender {
    name: string,

    [index: string]: any,
}

export abstract class AbstractHtmlRender {
    name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public abstract postProcessHtml(parentSelector: string, args: {}): void;
}


