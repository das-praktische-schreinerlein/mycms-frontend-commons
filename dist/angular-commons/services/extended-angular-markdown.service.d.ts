import { AngularMarkdownService } from './angular-markdown.service';
import { AngularHtmlService } from './angular-html.service';
export declare class ExtendedAngularMarkdownService extends AngularMarkdownService {
    private angularHtmlService;
    constructor(angularHtmlService: AngularHtmlService);
}
