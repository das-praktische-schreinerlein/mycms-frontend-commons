import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { StructuredKeyword, StructuredKeywordState } from '../../services/cdoc-contentutils.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export interface CommonDocKeywordsStateComponentConfig {
    prefix: string;
    keywordsConfig: StructuredKeyword[];
    possiblePrefixes: string[];
}
export declare class CommonDocKeywordsStateComponent extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected cd: ChangeDetectorRef;
    possiblePrefixes: any[];
    keywordsConfig: StructuredKeyword[];
    prefix: string;
    keywords: string;
    suggestions?: string[];
    unsetKeyword: EventEmitter<string>;
    setKeyword: EventEmitter<string>;
    tagsFound: EventEmitter<StructuredKeywordState[]>;
    constructor(appService: GenericAppService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    doSetKeyword(keyword: string): void;
    doUnsetKeyword(keyword: string): void;
    protected getComponentConfig(config: {}): CommonDocKeywordsStateComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
}
