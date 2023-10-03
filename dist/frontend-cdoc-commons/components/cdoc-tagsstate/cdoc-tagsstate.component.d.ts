import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CommonDocContentUtils, KeywordsState, StructuredKeyword, StructuredKeywordState } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocTagsStateComponent extends AbstractInlineComponent {
    private contentUtils;
    protected cd: ChangeDetectorRef;
    tagsKats: StructuredKeywordState[];
    KeywordState: typeof KeywordsState;
    tags: string;
    suggestions?: string[];
    tagsConfig: StructuredKeyword[];
    tagsEnvironment?: {};
    possiblePrefixes: any[];
    prefix: string;
    unsetTag: EventEmitter<string>;
    setTag: EventEmitter<string>;
    tagsFound: EventEmitter<StructuredKeywordState[]>;
    constructor(contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef);
    doSetTag(keyword: string): void;
    doUnsetTag(keyword: string): void;
    protected updateData(): void;
}
