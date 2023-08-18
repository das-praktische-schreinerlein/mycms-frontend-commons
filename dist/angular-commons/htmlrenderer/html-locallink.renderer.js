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
import { AbstractHtmlRender } from './html.renderer';
import { CommonRoutingService } from '../services/common-routing.service';
import { Injectable } from '@angular/core';
var HtmlLocalLinkRenderer = /** @class */ (function (_super) {
    __extends(HtmlLocalLinkRenderer, _super);
    function HtmlLocalLinkRenderer(commonRoutingService) {
        var _this = _super.call(this, 'HtmlLocalLinkRenderer') || this;
        _this.commonRoutingService = commonRoutingService;
        return _this;
    }
    HtmlLocalLinkRenderer.prototype.postProcessHtml = function (parentSelector, args) {
        if (!args['routeLocalLinkWithAngularRouter']) {
            return;
        }
        var links = document.querySelectorAll(parentSelector + ' a');
        var me = this;
        var _loop_1 = function (i) {
            var link = links[i];
            var url = link.getAttribute('href');
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto://')) {
                return "continue";
            }
            // TODO link.removeEventListener('click');
            link.addEventListener('click', function (event) {
                event.preventDefault();
                me.commonRoutingService.navigateByUrl(url);
                return false;
            });
        };
        for (var i = 0; i < links.length; i++) {
            _loop_1(i);
        }
    };
    HtmlLocalLinkRenderer = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CommonRoutingService])
    ], HtmlLocalLinkRenderer);
    return HtmlLocalLinkRenderer;
}(AbstractHtmlRender));
export { HtmlLocalLinkRenderer };
//# sourceMappingURL=html-locallink.renderer.js.map