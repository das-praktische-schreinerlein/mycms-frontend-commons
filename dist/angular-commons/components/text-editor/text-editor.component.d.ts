import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AbstractInlineComponent } from '../inline.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularMarkdownService } from '../../services/angular-markdown.service';
import { PlatformService } from '../../services/platform.service';
export interface SingleEditorCommand {
    label: string;
    command: string;
}
export interface RangeEditorCommand {
    label: string;
    commandStart: string;
    commandEnd: string;
}
export interface CommonDocEditorCommandComponentConfig {
    singleCommands: SingleEditorCommand[];
    rangeCommands: RangeEditorCommand[];
}
export declare class TextEditorComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    fb: FormBuilder;
    protected angularMarkdownService: AngularMarkdownService;
    protected platformService: PlatformService;
    private flgDescRendered;
    editFormGroup: FormGroup;
    editorCommands: CommonDocEditorCommandComponentConfig;
    descMd: string;
    descMdRecommended: string;
    recommendAvailable?: boolean;
    recommendDesc: EventEmitter<boolean>;
    changeDesc: EventEmitter<string>;
    constructor(cd: ChangeDetectorRef, fb: FormBuilder, angularMarkdownService: AngularMarkdownService, platformService: PlatformService);
    onCallRecommendDesc(): boolean;
    onInputChanged(value: any, field: string): boolean;
    useRecommendedDesc(): void;
    addSingleCommand(command: SingleEditorCommand): void;
    addRangeCommand(command: RangeEditorCommand): void;
    setValue(field: string, value: any): void;
    renderDesc(force: boolean): string;
    protected updateData(): void;
}
