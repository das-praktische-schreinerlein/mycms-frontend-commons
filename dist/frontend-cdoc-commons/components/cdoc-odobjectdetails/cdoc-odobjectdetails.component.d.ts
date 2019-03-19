import { ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BaseObjectDetectionImageObjectRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/baseobjectdetectionimageobject-record';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export interface CommonDocODObjectDetailsComponentConfig {
    defaultShowKeyAsTooltip: boolean;
    defaultFilterForNameToShowNameAndKey: [string];
}
export declare class CommonDocODObjectDetailsComponent extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected cd: ChangeDetectorRef;
    protected showKeyColumn: boolean;
    protected defaultShowKeyAsTooltip: boolean;
    protected defaultFilterForNameToShowNameAndKey: string[];
    protected config: any;
    objects: BaseObjectDetectionImageObjectRecordType[];
    showKeyAsTooltip?: boolean;
    filterForNameToShowNameAndKey?: string;
    constructor(appService: GenericAppService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    protected getComponentConfig(config: {}): CommonDocODObjectDetailsComponentConfig;
    protected configureComponent(config: {}): void;
    protected checkShowName(object: BaseObjectDetectionImageObjectRecordType): boolean;
    protected updateData(): void;
}
