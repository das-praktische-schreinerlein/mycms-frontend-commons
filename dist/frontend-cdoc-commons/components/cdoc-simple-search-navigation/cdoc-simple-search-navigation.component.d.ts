import { ChangeDetectorRef } from '@angular/core';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocRoutingService } from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
export declare abstract class CommonDocSimpleSearchNavigationComponent extends AbstractInlineComponent {
    protected cdocRoutingService: CommonDocRoutingService;
    record: CommonDocRecordType;
    constructor(cdocRoutingService: CommonDocRoutingService, cd: ChangeDetectorRef);
    protected updateData(): void;
    submitBackToSearch(): boolean;
    submitToLastSearchPredecessor(): boolean;
    submitToLastSearchSuccessor(): boolean;
    getBackToSearchUrl(): string;
    getLastSearchSuccessorUrl(): string;
    getLastSearchPredecessorUrl(): string;
}
