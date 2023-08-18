import {AbstractHtmlRender} from '../htmlrenderer/html.renderer';

export abstract class AngularHtmlService {
    public static browserSaveBlobAsFile(blob: Blob, fileName: string, mimeType: string) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const e = document.createEvent('MouseEvents'),
                a = document.createElement('a');
            a.download = fileName;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = [mimeType, a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
        }
    }

    public static browserSaveTextAsFile(text: string, fileName: string, mimeType: string) {
        const blob = new Blob([text], { type: mimeType });
        AngularHtmlService.browserSaveBlobAsFile(blob, fileName, mimeType);
    }

    protected constructor(protected renderers: AbstractHtmlRender[]) {
    }

    renderHtml(parentSelector: string, html: string, routeLocalLinkWithAngularRouter: boolean): boolean {
        const inputEl = document.querySelector(parentSelector);
        if (!inputEl || inputEl === undefined || inputEl === null) {
            return false;
        }

        inputEl.innerHTML = html;

        this.postRender(parentSelector, routeLocalLinkWithAngularRouter);

        return true;
    }

    protected postRender(parentSelector: string, routeLocalLinkWithAngularRouter: boolean): void {
        const args = {
            routeLocalLinkWithAngularRouter: routeLocalLinkWithAngularRouter
        };

        for (const renderer of this.renderers) {
            renderer.postProcessHtml(parentSelector, args);
        }
    }

}
