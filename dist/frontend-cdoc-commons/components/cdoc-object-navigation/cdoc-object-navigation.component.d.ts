import { ChangeDetectorRef } from '@angular/core';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { BaseNavigationObjectRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/basenavigationobject-record';
export declare class CommonDocObjectNavigationComponent extends AbstractInlineComponent {
    protected commonRoutingService: CommonRoutingService;
    baseSearchUrl?: string;
    navigationobjects: BaseNavigationObjectRecordType[];
    constructor(commonRoutingService: CommonRoutingService, cd: ChangeDetectorRef);
    protected updateData(): void;
    getNavigationObjectRecordUrl(navRecord: BaseNavigationObjectRecordType): string;
    navigateToRecord(navRecord: BaseNavigationObjectRecordType): boolean;
}
