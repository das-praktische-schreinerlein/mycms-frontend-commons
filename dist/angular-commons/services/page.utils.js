var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Meta, Title } from '@angular/platform-browser';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
var PageUtils = /** @class */ (function () {
    function PageUtils(titleService, metaService, locale, translateService, document) {
        this.titleService = titleService;
        this.metaService = metaService;
        this.locale = locale;
        this.translateService = translateService;
        this.document = document;
    }
    PageUtils.prototype.setTranslatedTitle = function (key, values, defaultValue) {
        this.setTitle(this.translateService.instant(key, values) || defaultValue);
    };
    PageUtils.prototype.setTranslatedDescription = function (key, values, defaultValue) {
        this.setMetaDescription(this.translateService.instant(key, values) || defaultValue);
    };
    PageUtils.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    PageUtils.prototype.setMetaDescription = function (newDesc) {
        var selector = 'name="description"';
        this.metaService.removeTag(selector);
        this.metaService.addTag({ name: 'description', content: newDesc, lang: this.locale });
    };
    PageUtils.prototype.setMetaKeywords = function (newKeywords) {
        var selector = 'name="keywords"';
        this.metaService.removeTag(selector);
        this.metaService.addTag({ name: 'keywords', content: newKeywords, lang: this.locale });
    };
    PageUtils.prototype.setRobots = function (flgIndex, flgFollow) {
        var selector = 'name="robots"';
        var flags = [
            flgIndex ? 'index' : 'noindex,nosnippet,noodp,noarchive,noimageindex',
            flgFollow ? 'follow' : 'nofollow'
        ].join(',');
        this.metaService.removeTag(selector);
        this.metaService.addTag({ name: 'robots', content: flags });
    };
    PageUtils.prototype.setMetaLanguage = function () {
        var selector = 'name="language"';
        this.metaService.removeTag(selector);
        this.metaService.addTag({ name: 'language', content: this.locale });
    };
    PageUtils.prototype.setGlobalStyle = function (style, id) {
        this.removeGlobalStyle(id);
        var element = this.document.createElement('style');
        element.setAttribute('id', id);
        element.setAttribute('type', 'text/css');
        element.innerHTML = style ? style : '';
        var body = this.document.getElementsByTagName('body')[0];
        body.appendChild(element);
        return element;
    };
    PageUtils.prototype.removeGlobalStyle = function (id) {
        var element = this.document.getElementById(id);
        if (!element) {
            return;
        }
        // Chrome, Edge, Fiefox, ...
        if (Element.prototype.hasOwnProperty('remove')) {
            return element.remove();
        }
        if (element.parentNode !== null) {
            // IE
            return element.parentNode.removeChild(element);
        }
    };
    PageUtils.prototype.scrollToTop = function () {
        if (window !== undefined && (typeof window.scrollTo === 'function')) {
            window.scrollTo(0, 0);
        }
    };
    PageUtils.prototype.scrollToTopOfElement = function (el) {
        if (el.nativeElement !== undefined && (typeof el.nativeElement.scrollIntoView === 'function')) {
            el.nativeElement.scrollIntoView(true);
        }
    };
    PageUtils.prototype.goToLinkAnchor = function (anchor) {
        if (anchor !== undefined && anchor !== null && anchor.length > 1) {
            var me_1 = this;
            setTimeout(function init() {
                var element = me_1.document.querySelector('[name=' + anchor + ']');
                if (element) {
                    element.scrollIntoView(true);
                    element.style.width = '100%';
                    element.style.display = 'block';
                    element.innerHTML = '&#128279;';
                }
            }, 500);
        }
    };
    PageUtils = __decorate([
        Injectable(),
        __param(2, Inject(LOCALE_ID)),
        __param(4, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Title, Meta, String, TranslateService, Object])
    ], PageUtils);
    return PageUtils;
}());
export { PageUtils };
//# sourceMappingURL=page.utils.js.map