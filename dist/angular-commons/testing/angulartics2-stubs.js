"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Angulartics2Stub = /** @class */ (function () {
    function Angulartics2Stub() {
        this.pageTrack = new ReplaySubject_1.ReplaySubject();
    }
    Angulartics2Stub.prototype.virtualPageviews = function (bla) { };
    ;
    Angulartics2Stub = __decorate([
        core_1.Injectable()
    ], Angulartics2Stub);
    return Angulartics2Stub;
}());
exports.Angulartics2Stub = Angulartics2Stub;
//# sourceMappingURL=angulartics2-stubs.js.map