import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractInlineComponent} from '../inline.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularMarkdownService} from '../../services/angular-markdown.service';
import {PlatformService} from '../../services/platform.service';


export enum TextEditorLayout {
    TOPDOWN, TOPDOWNFULLSCREEN, LEFTRIGHT, LEFTRIGHTFULLSCREEN
}

export interface EditorCommand {
    label: string,
    type ?: string
}

export interface SingleEditorCommand extends EditorCommand {
    command: string
}

export interface RangeEditorCommand extends EditorCommand {
    commandStart: string,
    commandEnd: string
}

export interface EditorCommandBlock {
    label: string
    commands: EditorCommand[];
}

export interface CommonDocEditorCommandComponentConfig {
    singleCommands ?: SingleEditorCommand[];
    rangeCommands ?: RangeEditorCommand[];
    commandBlocks ?: EditorCommandBlock[];
}

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent extends AbstractInlineComponent {
    readonly TextEditorLayout = TextEditorLayout;

    currentLayoutMode = TextEditorLayout.LEFTRIGHT;

    private flgDescRendered = false;
    private renderingRunning = false;
    private renderTimer = undefined;
    private lastRenderUpdate: number = undefined;

    public editFormGroup: FormGroup = this.fb.group({
        descMd: '',
        descMdRecommended: '',
    });

    @Input()
    public editorCommands: CommonDocEditorCommandComponentConfig = {
        singleCommands: [],
        rangeCommands: [],
        commandBlocks: []
    };


    @Input()
    public autoUpdateInterval = 3000;

    @Input()
    public descMd = '';

    @Input()
    public descMdRecommended = '';

    @Input()
    public recommendAvailable ? = false;

    @Input()
    public availableLayoutModes ?: TextEditorLayout[] = [
        TextEditorLayout.TOPDOWN,
        TextEditorLayout.LEFTRIGHT
    ];

    @Input()
    public startLayoutMode ? = TextEditorLayout.LEFTRIGHT;

    @Output()
    public recommendDesc: EventEmitter<boolean> = new EventEmitter();

    @Output()
    public changeDesc: EventEmitter<string> = new EventEmitter();

    @Output()
    public changeRenderedDescId: EventEmitter<string> = new EventEmitter();

    constructor(protected cd: ChangeDetectorRef,
                public fb: FormBuilder,
                protected angularMarkdownService: AngularMarkdownService,
                protected platformService: PlatformService,
    ) {
        super(cd);
        this.onLayoutChanged(this.startLayoutMode || TextEditorLayout.LEFTRIGHT);
        this.updateRenderInterval();
    }

    onCallRecommendDesc(): boolean {
        this.recommendDesc.emit(true);
        return false;
    }

    onInputChanged(value: any, field: string): boolean {
        if (field === 'descMd') {
            this.changeDesc.emit(value);
            this.flgDescRendered = false;
        }

        return false;
    }

    onLayoutChanged(layout: TextEditorLayout): boolean {
        this.currentLayoutMode = layout;

        // render after layout has changed
        const me = this;
        setTimeout(function () { me.renderDesc(true); }, 500);

        return false;
    }

    useRecommendedDesc(): void {
        const descMdRecommended = this.editFormGroup.getRawValue()['descMdRecommended'] || '';
        this.setValue('descMd', descMdRecommended);
        this.onInputChanged(descMdRecommended, 'descMd');

        this.setValue('descMdRecommended', undefined);
        this.renderDesc(true);
    }

    addSingleCommand(command: SingleEditorCommand): void {
        if (!this.platformService.isClient()) {
            return;
        }

        const  descId = this.getCurrentDescId();
        const textarea = <HTMLTextAreaElement> document.querySelector('#' + descId);
        if (!textarea || textarea === undefined || textarea === null) {
            return;
        }

        const oldString = textarea.value;
        const startPos = textarea.selectionStart || 0;

        const newString = oldString.substring(0, startPos)
            + command.command
            + oldString.substring(startPos, oldString.length);

        this.setValue('descMd', newString);
        this.renderDesc(true);

        textarea.focus();
        textarea.selectionStart = startPos;
        textarea.selectionEnd = startPos;
    }

    addRangeCommand(command: RangeEditorCommand): void {
        if (!this.platformService.isClient()) {
            return;
        }

        const  descId = this.getCurrentDescId();
        const textarea = <HTMLTextAreaElement> document.querySelector('#' + descId);
        if (!textarea || textarea === undefined || textarea === null) {
            return;
        }

        const oldString = textarea.value;
        const startPos = textarea.selectionStart || 0;
        const endPos = textarea.selectionEnd || 0;

        const newString = oldString.substring(0, startPos)
            + command.commandStart
            + oldString.substring(startPos, endPos)
            + command.commandEnd
            + oldString.substring(endPos, oldString.length);

        this.setValue('descMd', newString);
        this.renderDesc(true);

        textarea.focus();
        textarea.selectionStart = startPos;
        textarea.selectionEnd = startPos;
    }

    setValue(field: string, value: any): void {
        const config = {};
        config[field] = value;
        this.editFormGroup.patchValue(config);
    }

    renderDesc(force: boolean): string {
        if (this.renderingRunning || (this.flgDescRendered && !force)) {
            return;
        }

        const curTime = (new Date()).getTime();
        if (!force && (this.lastRenderUpdate && (curTime - this.lastRenderUpdate) < this.autoUpdateInterval)) {
            return;
        }

        this.renderingRunning = true;

        const desc = this.editFormGroup.getRawValue()['descMd'] || '';
        if (!this.platformService.isClient()) {
            this.renderingRunning = false;
            return desc;
        }

        this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#renderedDescTopDown', desc, true)
        this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#renderedDescLeftRight', desc, true) || this.flgDescRendered;
        this.renderingRunning = false;
        this.lastRenderUpdate = curTime;

        this.changeRenderedDescId.emit(this.getCurrentRenderedDescId());

        return '';
    }

    protected updateData(): void {
        this.setValue('descMdRecommended', this.descMdRecommended);
        this.setValue('descMd', this.descMd);
        this.updateRenderInterval();
    }

    protected updateRenderInterval() {
        if (this.renderTimer) {
            clearInterval(this.renderTimer);
        }

        if (this.autoUpdateInterval) {
            const me = this;

            this.renderTimer = setInterval(function () { me.renderDesc(false); }, this.autoUpdateInterval);
        }
    }

    protected getCurrentDescId() {
        let descId = 'descMdLeftRight';
        if (this.isTopDownLayout(this.currentLayoutMode)) {
            descId = 'descMdTopDown';
        }

        return descId;
    }

    protected getCurrentRenderedDescId() {
        let descId = 'renderedDescLeftRight';
        if (this.isTopDownLayout(this.currentLayoutMode)) {
            descId = 'renderedDescTopDown';
        }

        return descId;
    }

    protected isTopDownLayout(layout: TextEditorLayout) {
        return layout !== undefined && (TextEditorLayout.TOPDOWN === layout || TextEditorLayout.TOPDOWNFULLSCREEN === layout);
    }

}
