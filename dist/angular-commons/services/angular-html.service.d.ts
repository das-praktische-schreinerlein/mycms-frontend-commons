import { AbstractHtmlRender } from '../htmlrenderer/html.renderer';
export declare abstract class AngularHtmlService {
    protected renderers: AbstractHtmlRender[];
    static browserSaveBlobAsFile(blob: Blob, fileName: string, mimeType: string): void;
    static browserSaveTextAsFile(text: string, fileName: string, mimeType: string): void;
    protected constructor(renderers: AbstractHtmlRender[]);
    renderHtml(parentSelector: string, html: string, routeLocalLinkWithAngularRouter: boolean): boolean;
    protected postRender(parentSelector: string, routeLocalLinkWithAngularRouter: boolean): void;
}
