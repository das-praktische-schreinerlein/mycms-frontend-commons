import { ChangeDetectorRef, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { AbstractInlineComponent } from '../inline.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularMarkdownService } from '../../services/angular-markdown.service';
import { PlatformService } from '../../services/platform.service';
import { LayoutService, LayoutSizeData } from '../../services/layout.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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
export interface DescContainerOptions {
    height: string;
}
export declare class TextEditorComponent extends AbstractInlineComponent implements OnInit {
    protected cd: ChangeDetectorRef;
    fb: FormBuilder;
    protected angularMarkdownService: AngularMarkdownService;
    protected toastr: ToastrService;
    protected platformService: PlatformService;
    protected layoutService: LayoutService;
    readonly TextEditorLayout: typeof TextEditorLayout;
    currentLayoutMode: TextEditorLayout;
    descContainerLeftRightOptions: DescContainerOptions;
    descContainerTopDownOptions: DescContainerOptions;
    renderedDescContainerLeftRightOptions: DescContainerOptions;
    renderedDescContainerTopDownOptions: DescContainerOptions;
    private flgDescRendered;
    private renderingRunning;
    private renderTimer;
    private lastRenderUpdate;
    protected layoutSizeObservable: BehaviorSubject<LayoutSizeData>;
    editFormGroup: FormGroup;
    textEditorTop: ElementRef;
    descMdLeftRight: ElementRef;
    renderedDescContainerLeftRight: ElementRef;
    descMdTopDown: ElementRef;
    renderedDescContainerTopDown: ElementRef;
    editorCommands: CommonDocEditorCommandComponentConfig;
    autoUpdateInterval: number;
    sampleDesc?: string;
    descMd: string;
    descMdRecommended: string;
    recommendAvailable?: boolean;
    availableLayoutModes?: TextEditorLayout[];
    startLayoutMode?: TextEditorLayout;
    recommendDesc: EventEmitter<boolean>;
    changeDesc: EventEmitter<string>;
    changeRenderedDescId: EventEmitter<string>;
    constructor(cd: ChangeDetectorRef, fb: FormBuilder, angularMarkdownService: AngularMarkdownService, toastr: ToastrService, platformService: PlatformService, layoutService: LayoutService);
    ngOnInit(): void;
    onCallRecommendDesc(): boolean;
    onInputChanged(value: any, field: string): boolean;
    onLayoutChanged(layout: TextEditorLayout): boolean;
    onFileSelected(event: any): void;
    onFileSave(): boolean;
    onUseSampleDesc(): boolean;
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
    protected onResize(layoutSizeData: LayoutSizeData): void;
    protected calcContainerHeight(maxHeight: number, anchor: ElementRef, container: ElementRef): number;
    protected processFile(file: File): boolean;
}
