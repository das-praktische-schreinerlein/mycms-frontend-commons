import {ChangeDetectorRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DynamicComponentHostDirective} from '../../../angular-commons/components/directives/dynamic-component-host.directive';
import {ActionTagEvent} from '../cdoc-actiontags/cdoc-actiontags.component';
import {ToastrService} from 'ngx-toastr';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {DynamicComponentService} from '../../../angular-commons/services/dynamic-components.service';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocActionTagService} from '../../services/cdoc-actiontag.service';

export class CommonDocActionsComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent {

    @Input()
    public record: R;

    @Input()
    public type: string;

    @Output()
    public actionTagEvent: EventEmitter<ActionTagEvent> = new EventEmitter();

    @ViewChild(DynamicComponentHostDirective)
    widgetHost: DynamicComponentHostDirective;

    protected childActionTagEvent: EventEmitter<ActionTagEvent> = new EventEmitter();

    constructor(protected dynamicComponentService: DynamicComponentService, protected toastr: ToastrService,
                protected cd: ChangeDetectorRef, protected appService: GenericAppService,
                protected actionTagService: CommonDocActionTagService<R, F, S, D>) {
        super(cd);
        this.configureActionListener();
    }

    protected configureActionListener(): void {
        this.childActionTagEvent.asObservable().subscribe(actionTagEvent => {
            this.actionTagService.processActionTagEvent(actionTagEvent, this.actionTagEvent).then(value => {
                this.updateData();
            }).catch(reason => {
                this.toastr.error('Es gibt leider Probleme - am besten noch einmal probieren :-(', 'Oje!');
            });
        });
    }

    protected updateData(): void {
        const componentRef = this.dynamicComponentService.createComponentByName(this.type, this.widgetHost);
        if (componentRef === undefined || componentRef === null) {
            return;
        }

        (componentRef.instance)['type'] = this.type;
        (componentRef.instance)['actionTagEvent'] = this.childActionTagEvent;
        (componentRef.instance)['record'] = this.record;
    }
}
