import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {BotInfo, BrowserInfo, detect, NodeInfo} from 'detect-browser';

export enum LayoutSize {
    VERYSMALL,
    SMALL,
    BIG,
    VERYBIG
}

export interface LayoutSizeData {
    layoutSize: LayoutSize;
    width: number;
    height: number;
}

@Injectable()
export class LayoutService {
    private layoutSizeObservable = new BehaviorSubject<LayoutSizeData>(this.calcLayoutSizeForWindow());
    private flgPrintmode = false;

    public static layoutToString(layout: Layout): string {
        if (layout === undefined) {
            return undefined;
        }

        switch (layout) {
            case Layout.THIN:
                return 'THIN';
            case Layout.FLAT:
                return 'FLAT';
            case Layout.SMALL:
                return 'SMALL';
            case Layout.BIG:
                return 'BIG';
            case Layout.PAGE:
                return 'PAGE';
        }

        return undefined;
    }

    public static layoutFromString(layout: string): Layout {
        if (!layout) {
            return undefined;
        }

        switch (layout) {
            case 'THIN':
                return Layout.THIN;
            case 'FLAT':
                return Layout.FLAT;
            case 'SMALL':
                return Layout.SMALL;
            case 'BIG':
                return Layout.BIG;
            case 'PAGE':
                return Layout.PAGE;
        }

        return undefined;
    }

    constructor() {
        const $resizeEvent = fromEvent(window, 'resize');
        $resizeEvent.subscribe(data => {
            this.layoutSizeObservable.next(this.calcLayoutSizeForWindow());
        });

        const me = this;
        if (this.isDesktop() && typeof window !== 'undefined' && window.matchMedia) {
            const mediaQueryListPrint = window.matchMedia('print');
            mediaQueryListPrint.addListener(function(mql) {
                const printmode = mql.matches;

                me.setPrintMode(printmode);
            });

            const mediaQueryListScreen = window.matchMedia('screen');
            mediaQueryListScreen.addListener(function(mql) {
                const printmode = !mql.matches;

                me.setPrintMode(printmode);
            });
        }
    }

    public getLayoutSizeData(): BehaviorSubject<LayoutSizeData> {
        return this.layoutSizeObservable;
    }

    public isPrintMode(): boolean {
        return this.flgPrintmode;
    }

    public setPrintMode(printMode: boolean): void {
        this.flgPrintmode = printMode;
        this.layoutSizeObservable.next(this.calcLayoutSizeForWindow());
    }

    public getBrowser(): BrowserInfo | BotInfo | NodeInfo  {
        return detect();
    }

    public isMobile(): boolean {
        const browser = this.getBrowser();
        switch (browser && browser.os) {
            case 'Amazon OS':
            case 'Android OS':
            case 'BlackBerry OS':
            case 'Chrome OS':
            case 'iOS':
            case 'Windows Mobile':
                return true;
            default:
        }

        return false;
    }

    public isSpider(): boolean {
        const browser = this.getBrowser();
        return browser && browser.name === 'bot';
    }

    public isServer(): boolean {
        const browser = this.getBrowser();
        return browser && browser.name === 'node';
    }

    public isDesktop(): boolean {
        return !this.isMobile() && !this.isSpider() && !this.isServer();
    }

    protected calcLayoutSizeForWindow(): LayoutSizeData {
        if (window === undefined) {
            return {
                layoutSize: this.calcLayoutSizeForWidth(undefined),
                width: 900,
                height: 700
            };
        }

        return  {
            layoutSize: this.calcLayoutSizeForWidth(window.innerWidth),
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    protected calcLayoutSizeForWidth(width: number): LayoutSize {
        if (this.isPrintMode() === true) {
            return LayoutSize.BIG;
        }
        if (width === undefined) {
            return LayoutSize.BIG;
        }
        if (width < 430) {
            return LayoutSize.VERYSMALL;
        }
        if (width < 767) {
            return LayoutSize.SMALL;
        }
        if (width < 1300) {
            return LayoutSize.BIG;
        }

        return LayoutSize.VERYBIG;
    }
}

export enum Layout {
    THIN,
    FLAT,
    SMALL,
    BIG,
    PAGE
}

export enum SearchFormLayout {
    STACKED,
    GRID
}


/**
    // Browser
    [ 'aol', /AOLShield\/([0-9\._]+)/ ],
    [ 'edge', /Edge\/([0-9\._]+)/ ],
    [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
    [ 'vivaldi', /Vivaldi\/([0-9\.]+)/ ],
    [ 'kakaotalk', /KAKAOTALK\s([0-9\.]+)/ ],
    [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
    [ 'phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
    [ 'fxios', /FxiOS\/([0-9\.]+)/ ],
    [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
    [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
    [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/ ],
    [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
    [ 'ie', /MSIE\s(7\.0)/ ],
    [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
    [ 'android', /Android\s([0-9\.]+)/ ],
    [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.* / ],
    [ 'safari', /Version\/([0-9\._]+).*Safari/ ]

    // OS
    [ 'iOS', /iP(hone|od|ad)/ ],
    [ 'Android OS', /Android/ ],
    [ 'BlackBerry OS', /BlackBerry|BB10/ ],
    [ 'Windows Mobile', /IEMobile/ ],
    [ 'Amazon OS', /Kindle/ ],
    [ 'Windows 3.11', /Win16/ ],
    [ 'Windows 95', /(Windows 95)|(Win95)|(Windows_95)/ ],
    [ 'Windows 98', /(Windows 98)|(Win98)/ ],
    [ 'Windows 2000', /(Windows NT 5.0)|(Windows 2000)/ ],
    [ 'Windows XP', /(Windows NT 5.1)|(Windows XP)/ ],
    [ 'Windows Server 2003', /(Windows NT 5.2)/ ],
    [ 'Windows Vista', /(Windows NT 6.0)/ ],
    [ 'Windows 7', /(Windows NT 6.1)/ ],
    [ 'Windows 8', /(Windows NT 6.2)/ ],
    [ 'Windows 8.1', /(Windows NT 6.3)/ ],
    [ 'Windows 10', /(Windows NT 10.0)/ ],
    [ 'Windows ME', /Windows ME/ ],
    [ 'Open BSD', /OpenBSD/ ],
    [ 'Sun OS', /SunOS/ ],
    [ 'Linux', /(Linux)|(X11)/ ],
    [ 'Mac OS', /(Mac_PowerPC)|(Macintosh)/ ],
    [ 'QNX', /QNX/ ],
    [ 'BeOS', /BeOS/ ],
    [ 'OS/2', /OS\/2/ ],
    [ 'Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/ ]
 **/
