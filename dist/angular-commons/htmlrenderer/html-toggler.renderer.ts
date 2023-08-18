import {Injectable} from '@angular/core';
import jquery from 'jquery';
import {AbstractHtmlRender} from './html.renderer';
import {Subscription} from 'rxjs/internal/Subscription';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';

export interface TogglerConfig {
    doAllBlockToggler ?: {
        visibility: boolean
    },
    appendToggler ?: [
        {
            filter: string,
            type: string
        }
    ]
}

export abstract class HtmlTogglerRenderer extends AbstractHtmlRender {
    name: string;

    protected nextId = 1;
    protected jquery = jquery;

    protected constructor(protected togglerConfig ?: TogglerConfig) {
        super('HtmlTogglerRenderer');
    }

    public postProcessHtml(parentSelector: string, args: {}): void {
        this.renderToggler(parentSelector);
        this.renderTogglerCommands(parentSelector);

        if (this.togglerConfig && this.togglerConfig.appendToggler) {
            for (const appendToggler of this.togglerConfig.appendToggler) {
                this.appendTogglerForElements(appendToggler.filter, appendToggler.type, true, true);
            }
        }

        this.addEventListenerForAllToggler(parentSelector);

        if (this.togglerConfig && this.togglerConfig.doAllBlockToggler) {
            this.doAllBlockToggler(this.togglerConfig.doAllBlockToggler.visibility);
        }
    }

    public renderToggler(parentSelector: string): void {
        const togglerParents = document.querySelectorAll(parentSelector + ' div.dps-md-togglerparent');
        for (let i = 0; i < togglerParents.length; i++) {
            const togglerParent = togglerParents[i];
            const container = togglerParent.getAttribute('data-togglecontainer');
            const type = togglerParent.getAttribute('data-toggletype');

            togglerParent.innerHTML = this.createTogglerElement(container, type, undefined);
        }
    }

    public renderTogglerCommands(parentSelector: string): void {
        const togglerCommands = document.querySelectorAll(parentSelector + ' div.dps-command-toggle-append');
        for (let i = 0; i < togglerCommands.length; i++) {
            const togglerCommand = togglerCommands[i];
            const filter = togglerCommand.getAttribute('data-togglefilter');
            const type = togglerCommand.getAttribute('data-toggletype');
            const pos = togglerCommand.getAttribute('data-togglepos');

            this.appendTogglerForElements(filter, type, pos === 'TOGGLER.BEFOR', true);
        }
    }

    public addEventListenerForAllToggler(parentSelector: string) {
        const me = this;
        const togglers = document.querySelectorAll(parentSelector + ' .dps-block-toggler');
        for (let j = 0; j < togglers.length; j++) {
            const toggler = togglers[j];
            const toggleId = toggler.getAttribute('data-toggleid');
            const togglerBaseId = toggler.getAttribute('data-togglerbaseid');

            toggler.addEventListener('click', function (event) {
                event.preventDefault();
                me.toggle(togglerBaseId, toggleId);
                return false;
            });
        }
    }

    public doAllBlockToggler(flgShow) {
        const toggleList = document.getElementsByClassName('dps-block-toggler');
        if (toggleList.length > 0) {
            for (let j = 0; j < toggleList.length; j++) {
                const element = toggleList[j];
                const toggleId = element.getAttribute('data-toggleid');
                const togglerBaseId = element.getAttribute('data-togglerbaseid');

                this.toggle(togglerBaseId, toggleId, flgShow);
            }
        }
    }

    public appendTogglerForElements(filter, type, flgInsertBefore, force) {
        const me = this;
        me.jquery(filter).each(function (i, block) {
            if (!force && me.jquery(block).attr('data-toggler-processed')) {
                return;
            }

            me.jquery(block).attr('data-toggler-processed', true);
            let id = me.jquery(block).attr('id');
            if (!id) {
                id = 'dpsTogglerId' + (me.nextId++);
                me.jquery(block).attr('id', id);
            }

            me.jquery(block).parent()
                .find('[data-togglerbaseid="#' + id + '"]')
                .remove();

            me.insertToggler('#' + id, '#' + id, type, flgInsertBefore);
        });
    };

