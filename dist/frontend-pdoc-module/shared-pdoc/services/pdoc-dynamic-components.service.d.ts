import { ComponentFactoryResolver, Type } from '@angular/core';
import { DynamicComponentService } from '../../../angular-commons/services/dynamic-components.service';
export declare class PDocDynamicComponentService extends DynamicComponentService {
    private componentFactoryResolver;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    getComponent(componentName: string): Type<any>;
}
