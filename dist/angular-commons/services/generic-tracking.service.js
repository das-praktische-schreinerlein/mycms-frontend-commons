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
var angulartics2_1 = require("angulartics2");
var GenericTrackingService = /** @class */ (function () {
    function GenericTrackingService(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.virtualPageviews(false);
    }
    GenericTrackingService.prototype.trackPageView = function () {
        this.angulartics2.pageTrack.next({ path: window.location.href });
    };
    GenericTrackingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], GenericTrackingService);
    return GenericTrackingService;
}());
exports.GenericTrackingService = GenericTrackingService;
//# sourceMappingURL=generic-tracking.service.js.map