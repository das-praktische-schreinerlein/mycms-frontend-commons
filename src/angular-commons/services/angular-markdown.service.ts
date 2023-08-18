import {AngularHtmlService} from './angular-html.service';
import {MarkdownService} from '@dps/mycms-commons/dist/markdown-commons/markdown.service';

export abstract class AngularMarkdownService {
    protected markdownService: MarkdownService;

    protected constructor(protected htmlService: AngularHtmlService) {
    }

    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean {
        let html = '';
        try {
            html = this.markdownService.renderMarkdown(markdown);
        } finally {
            // NOOP
        }

        return this.htmlService.renderHtml(parentSelector, html, routeLocalLinkWithAngularRouter);
    }
}
