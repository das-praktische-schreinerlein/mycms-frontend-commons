var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import jquery from 'jquery';
import { AbstractHtmlRender } from './html.renderer';
import { AppState, GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
var HtmlTogglerRenderer = /** @class */ (function (_super) {
    __extends(HtmlTogglerRenderer, _super);
    function HtmlTogglerRenderer(togglerConfig) {
        var _this = _super.call(this, 'HtmlTogglerRenderer') || this;
        _this.togglerConfig = togglerConfig;
        _this.nextId = 1;
        _this.jquery = jquery;
        return _this;
    }
    HtmlTogglerRenderer.prototype.postProcessHtml = function (parentSelector, args) {
        this.renderToggler(parentSelector);
        this.renderTogglerCommands(parentSelector);
        if (this.togglerConfig && this.togglerConfig.appendToggler) {
            for (var _i = 0, _a = this.togglerConfig.appendToggler; _i < _a.length; _i++) {
                var appendToggler = _a[_i];
                this.appendTogglerForElements(appendToggler.filter, appendToggler.type, true, true);
            }
        }
        this.addEventListenerForAllToggler(parentSelector);
        if (this.togglerConfig && this.togglerConfig.doAllBlockToggler) {
            this.doAllBlockToggler(this.togglerConfig.doAllBlockToggler.visibility);
        }
    };
    HtmlTogglerRenderer.prototype.renderToggler = function (parentSelector) {
        var togglerParents = document.querySelectorAll(parentSelector + ' div.dps-md-togglerparent');
        for (var i = 0; i < togglerParents.length; i++) {
            var togglerParent = togglerParents[i];
            var container = togglerParent.getAttribute('data-togglecontainer');
            var type = togglerParent.getAttribute('data-toggletype');
            togglerParent.innerHTML = this.createTogglerElement(container, type, undefined);
        }
    };
    HtmlTogglerRenderer.prototype.renderTogglerCommands = function (parentSelector) {
        var togglerCommands = document.querySelectorAll(parentSelector + ' div.dps-command-toggle-append');
        for (var i = 0; i < togglerCommands.length; i++) {
            var togglerCommand = togglerCommands[i];
            var filter = togglerCommand.getAttribute('data-togglefilter');
            var type = togglerCommand.getAttribute('data-toggletype');
            var pos = togglerCommand.getAttribute('data-togglepos');
            this.appendTogglerForElements(filter, type, pos === 'TOGGLER.BEFOR', true);
        }
    };
    HtmlTogglerRenderer.prototype.addEventListenerForAllToggler = function (parentSelector) {
        var me = this;
        var togglers = document.querySelectorAll(parentSelector + ' .dps-block-toggler');
        var _loop_1 = function (j) {
            var toggler = togglers[j];
            var toggleId = toggler.getAttribute('data-toggleid');
            var togglerBaseId = toggler.getAttribute('data-togglerbaseid');
            toggler.addEventListener('click', function (event) {
                event.preventDefault();
                me.toggle(togglerBaseId, toggleId);
                return false;
            });
        };
        for (var j = 0; j < togglers.length; j++) {
            _loop_1(j);
        }
    };
    HtmlTogglerRenderer.prototype.doAllBlockToggler = function (flgShow) {
        var toggleList = document.getElementsByClassName('dps-block-toggler');
        if (toggleList.length > 0) {
            for (var j = 0; j < toggleList.length; j++) {
                var element = toggleList[j];
                var toggleId = element.getAttribute('data-toggleid');
                var togglerBaseId = element.getAttribute('data-togglerbaseid');
                this.toggle(togglerBaseId, toggleId, flgShow);
            }
        }
    };
    HtmlTogglerRenderer.prototype.appendTogglerForElements = function (filter, type, flgInsertBefore, force) {
        var me = this;
        me.jquery(filter).each(function (i, block) {
            if (!force && me.jquery(block).attr('data-toggler-processed')) {
                return;
            }
            me.jquery(block).attr('data-toggler-processed', true);
            var id = me.jquery(block).attr('id');
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
    ;
    HtmlTogglerRenderer.prototype.insertToggler = function (parentId, containerId, type, flgInsertBefore) {
        var me = this;
        var jqueryele = me.jquery(this.generateTogglerId(containerId));
        if (jqueryele.length <= 0) {
            var html = this.createTogglerElement(containerId, type, 'dps-block-toggler-block');
            if (flgInsertBefore) {
                me.jquery(html).insertBefore(parentId);
            }
            else {
                me.jquery(html).insertAfter(parentId);
            }
        }
    };
    ;
    HtmlTogglerRenderer.prototype.generateTogglerId = function (containerId) {
        var containerClass = containerId.replace(/\./g, '')
            .replace(/#/g, '');
        return '.block4Toggler' + containerClass;
    };
    ;
    HtmlTogglerRenderer.prototype.createTogglerElement = function (containerId, type, additionalClass) {
        var togglerId = this.generateTogglerId(containerId);
        var togglerClass = togglerId.replace(/\./g, '')
            .replace(/#/g, '');
        var html;
        if (type === 'text') {
            html = this.createTogglerLinks(containerId, togglerId, '<span class="dps-text-toggler dps-text-toggler-on">[Bitte mehr Details... ]</span>', '<span class="dps-text-toggler dps-text-toggler-off">[OK reicht. Bitte weniger Details.]</span>', '', '');
        }
        else if (type === 'icon2') {
            html = this.createTogglerLinks(containerId, togglerId, '<span class="dps-icon-toggler dps-icon-toggler2-on">&nbsp;</span>', '<span class="dps-icon-toggler dps-icon-toggler2-off">&nbsp;</span>', '', '');
        }
        else if (type === 'icon' || 1) {
            html = this.createTogglerLinks(containerId, togglerId, '<span class="dps-icon-toggler dps-icon-toggler-on">&nbsp;</span>', '<span class="dps-icon-toggler dps-icon-toggler-off">&nbsp;</span>', '', '');
        }
        html = '<div class="dps-block-toggler ' + additionalClass + ' ' + togglerClass + ' dps-toggler-show"' +
            ' data-togglerbaseid="' + containerId + '" data-toggleid="' + togglerId + '">' + html + '</div>';
        return html;
    };
    ;
    HtmlTogglerRenderer.prototype.createTogglerLinks = function (toggleContainer, toggler, htmlOn, htmlOff, addStyleOn, addStyleOff) {
        if (!toggleContainer) {
            return null;
        }
        var togglerBaseClass = toggler.replace(/\./g, '');
        var html = '<a href="#"' +
            ' class="dps-toggler dps-toggler-on ' + togglerBaseClass + '_On ' + addStyleOn + '"' +
            ' id="' + togglerBaseClass + '_On">' + htmlOn + '</a>';
        html += '<a href="#"' +
            ' class="dps-toggler dps-toggler-off ' + togglerBaseClass + '_Off ' + addStyleOff + '"' +
            ' id="' + togglerBaseClass + '_Off">' + htmlOff + '</a>';
        return html;
    };
    HtmlTogglerRenderer.prototype.toggle = function (toggleContainerSelector, togglerSelector, flgShow) {
        var me = this;
        if (me.jquery(togglerSelector).hasClass('dps-toggler-hidden' || flgShow === true)) {
            // show
            me.jquery(toggleContainerSelector).slideDown(1000);
            me.jquery(togglerSelector).addClass('dps-toggler-show').removeClass('dps-toggler-hidden');
        }
        else {
            // hide
            me.jquery(toggleContainerSelector).slideUp(1000);
            me.jquery(togglerSelector).addClass('dps-toggler-hidden').removeClass('dps-toggler-show');
        }
    };
    ;
    return HtmlTogglerRenderer;
}(AbstractHtmlRender));
export { HtmlTogglerRenderer };
var SimpleHtmlTogglerRenderer = /** @class */ (function (_super) {
    __extends(SimpleHtmlTogglerRenderer, _super);
    function SimpleHtmlTogglerRenderer(appService) {
        var _this = _super.call(this, {
            doAllBlockToggler: undefined,
            appendToggler: undefined
        }) || this;
        _this.appService = appService;
        _this.appStateSubscription = _this.appService.getAppState().subscribe(function (appState) {
            if (appState === AppState.Ready) {
                var appConfig = _this.appService.getAppConfig();
                var newConfig = BeanUtils.getValue(appConfig, 'services.htmlTogglerRenderer');
                if (newConfig) {
                    _this.togglerConfig = newConfig;
                }
            }
        });
        return _this;
    }
    SimpleHtmlTogglerRenderer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService])
    ], SimpleHtmlTogglerRenderer);
    return SimpleHtmlTogglerRenderer;
}(HtmlTogglerRenderer));
export { SimpleHtmlTogglerRenderer };
//# sourceMappingURL=html-toggler.renderer.js.map