import { marked } from 'marked/marked.min.js';
import { MarkedOptions } from './options';
/**
 * Renderer
 */
export declare class Renderer extends marked.Renderer {
    options: MarkedOptions;
    allTagStyles: {};
    constructor(options: MarkedOptions);
    code(code: any, infostring: any, escaped: any): string;
    blockquote(quote: any): string;
    html(html: any): any;
    heading(text: any, level: any, raw: any, slugger: any): string;
    hr(): string;
    list(body: any, ordered: any, start: any): string;
    listitem(text: any): string;
    checkbox(checked: any): string;
    paragraph(text: any): string;
    table(header: any, body: any): string;
    tablerow(content: any): string;
    tablecell(content: any, flags: any): string;
    strong(text: any): string;
    em(text: any): string;
    codespan(text: any): string;
    br(): string;
    del(text: any): string;
    link(href: any, title: any, text: any): any;
    image(href: any, title: any, text: any): any;
    text(text: any): any;
    genStyleClassesForTag(tag: any): string;
    genStyleClassAttrForTag(tag: any): string;
    initStylesClassesForTags(prefix: any): void;
    renderExtendedMarkdownBoxhtmlStart(type: any, param: any): string;
    renderExtendedMarkdownBoxStart(type: any, param: any): string;
    renderExtendedMarkdownBoxEnd(type: any, param: any): string;
    renderExtendedMarkdownToggler(type: any, attr: any): string;
    renderExtendedMarkdownTogglerAppend(type: any, attr: any): string;
    renderExtendedMarkdownTOC(type: any, attr: any): string;
    renderExtendedMarkdownSplitter(type: any, attr: any, first: any, second: any): string;
}
