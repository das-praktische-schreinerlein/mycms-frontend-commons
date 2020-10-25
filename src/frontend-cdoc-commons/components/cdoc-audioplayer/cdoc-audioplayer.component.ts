import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import {CommonDocContentUtils, CommonItemData} from '../../services/cdoc-contentutils.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';

@Component({
    selector: 'app-cdoc-audioplayer',
    templateUrl: './cdoc-audioplayer.component.html',
    styleUrls: ['./cdoc-audioplayer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocAudioplayerComponent extends AbstractInlineComponent {
    maxWidth = 600;
    maxHeight = 800;
    maxFullWidth = 1200;
    maxFullHeight = 1200;
    flgIsPlaying = false;
    playerId;

    public contentUtils: CommonDocContentUtils;
    listItem: CommonItemData = {
        currentRecord: undefined,
        styleClassFor: undefined,
        thumbnailUrl: undefined,
        previewUrl: undefined,
        fullUrl: undefined,
        audio: undefined,
        image: undefined,
        video: undefined,
        urlShow: undefined
    };

    @ViewChild('audioPlayer') audioplayer: any;

    @Input()
    public record: CommonDocRecord;

    @Input()
    public width: 150;

    @Input()
    public styleClass: 'picture-small';

    @Input()
    public playerIdPrefix ? = 'player';

    @Input()
    public autoplay?: boolean = false;

    @Output()
    public playerStarted: EventEmitter<CommonDocRecord> = new EventEmitter();

    @Output()
    public playerStopped: EventEmitter<CommonDocRecord> = new EventEmitter();

    @Output()
    public show: EventEmitter<CommonDocRecord> = new EventEmitter();

    constructor(contentUtils: CommonDocContentUtils, protected cd: ChangeDetectorRef) {
        super(cd);
        this.contentUtils = contentUtils;
    }

    submitShow(cdoc: CommonDocRecord) {
        this.show.emit(cdoc);
        return false;
    }

    onPlayerStarted() {
        this.startPlaying();
        this.flgIsPlaying = true;
        this.playerStarted.emit(this.record);
    }

    onPlayerEnded() {
        this.flgIsPlaying = false;
        this.playerStopped.emit(this.record);
    }

    onPlayerPaused() {
        this.flgIsPlaying = false;
    }

    protected updateData(): void {
        if (window) {
            this.maxWidth = Math.min(600, window.innerWidth - 100);
            this.maxHeight = Math.min(800, window.innerHeight - 80);
            this.maxFullWidth = Math.min(1200, window.innerWidth - 50);
            this.maxFullHeight = Math.min(1200, window.innerHeight - 80);
        }
        this.contentUtils.updateItemData(this.listItem, this.record, 'default');
        this.playerId = this.playerIdPrefix + '_' + this.listItem.currentRecord.id;
        this.cd.markForCheck();
        this.startAutoPlayPlayer();
    }

    startPlaying() {
        const audios = document.querySelectorAll('audio');
        for (let i = 0; i < audios.length; i++) {
            const audio = audios[i];
            if (audio.getAttribute('mediaid') !== this.playerId) {
                audio.pause();
            }
        }
    }

    startAutoPlayPlayer(): void {
        if (this.autoplay) {
            const audios = document.querySelectorAll('audio');
            for (let i = 0; i < audios.length; i++) {
                const audio = audios[i];
                if (audio.getAttribute('mediaid') === this.playerId) {
                    audio.play();
                }
            }
        }
    }
}

