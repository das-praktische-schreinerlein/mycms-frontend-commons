import { CommonRoutingService } from './common-routing.service';
export declare class AngularHtmlService {
    private commonRoutingService;
    static browserSaveBlobAsFile(blob: Blob, fileName: string, mimeType: string): void;
    static browserSaveTextAsFile(text: string, fileName: string, mimeType: string): void;
    constructor(commonRoutingService: CommonRoutingService);
    renderHtml(parentSelector: string, html: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
