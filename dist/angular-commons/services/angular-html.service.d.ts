import { CommonRoutingService } from './common-routing.service';
export declare class AngularHtmlService {
    private commonRoutingService;
    constructor(commonRoutingService: CommonRoutingService);
    renderHtml(parentSelector: string, html: string, routeLocalLinkWithAngularRouter: boolean): boolean;
}
