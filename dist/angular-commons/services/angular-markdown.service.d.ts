import { NgxMdService } from 'ngx-md';
import { AngularHtmlService } from './angular-html.service';
export declare class AngularMarkdownService {
    private htmlService;
    private markdownService;
    constructor(htmlService: AngularHtmlService, markdownService: NgxMdService);
    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
