import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AbstractInlineComponent } from '../inline.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularMarkdownService } from '../../services/angular-markdown.service';
import { PlatformService } from '../../services/platform.service';
export declare enum TextEditorLayout {
    TOPDOWN = 0,
    TOPDOWNFULLSCREEN = 1,
    LEFTRIGHT = 2,
    LEFTRIGHTFULLSCREEN = 3
}
export interface EditorCommand {
    label: string;
    type?: string;
}
export interface SingleEditorCommand extends EditorCommand {
    command: string;
}
export interface RangeEditorCommand extends EditorCommand {
    commandStart: string;
    commandEnd: string;
}
export interface EditorCommandBlock {
    label: string;
    commands: EditorCommand[];
}
export interface CommonDocEditorCommandComponentConfig {
    singleCommands?: SingleEditorCommand[];
    rangeCommands?: RangeEditorCommand[];
    commandBlocks?: EditorCommandBlock[];
}
export declare class TextEditorComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    fb: FormBuilder;
    protected angularMarkdownService: AngularMarkdownService;
    protected platformService: PlatformService;
    readonly TextEditorLayout: typeof TextEditorLayout;
    currentLayoutMode: TextEditorLayout;
    private flgDescRendered;
    private renderingRunning;
    private renderTimer;
    private lastRenderUpdate;
    editFormGroup: FormGroup;
    editorCommands: CommonDocEditorCommandComponentConfig;
    autoUpdateInterval: number;
    descMd: string;
    descMdRecommended: string;
    recommendAvailable?: boolean;
    availableLayoutModes?: TextEditorLayout[];
    startLayoutMode?: TextEditorLayout;
    recommendDesc: EventEmitter<boolean>;
    changeDesc: EventEmitter<string>;
    changeRenderedDescId: EventEmitter<string>;
    constructor(cd: ChangeDetectorRef, fb: FormBuilder, angularMarkdownService: AngularMarkdownService, platformService: PlatformService);
    onCallRecommendDesc(): boolean;
    onInputChanged(value: any, field: string): boolean;
    onLayoutChanged(layout: TextEditorLayout): boolean;
    useRecommendedDesc(): void;
    addSingleCommand(command: SingleEditorCommand): void;
    addRangeCommand(command: RangeEditorCommand): void;
    setValue(field: string, value: any): void;
    renderDesc(force: boolean): string;
    protected updateData(): void;
    protected updateRenderInterval(): void;
    protected getCurrentDescId(): string;
    protected getCurrentRenderedDescId(): string;
    protected isTopDownLayout(layout: TextEditorLayout): boolean;
}
