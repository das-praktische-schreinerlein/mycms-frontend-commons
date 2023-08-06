import { AngularHtmlService } from './angular-html.service';
import { MarkdownService } from '../../markdown-commons/markdown.service';
export declare class AngularMarkdownService {
    private htmlService;
    protected markdownService: MarkdownService;
    constructor(htmlService: AngularHtmlService);
    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
