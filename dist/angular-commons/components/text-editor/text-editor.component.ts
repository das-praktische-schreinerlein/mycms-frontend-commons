import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ElementRef
} from '@angular/core';
import {AbstractInlineComponent} from '../inline.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularMarkdownService} from '../../services/angular-markdown.service';
import {PlatformService} from '../../services/platform.service';
import {LayoutService, LayoutSizeData} from '../../services/layout.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AngularHtmlService} from '../../services/angular-html.service';
import {DateUtils} from '@dps/mycms-commons/dist/commons/utils/date.utils';


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

export interface DescContainerOptions {
    height: string;
}

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditorComponent extends AbstractInlineComponent implements OnInit {
    readonly TextEditorLayout = TextEditorLayout;

    currentLayoutMode = TextEditorLayout.LEFTRIGHT;
    descContainerLeftRightOptions: DescContainerOptions = { height: '700px'};
    descContainerTopDownOptions: DescContainerOptions = { height: '700px'};
    renderedDescContainerLeftRightOptions: DescContainerOptions = { height: '1000px'};
    renderedDescContainerTopDownOptions: DescContainerOptions = { height: '1000px'};

    private flgDescRendered = false;
    private renderingRunning = false;
    private renderTimer = undefined;
    private lastRenderUpdate: number = undefined;

    protected layoutSizeObservable: BehaviorSubject<LayoutSizeData>;

    public editFormGroup: FormGroup = this.fb.group({
        descMd: '',
        descMdRecommended: '',
    });

    @ViewChild('textEditorTop')
    textEditorTop: ElementRef;

    @ViewChild('descMdLeftRight')
    descMdLeftRight: ElementRef;

    @ViewChild('renderedDescContainerLeftRight')
    renderedDescContainerLeftRight: ElementRef;

    @ViewChild('descMdTopDown')
    descMdTopDown: ElementRef;

    @ViewChild('renderedDescContainerTopDown')
    renderedDescContainerTopDown: ElementRef;

    @Input()
    public editorCommands: CommonDocEditorCommandComponentConfig = {
        singleCommands: [],
        rangeCommands: [],
        commandBlocks: []
    };


    @Input()
    public autoUpdateInterval = 3000;

    @Input()
    public sampleDesc ? = '';

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
                protected angularMarkdownService: AngularMarkdownService, protected toastr: ToastrService,
                protected platformService: PlatformService, protected layoutService: LayoutService
    ) {
        super(cd);
    }

    ngOnInit() {
        const me = this;

        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(layoutSizeData => {
            me.onResize(layoutSizeData);
        });

        me.onResize(this.layoutSizeObservable.value);

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

    onFileSelected(event: any) {
        for (const file of event.srcElement.files) {
            this.processFile(file);
        }
    }

    onFileSave(): boolean {
        const filename = 'markdown-' + DateUtils.formatToFileNameDate(new Date(), '', '-', '') +  '.md';
        AngularHtmlService.browserSaveTextAsFile(this.editFormGroup.getRawValue()['descMd'] || '', filename, 'text/markdown');

        return true;
    }

    onUseSampleDesc(): boolean {
        const sampleDesc = this.sampleDesc;
        this.setValue('descMd', sampleDesc);
        this.onInputChanged(sampleDesc, 'descMd');
        this.renderDesc(true);

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

        const descId = this.getCurrentDescId();
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

        const renderedDescId =  this.getCurrentRenderedDescId();
        this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#' + renderedDescId, desc, true);
        this.renderingRunning = false;
        this.lastRenderUpdate = curTime;

        this.changeRenderedDescId.emit(renderedDescId);

        this.onResize(this.layoutSizeObservable.value);

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

    protected onResize(layoutSizeData: LayoutSizeData): void {
        let maxHeight = 1200;
        if (layoutSizeData.height < maxHeight + 50) {
            maxHeight = layoutSizeData.height - 50;
        }

        // leftRight
        this.descContainerLeftRightOptions = {
            height: this.calcContainerHeight(maxHeight, this.textEditorTop, this.descMdLeftRight) + 'px'
        };
        this.renderedDescContainerLeftRightOptions = {
            height: this.calcContainerHeight(maxHeight, this.textEditorTop, this.renderedDescContainerLeftRight) + 'px'
        };

        // topDown
        let offset = 0;
        if (this.descMdTopDown !== undefined && this.renderedDescContainerTopDown !== undefined) {
            offset = this.renderedDescContainerTopDown.nativeElement.getBoundingClientRect().y
                - this.textEditorTop.nativeElement.getBoundingClientRect().y
                - this.descMdTopDown.nativeElement.getBoundingClientRect().height;
        }

        const topDownHeight = ((maxHeight - offset) / 2) + 'px';
        this.descContainerTopDownOptions = { height: topDownHeight};
        this.renderedDescContainerTopDownOptions = { height: topDownHeight};

        this.cd.markForCheck();
    }

    protected calcContainerHeight(maxHeight: number, anchor: ElementRef, container: ElementRef): number {
        if (anchor === undefined || container === undefined) {
            return maxHeight;
        }

        return maxHeight - (container.nativeElement.getBoundingClientRect().y - anchor.nativeElement.getBoundingClientRect().y);
    }

    protected processFile(file: File): boolean {
        const me = this;
        const reader = new FileReader();
        const maxLength = 1000000;
        if (file.size > maxLength) {
            me.toastr.warning('Die Markdown-Datei darf höchstes ' + maxLength / 1000000 + 'MB sein.', 'Oje!');
            return;
        }
        if (!file.name.toLowerCase().endsWith('.md')) {
            me.toastr.warning('Es dürfen nur .md Dateien geladen werden.', 'Oje!');
            return;
        }

        reader.onload = (function(theFile) {
            return function(e) {
                const src = e.target.result;
                return me.setValue('descMd', src);
            };
        })(file);

        // Read in the file as a data URL.
        reader.readAsText(file);
    }
}
