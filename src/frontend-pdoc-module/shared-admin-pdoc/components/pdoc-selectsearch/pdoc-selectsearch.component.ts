import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractInlineComponent} from '../../../../angular-commons/components/inline.component';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {CommonDocMultiActionManager} from '../../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {MultiActionTagConfig} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {Router} from '@angular/router';
import {Layout} from '../../../../angular-commons/services/layout.service';
import {PDocActionTagService} from '../../../shared-pdoc/services/pdoc-actiontag.service';

@Component({
    selector: 'app-pdoc-selectsearch',
    templateUrl: './pdoc-selectsearch.component.html',
    styleUrls: ['./pdoc-selectsearch.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocSelectSearchComponent extends AbstractInlineComponent {
    public Layout = Layout;
    public selectMultiActionManager = new CommonDocMultiActionManager(this.appService, this.actionService);

    selectFilter: {} = undefined;

    @Input()
    public modal ? = false;

    @Input()
    public baseId: string;

    @Input()
    public type: string;

    @Input()
    public nameFilterValues: string[];

    @Output()
    public appendSelected: EventEmitter<CommonDocRecord[]> = new EventEmitter();

    constructor(protected cd: ChangeDetectorRef,
                protected appService: GenericAppService,
                protected actionService: PDocActionTagService,
                protected router: Router) {
        super(cd);
        this.configureComponent();
    }

    onInputChanged(value: any, field: string): boolean {
        if (field.startsWith('blimblam')) {
        }

        return false;
    }

    onCreateNewRecord(id: string): boolean {
        const me = this;
        // open modal dialog
        me.router.navigate([{ outlets: { 'pdocmodaledit': ['pdocmodaledit', 'create', this.type.toUpperCase(), id] } }]).then(value => {
            // check for closing modal dialog and routechange -> update facets
            const subscription = me.router.events.subscribe((val) => {
                subscription.unsubscribe();
            });
        });


        this.onChangeSelectFilter();

        return false;
    }

    onRecordClickedOnMap(pdoc: PDocRecord): boolean {
        if (!this.selectMultiActionManager.isRecordOnMultiActionTag(pdoc)) {
            this.selectMultiActionManager.appendRecordToMultiActionTag(pdoc);
        } else {
            this.selectMultiActionManager.removeRecordFromMultiActionTag(pdoc);
        }

        return false;
    }

    onChangeSelectFilter(): boolean {
        this.selectFilter = this.getRecordFilters();
        this.cd.markForCheck();
        return false;
    }

    onAppendSelectedRecords(): boolean {
        const selectedRecords = this.selectMultiActionManager.getSelectedRecords();

        this.appendSelected.emit(selectedRecords);

        for (const selectedRecord of selectedRecords) {
            this.selectMultiActionManager.removeRecordFromMultiActionTag(selectedRecord);
        }

        return false;
    }

    getRecordFilters(): any {
        const filters = {};
        filters['type'] = this.type;
        filters['sort'] = 'distance';

        const fullText: string = [].concat(this.nameFilterValues)
            .map(value => {
                return value && value.length > 0
                    ? value.split(' -> ')
                        .pop()
                        .trim()
                    : undefined
            })
            .map(value => {
                return value && value.length > 0
                    ? value.split(' - ')
                        .pop()
                        .trim()
                    : undefined
            })
            .filter(value => value !== undefined && value !== 'undefined' && value.length > 0)
            .join(' OR ');
        if (fullText) {
            filters['fulltext'] = fullText;
        }

        return filters;
    }

    protected configureComponent(): void {
        const actionTag: MultiActionTagConfig =  {
            configAvailability: [],
            flgUseInput: false,
            flgUseSelect: false,
            recordAvailability: [],
            shortName: '',
            showFilter: [],
            name: 'noop',
            key: 'noop',
            type: 'noop',
            multiRecordTag: true
        };
        actionTag['active'] = true;
        actionTag['available'] = true;

        this.selectMultiActionManager.setSelectedMultiActionTags(
            [
                actionTag
            ]);
    }

    protected updateData(): void {
        //this.updateFormComponents();
    }

}
