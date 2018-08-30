import { ChangeDetectorRef, OnInit } from '@angular/core';
import { StructuredKeyword } from '../../services/cdoc-contentutils.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export interface CommonDocKeywordsComponentConfig {
    blacklist: string[];
    keywordsConfig: StructuredKeyword[];
    possiblePrefixes: string[];
}
export declare class CommonDocKeywordsComponent extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected cd: ChangeDetectorRef;
    blacklist: any[];
    keywordsConfig: StructuredKeyword[];
    possiblePrefixes: any[];
    record: CommonDocRecord;
    constructor(appService: GenericAppService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    protected getComponentConfig(config: {}): CommonDocKeywordsComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
}
