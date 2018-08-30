import { ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { DynamicComponentHostDirective } from '../components/directives/dynamic-component-host.directive';
export declare class DynamicComponentService {
    private _componentFactoryResolver;
    constructor(_componentFactoryResolver: ComponentFactoryResolver);
    createComponent(component: Type<any>, widgetHost: DynamicComponentHostDirective): ComponentRef<any>;
    createComponentByName(type: string, widgetHost: DynamicComponentHostDirective): ComponentRef<any>;
    getComponent(componentName: string): Type<any>;
}
