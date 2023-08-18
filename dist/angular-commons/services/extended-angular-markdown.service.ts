import {Injectable} from '@angular/core';
import {MarkdownDefaultExtensions} from '@dps/mycms-commons/dist/markdown-commons/extensions/markdown.extensions';
import {DefaultOptions} from '@dps/mycms-commons/dist/markdown-commons/options';
import {MarkdownService} from '@dps/mycms-commons/dist/markdown-commons/markdown.service';
import {AngularMarkdownService} from './angular-markdown.service';
import {AngularHtmlService} from './angular-html.service';

@Injectable()
export class ExtendedAngularMarkdownService extends AngularMarkdownService {
    constructor(private angularHtmlService: AngularHtmlService) {
        super(angularHtmlService);
        this.markdownService = new MarkdownService(DefaultOptions.getDefault(), MarkdownDefaultExtensions);
    }
}
