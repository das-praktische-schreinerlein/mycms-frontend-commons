import { AbstractHtmlRender } from './html.renderer';
import { Subscription } from 'rxjs/internal/Subscription';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export interface TogglerConfig {
    doAllBlockToggler?: {
        visibility: boolean;
    };
    appendToggler?: [{
        filter: string;
        type: string;
    }];
}
export declare abstract class HtmlTogglerRenderer extends AbstractHtmlRender {
    protected togglerConfig?: TogglerConfig;
    name: string;
    protected nextId: number;
    protected jquery: any;
    protected constructor(togglerConfig?: TogglerConfig);
    postProcessHtml(parentSelector: string, args: {}): void;
    renderToggler(parentSelector: string): void;
    renderTogglerCommands(parentSelector: string): void;
    addEventListenerForAllToggler(parentSelector: string): void;
    doAllBlockToggler(flgShow: any): void;
    appendTogglerForElements(filter: any, type: any, flgInsertBefore: any, force: any): void;
    insertToggler(parentId: any, containerId: any, type: any, flgInsertBefore: any): void;
    protected generateTogglerId(containerId: any): string;
    protected createTogglerElement(containerId: any, type: any, additionalClass: any): any;
    protected createTogglerLinks(toggleContainer: any, toggler: any, htmlOn: any, htmlOff: any, addStyleOn: any, addStyleOff: any): string;
    protected toggle(toggleContainerSelector: string, togglerSelector: string, flgShow?: boolean): void;
}
export declare class SimpleHtmlTogglerRenderer extends HtmlTogglerRenderer {
    private appService;
    protected appStateSubscription: Subscription;
    constructor(appService: GenericAppService);
}
