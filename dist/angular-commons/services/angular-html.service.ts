import {Injectable} from '@angular/core';
import {CommonRoutingService} from './common-routing.service';

@Injectable()
export class AngularHtmlService {
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

    constructor(private commonRoutingService: CommonRoutingService) {
    }

    renderHtml(parentSelector: string, html: string, routeLocalLinkWithAngularRouter: boolean): boolean {
        const inputEl = document.querySelector(parentSelector);
        if (!inputEl || inputEl === undefined || inputEl === null) {
            return false;
        }

        inputEl.innerHTML = html;

        if (!routeLocalLinkWithAngularRouter) {
            return true;
        }

        const links = document.querySelectorAll(parentSelector + ' a');
        const me = this;
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            const url = link.getAttribute('href');
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto://')) {
                continue;
            }
            // TODO link.removeEventListener('click');
            link.addEventListener('click', function (event) {
                event.preventDefault();
                me.commonRoutingService.navigateByUrl(url);
                return false;
            });
        }

        return true;
    }

}
