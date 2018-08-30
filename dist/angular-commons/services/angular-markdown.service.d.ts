import { MarkdownService } from 'angular2-markdown';
import { AngularHtmlService } from './angular-html.service';
export declare class AngularMarkdownService {
    private htmlService;
    private markdownService;
    constructor(htmlService: AngularHtmlService, markdownService: MarkdownService);
    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
