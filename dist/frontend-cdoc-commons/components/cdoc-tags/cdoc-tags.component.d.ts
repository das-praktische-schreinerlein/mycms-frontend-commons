import { ChangeDetectorRef } from '@angular/core';
import { CommonDocContentUtils, StructuredKeyword } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
export declare class CommonDocTagsComponent extends AbstractInlineComponent {
    private contentUtils;
    protected cd: ChangeDetectorRef;
    tagsKats: StructuredKeyword[];
    tags: string;
    tagsConfig: StructuredKeyword[];
    possiblePrefixes: any[];
    blacklist: any[];
    constructor(contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef);
    protected updateData(): void;
}
