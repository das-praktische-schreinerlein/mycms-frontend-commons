"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_routing_service_1 = require("./common-routing.service");
var AngularHtmlService = /** @class */ (function () {
    function AngularHtmlService(commonRoutingService) {
        this.commonRoutingService = commonRoutingService;
    }
    AngularHtmlService.prototype.renderHtml = function (parentSelector, html, routeLocalLinkWithAngularRouter) {
        var inputEl = document.querySelector(parentSelector);
        if (!inputEl || inputEl === undefined || inputEl === null) {
            return false;
        }
        inputEl.innerHTML = html;
        if (!routeLocalLinkWithAngularRouter) {
            return true;
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
        return true;
    };
    AngularHtmlService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_routing_service_1.CommonRoutingService])
    ], AngularHtmlService);
    return AngularHtmlService;
}());
exports.AngularHtmlService = AngularHtmlService;
//# sourceMappingURL=angular-html.service.js.map