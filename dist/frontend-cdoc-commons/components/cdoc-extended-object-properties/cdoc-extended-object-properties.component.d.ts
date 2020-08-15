import { ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BaseExtendedObjectPropertyRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/baseextendedobjectproperty-record';
export interface CommonDocExtendedObjectPropertiesComponentConfig {
    allowedExtendedObjectProperties: {
        [key: string]: string[];
    };
    modes: {
        [key: string]: string;
    };
}
export declare class CommonDocExtendedObjectPropertiesComponent extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected cd: ChangeDetectorRef;
    protected allowedExtendedObjectProperties: {
        [key: string]: string[];
    };
    protected modes: {
        [key: string]: string;
    };
    profile?: string;
    categories?: string[];
    extendedObjectProperties: BaseExtendedObjectPropertyRecordType[];
    constructor(appService: GenericAppService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    protected getComponentConfig(config: {}): CommonDocExtendedObjectPropertiesComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
    isVisible(): boolean;
    isFlagVisible(property: BaseExtendedObjectPropertyRecordType): boolean;
    isShortMode(): boolean;
}
