import {NgxMdService} from 'ngx-md';
import {Injectable} from '@angular/core';
import {AngularHtmlService} from './angular-html.service';

@Injectable()
export class AngularMarkdownService {
    constructor(private htmlService: AngularHtmlService, private markdownService: NgxMdService) {
    }

    renderMarkdown(parentSelector: string, markdown: string, routeLocalLinkWithAngularRouter: boolean): boolean {
        let html = '';
        try {
            html = this.markdownService.compile(markdown);
        } finally {}

        return this.htmlService.renderHtml(parentSelector, html, routeLocalLinkWithAngularRouter);
    }
}
