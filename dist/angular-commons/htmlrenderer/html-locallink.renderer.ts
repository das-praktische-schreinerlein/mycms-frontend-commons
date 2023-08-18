import {AbstractHtmlRender} from './html.renderer';
import {CommonRoutingService} from '../services/common-routing.service';
import {Injectable} from '@angular/core';

@Injectable()
export class HtmlLocalLinkRenderer extends AbstractHtmlRender {
    name: string;

    constructor(protected commonRoutingService: CommonRoutingService) {
        super('HtmlLocalLinkRenderer');
    }

    public postProcessHtml(parentSelector: string, args: {}): void {
        if (!args['routeLocalLinkWithAngularRouter']) {
            return;
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
    }
}


