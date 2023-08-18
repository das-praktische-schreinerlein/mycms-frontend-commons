import { AngularHtmlService } from './angular-html.service';
import { MarkdownService } from '@dps/mycms-commons/dist/markdown-commons/markdown.service';
export declare abstract class AngularMarkdownService {
    protected htmlService: AngularHtmlService;
    protected markdownService: MarkdownService;
    protected constructor(htmlService: AngularHtmlService);
    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
