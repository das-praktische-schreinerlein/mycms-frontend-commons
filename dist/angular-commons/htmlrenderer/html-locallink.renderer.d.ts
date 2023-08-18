import { AbstractHtmlRender } from './html.renderer';
import { CommonRoutingService } from '../services/common-routing.service';
export declare class HtmlLocalLinkRenderer extends AbstractHtmlRender {
    protected commonRoutingService: CommonRoutingService;
    name: string;
    constructor(commonRoutingService: CommonRoutingService);
    postProcessHtml(parentSelector: string, args: {}): void;
}
