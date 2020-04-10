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
var resolver_utils_1 = require("../../angular-commons/resolver/resolver.utils");
var common_routing_service_1 = require("../../angular-commons/services/common-routing.service");
var ErrorResolver = /** @class */ (function () {
    function ErrorResolver(commonRoutingService) {
        this.commonRoutingService = commonRoutingService;
    }
    ErrorResolver_1 = ErrorResolver;
    ErrorResolver.isResolverError = function (resolvedData) {
        if (!resolvedData || !resolvedData.error) {
            return false;
        }
        if (resolvedData.error instanceof resolver_utils_1.ResolverError && resolvedData.error !== undefined) {
            return true;
        }
        return false;
    };
    ErrorResolver.prototype.redirectAfterRouterError = function (errorCode, newUrl, toasts, toastMessage) {
        if (toasts) {
            var msg = '';
            if (toastMessage) {
                msg = toastMessage;
            }
            else {
                switch (errorCode) {
                    case ErrorResolver_1.ERROR_INVALID_ID:
                        msg = 'Der Url ist leider nicht korrekt. Wir haben versucht ihn zu berichtigen und ' +
                            'leiten Sie auf die hoffentlich richtige Seite weiter.';
                        break;
                    case ErrorResolver_1.ERROR_INVALID_DATA:
                        msg = 'Einige Daten waren leider nicht korrekt. Wir haben versucht sie zu berichtigen und ' +
                            'leiten Sie auf die hoffentlich richtige Seite weiter.';
                        break;
                    case ErrorResolver_1.ERROR_UNKNOWN_ID:
                        msg = 'Die Seite wurde leider nicht gefunden. Wir leiten Sie deshalb zur letzten Suche weiter.';
                        break;
                    case ErrorResolver_1.ERROR_APP_NOT_INITIALIZED:
                        msg = 'Die Anwendung konnte leider nicht richtig gestartet werden. Probieren Sie es später noch einmal.';
                        newUrl = 'errorpage';
                        break;
                    case ErrorResolver_1.ERROR_READONLY:
                        msg = 'Die Daten sind nicht zur Bearbeitung freigegeben..';
                        newUrl = 'errorpage';
                        break;
                    default:
                        msg = 'Es gibt leider Probleme beim Lesen - am besten noch einmal probieren :-(';
                }
            }
            toasts.error(msg, 'Oje!');
        }
        if (newUrl) {
            console.log('after error ' + errorCode + ' redirect to', newUrl);
            this.commonRoutingService.navigateByUrl(newUrl);
        }
    };
    var ErrorResolver_1;
    ErrorResolver.ERROR_INVALID_ID = 'ERROR_INVALID_ID';
    ErrorResolver.ERROR_UNKNOWN_ID = 'ERROR_UNKNOWN_ID';
    ErrorResolver.ERROR_INVALID_DATA = 'ERROR_INVALID_DATA';
    ErrorResolver.ERROR_WHILE_READING = 'ERROR_WHILE_READING';
    ErrorResolver.ERROR_APP_NOT_INITIALIZED = 'ERROR_APP_NOT_INITIALIZED';
    ErrorResolver.ERROR_READONLY = 'ERROR_READONLY';
    ErrorResolver.ERROR_OTHER = 'ERROR_OTHER';
    ErrorResolver = ErrorResolver_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_routing_service_1.CommonRoutingService])
    ], ErrorResolver);
    return ErrorResolver;
}());
exports.ErrorResolver = ErrorResolver;
//# sourceMappingURL=error.resolver.js.map