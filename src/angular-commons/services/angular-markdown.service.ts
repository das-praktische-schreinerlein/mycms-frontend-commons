import {Injectable} from '@angular/core';
import {AngularHtmlService} from './angular-html.service';
import {MarkdownService} from '../../markdown-commons/markdown.service';
import {MarkdownDefaultExtensions} from '../../markdown-commons/extensions/markdown.extensions';

@Injectable()
export class AngularMarkdownService {
    protected markdownService: MarkdownService

    constructor(private htmlService: AngularHtmlService) {
        this.markdownService = new MarkdownService(MarkdownDefaultExtensions);
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
