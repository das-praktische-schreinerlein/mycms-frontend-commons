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
var DynamicComponentService = /** @class */ (function () {
    function DynamicComponentService(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    DynamicComponentService.prototype.createComponent = function (component, widgetHost) {
        if (component === null || component === undefined) {
            return undefined;
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        var viewContainerRef = widgetHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        return componentRef;
    };
    DynamicComponentService.prototype.createComponentByName = function (type, widgetHost) {
        var componentRef = this.createComponent(this.getComponent(type), widgetHost);
        if (componentRef === null || componentRef === undefined) {
            return undefined;
        }
        (componentRef.instance)['type'] = type;
        return componentRef;
    };
    DynamicComponentService.prototype.getComponent = function (componentName) {
        return null;
    };
    DynamicComponentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], DynamicComponentService);
    return DynamicComponentService;
}());
exports.DynamicComponentService = DynamicComponentService;
//# sourceMappingURL=dynamic-components.service.js.map