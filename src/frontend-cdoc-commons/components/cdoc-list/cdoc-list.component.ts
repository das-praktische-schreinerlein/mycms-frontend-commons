import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Layout} from '../../../angular-commons/services/layout.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {CommonDocMultiActionManager} from '../../services/cdoc-multiaction.manager';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';

@Component({
    selector: 'app-cdoc-list',
    templateUrl: './cdoc-list.component.html',
    styleUrls: ['./cdoc-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocListComponent <R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>>
    extends  AbstractInlineComponent {
    @Input()
    public searchResult: S;

    @Input()
    public baseSearchUrl: string;

    @Input()
    public layout: Layout;

    @Input()
    public short ? = false;

    @Input()
    public multiActionManager?: CommonDocMultiActionManager<R, F, S, CommonDocDataService<R, F, S>>;

    @Input()
    public playRecord: R;

    @Input()
    public playerIdPrefix?: string;

    @Output()
    public playerStarted: EventEmitter<R> = new EventEmitter();

    @Output()
    public playerStopped: EventEmitter<R> = new EventEmitter();

    @Output()
    public show: EventEmitter<R> = new EventEmitter();

    public Layout = Layout;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    onShow(record: R) {
        this.show.emit(record);
        return false;
    }

    onPlayerStarted(mdoc: R) {
        this.playerStarted.emit(mdoc);
    }

    onPlayerStopped(mdoc: R) {
        this.playerStopped.emit(mdoc);
    }

    getBackToSearchUrl(searchResult: S): string {
        return '';
    }

    protected updateData(): void {
    }
}
