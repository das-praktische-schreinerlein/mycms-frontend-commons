import { ChangeDetectorRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { DynamicComponentHostDirective } from '../../../angular-commons/components/directives/dynamic-component-host.directive';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
import { ToastsManager } from 'ng2-toastr';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { DynamicComponentService } from '../../../angular-commons/services/dynamic-components.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocActionTagService } from '../../services/cdoc-actiontag.service';
export interface CommonDocActionsComponentConfig {
    baseEditPath: string;
}
export declare class CommonDocActionsComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent {
    protected dynamicComponentService: DynamicComponentService;
    protected toastr: ToastsManager;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected actionTagService: CommonDocActionTagService<R, F, S, D>;
    record: R;
    type: string;
    actionTagEvent: EventEmitter<ActionTagEvent>;
    widgetHost: DynamicComponentHostDirective;
    protected childActionTagEvent: EventEmitter<ActionTagEvent>;
    constructor(dynamicComponentService: DynamicComponentService, toastr: ToastsManager, vcr: ViewContainerRef, cd: ChangeDetectorRef, appService: GenericAppService, actionTagService: CommonDocActionTagService<R, F, S, D>);
    protected configureActionListener(): void;
    protected updateData(): void;
}
