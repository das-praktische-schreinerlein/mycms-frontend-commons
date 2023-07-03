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
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { DynamicComponentService } from '../../../angular-commons/services/dynamic-components.service';
import { PDocActionTagsComponent } from '../components/pdoc-actiontags/pdoc-actiontags.component';
var PDocDynamicComponentService = /** @class */ (function (_super) {
    __extends(PDocDynamicComponentService, _super);
    function PDocDynamicComponentService(componentFactoryResolver) {
        var _this = _super.call(this, componentFactoryResolver) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        return _this;
    }
    PDocDynamicComponentService.prototype.getComponent = function (componentName) {
        switch (componentName) {
            case 'actionTags':
            case 'actionTagsSmall':
            case 'actionTagsBig':
            case 'actionTagsFlat':
                return PDocActionTagsComponent;
        }
        return null;
    };
    PDocDynamicComponentService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], PDocDynamicComponentService);
    return PDocDynamicComponentService;
}(DynamicComponentService));
export { PDocDynamicComponentService };
//# sourceMappingURL=pdoc-dynamic-components.service.js.map