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
import { BehaviorSubject, fromEvent } from 'rxjs';
import { detect } from 'detect-browser';
export var LayoutSize;
(function (LayoutSize) {
    LayoutSize[LayoutSize["VERYSMALL"] = 0] = "VERYSMALL";
    LayoutSize[LayoutSize["SMALL"] = 1] = "SMALL";
    LayoutSize[LayoutSize["BIG"] = 2] = "BIG";
    LayoutSize[LayoutSize["VERYBIG"] = 3] = "VERYBIG";
})(LayoutSize || (LayoutSize = {}));
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        var _this = this;
        this.layoutSizeObservable = new BehaviorSubject(this.calcLayoutSizeForWindow());
        this.flgPrintmode = false;
        var $resizeEvent = fromEvent(window, 'resize');
        $resizeEvent.subscribe(function (data) {
            _this.layoutSizeObservable.next(_this.calcLayoutSizeForWindow());
        });
        var me = this;
        if (this.isDesktop() && typeof window !== 'undefined' && window.matchMedia) {
            var mediaQueryListPrint = window.matchMedia('print');
            mediaQueryListPrint.addListener(function (mql) {
                if (mql.matches) {
                    me.flgPrintmode = true;
                }
                else {
                    me.flgPrintmode = false;
                }
                me.layoutSizeObservable.next(me.calcLayoutSizeForWindow());
            });
            var mediaQueryListScreen = window.matchMedia('screen');
            mediaQueryListScreen.addListener(function (mql) {
                if (mql.matches) {
                    me.flgPrintmode = false;
                }
                else {
                    me.flgPrintmode = true;
                }
                me.layoutSizeObservable.next(me.calcLayoutSizeForWindow());
            });
        }
    }
    LayoutService.prototype.getLayoutSizeData = function () {
        return this.layoutSizeObservable;
    };
    LayoutService.prototype.isPrintMode = function () {
        return this.flgPrintmode;
    };
    LayoutService.prototype.getBrowser = function () {
        return detect();
    };
    LayoutService.prototype.isMobile = function () {
        var browser = this.getBrowser();
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
    };
    LayoutService.prototype.isSpider = function () {
        var browser = this.getBrowser();
        return browser && browser.name === 'bot';
    };
    LayoutService.prototype.isServer = function () {
        var browser = this.getBrowser();
        return browser && browser.name === 'node';
    };
    LayoutService.prototype.isDesktop = function () {
        return !this.isMobile() && !this.isSpider() && !this.isServer();
    };
    LayoutService.prototype.calcLayoutSizeForWindow = function () {
        if (window === undefined) {
            return {
                layoutSize: this.calcLayoutSizeForWidth(undefined),
                width: 900,
                height: 700
            };
        }
        return {
            layoutSize: this.calcLayoutSizeForWidth(window.innerWidth),
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
    LayoutService.prototype.calcLayoutSizeForWidth = function (width) {
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
    };
    LayoutService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], LayoutService);
    return LayoutService;
}());
export { LayoutService };
export var Layout;
(function (Layout) {
    Layout[Layout["THIN"] = 0] = "THIN";
    Layout[Layout["FLAT"] = 1] = "FLAT";
    Layout[Layout["SMALL"] = 2] = "SMALL";
    Layout[Layout["BIG"] = 3] = "BIG";
    Layout[Layout["PAGE"] = 4] = "PAGE";
})(Layout || (Layout = {}));
export var SearchFormLayout;
(function (SearchFormLayout) {
    SearchFormLayout[SearchFormLayout["STACKED"] = 0] = "STACKED";
    SearchFormLayout[SearchFormLayout["GRID"] = 1] = "GRID";
})(SearchFormLayout || (SearchFormLayout = {}));
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
//# sourceMappingURL=layout.service.js.map