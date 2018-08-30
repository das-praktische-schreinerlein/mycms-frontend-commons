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
var common_routing_service_1 = require("../../angular-commons/services/common-routing.service");
var CommonDocRoutingService = /** @class */ (function () {
    function CommonDocRoutingService(commonRoutingService) {
        this.commonRoutingService = commonRoutingService;
        this.lastSearchUrl = '/cdoc/search/';
        this.lastBaseUrl = '/cdoc/';
    }
    CommonDocRoutingService.prototype.setLastSearchUrl = function (lastSearchUrl) {
        this.lastSearchUrl = lastSearchUrl;
    };
    CommonDocRoutingService.prototype.getLastSearchUrl = function () {
        return this.lastSearchUrl;
    };
    CommonDocRoutingService.prototype.setLastBaseUrl = function (lastBaseUrl) {
        this.lastBaseUrl = lastBaseUrl;
    };
    CommonDocRoutingService.prototype.getLastBaseUrl = function () {
        return this.lastBaseUrl;
    };
    CommonDocRoutingService.prototype.getShowUrl = function (cdoc, from) {
        var name = (cdoc.name ? cdoc.name : 'name')
            .replace(/[^-a-zA-Z0-9.+]+/g, ' ')
            .replace(/ +/g, ' ').replace(/ /g, '-').trim();
        return this.lastBaseUrl + 'show/' + name + '/' + cdoc.id; // + (from ? '?from=' + from : '');
    };
    CommonDocRoutingService.prototype.navigateBackToSearch = function (suffix) {
        return this.commonRoutingService.navigateByUrl(this.getLastSearchUrl() + (suffix ? suffix : ''));
    };
    CommonDocRoutingService.prototype.navigateToShow = function (cdoc, from) {
        return this.commonRoutingService.navigateByUrl(this.getShowUrl(cdoc, from));
    };
    CommonDocRoutingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_routing_service_1.CommonRoutingService])
    ], CommonDocRoutingService);
    return CommonDocRoutingService;
}());
exports.CommonDocRoutingService = CommonDocRoutingService;
//# sourceMappingURL=cdoc-routing.service.js.map