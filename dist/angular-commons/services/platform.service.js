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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var PlatformService = /** @class */ (function () {
    function PlatformService(baseUrl, platformId) {
        this.baseUrl = baseUrl;
        this.platformId = platformId;
    }
    PlatformService.prototype.getAssetsUrl = function (url) {
        return this.baseUrl ? this.baseUrl + url : url;
    };
    PlatformService.prototype.isClient = function () {
        return common_1.isPlatformBrowser(this.platformId);
    };
    PlatformService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), __param(0, core_1.Inject('baseUrl')),
        __param(1, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [String, Object])
    ], PlatformService);
    return PlatformService;
}());
exports.PlatformService = PlatformService;
//# sourceMappingURL=platform.service.js.map