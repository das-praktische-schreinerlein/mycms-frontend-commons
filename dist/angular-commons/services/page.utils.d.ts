import { Meta, Title } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export declare class PageUtils {
    private titleService;
    private metaService;
    private locale;
    private translateService;
    private document;
    constructor(titleService: Title, metaService: Meta, locale: string, translateService: TranslateService, document: any);
    setTranslatedTitle(key: string, values: any, defaultValue: string): void;
    setTranslatedDescription(key: string, values: any, defaultValue: string): void;
    setTitle(newTitle: string): void;
    setMetaDescription(newDesc: string): void;
    setMetaKeywords(newKeywords: string): void;
    setRobots(flgIndex: boolean, flgFollow: boolean): void;
    setMetaLanguage(): void;
    setGlobalStyle(style: string, id: string): any;
    removeGlobalStyle(id: string): any;
    scrollToTop(): void;
    scrollToTopOfElement(el: ElementRef): void;
    goToLinkAnchor(anchor: string): void;
}