    public insertToggler(parentId, containerId, type, flgInsertBefore) {
        const me = this;
        const jqueryele = me.jquery(this.generateTogglerId(containerId));
        if (jqueryele.length <= 0) {
            const html = this.createTogglerElement(containerId, type, 'dps-block-toggler-block');
            if (flgInsertBefore) {
                me.jquery(html).insertBefore(parentId);
            } else {
                me.jquery(html).insertAfter(parentId);
            }
        }
    };

    protected generateTogglerId (containerId) {
        const containerClass = containerId.replace('.', '')
            .replace('#', '');

        return '.block4Toggler' + containerClass;
    };

    protected createTogglerElement(containerId, type, additionalClass) {
        const togglerId = this.generateTogglerId(containerId);
        const togglerClass = togglerId.replace('.', '')
            .replace('#', '');

        let html;
        if (type === 'text') {
            html = this.createTogglerLinks(containerId, togglerId,
                '<span class="dps-text-toggler dps-text-toggler-on">[Bitte mehr Details... ]</span>',
                '<span class="dps-text-toggler dps-text-toggler-off">[OK reicht. Bitte weniger Details.]</span>', '', '');
        } else if (type === 'icon2') {
            html = this.createTogglerLinks(containerId, togglerId,
                '<span class="dps-icon-toggler dps-icon-toggler2-on">&nbsp;</span>',
                '<span class="dps-icon-toggler dps-icon-toggler2-off">&nbsp;</span>', '', '');
        } else if (type === 'icon' || 1) {
            html = this.createTogglerLinks(containerId, togglerId,
                '<span class="dps-icon-toggler dps-icon-toggler-on">&nbsp;</span>',
                '<span class="dps-icon-toggler dps-icon-toggler-off">&nbsp;</span>', '', '');
        }

        html = '<div class="dps-block-toggler ' + additionalClass + ' ' + togglerClass + ' dps-toggler-show"' +
            ' data-togglerbaseid="' + containerId + '" data-toggleid="' + togglerId + '">' + html + '</div>';

        return html;
    };

    protected createTogglerLinks(toggleContainer, toggler, htmlOn, htmlOff, addStyleOn, addStyleOff) {
        if (!toggleContainer) {
            return null;
        }

        const togglerBaseClass = toggler.replace('.', '');
        let html = '<a href="#"' +
            ' class="dps-toggler dps-toggler-on ' + togglerBaseClass + '_On ' + addStyleOn + '"' +
            ' id="' + togglerBaseClass + '_On">' + htmlOn + '</a>';

        html += '<a href="#"' +
            ' class="dps-toggler dps-toggler-off ' + togglerBaseClass + '_Off ' + addStyleOff + '"' +
            ' id="' + togglerBaseClass + '_Off">' + htmlOff + '</a>';

        return html;
    }

    protected toggle(toggleContainerSelector: string, togglerSelector: string, flgShow ?: boolean) {
        const me = this;
        if (me.jquery(togglerSelector).hasClass('dps-toggler-hidden' || flgShow === true)) {
            // show
            me.jquery(toggleContainerSelector).slideDown(1000);
            me.jquery(togglerSelector).addClass('dps-toggler-show').removeClass('dps-toggler-hidden');
        } else {
            // hide
            me.jquery(toggleContainerSelector).slideUp(1000);
            me.jquery(togglerSelector).addClass('dps-toggler-hidden').removeClass('dps-toggler-show');
        }
    };

}

@Injectable()
export class SimpleHtmlTogglerRenderer extends HtmlTogglerRenderer {
    protected appStateSubscription: Subscription;

    constructor(private appService: GenericAppService) {
        super({
            doAllBlockToggler: undefined,
            appendToggler: undefined
        });

        this.appStateSubscription = this.appService.getAppState().subscribe(appState => {
            if (appState === AppState.Ready) {
                const appConfig = this.appService.getAppConfig();
                const newConfig = BeanUtils.getValue(appConfig, 'services.htmlTogglerRenderer');
                if (newConfig) {
                    this.togglerConfig = newConfig;
                }
            }
        });
    }
}
