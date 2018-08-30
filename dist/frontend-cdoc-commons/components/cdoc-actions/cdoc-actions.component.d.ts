import { ChangeDetectorRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { DynamicComponentHostDirective } from '../../../angular-commons/components/directives/dynamic-component-host.directive';
import { ActionTagEvent } from '../cdoc-actiontags/cdoc-actiontags.component';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { CommonDocAlbumService } from '../../services/cdoc-album.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { DynamicComponentService } from '../../../angular-commons/services/dynamic-components.service';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export interface CommonDocActionsComponentConfig {
    baseEditPath: string;
}
export declare class CommonDocActionsComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent {
    protected dynamicComponentService: DynamicComponentService;
    protected router: Router;
    protected cdocDataService: D;
    protected toastr: ToastsManager;
    protected cdocAlbumService: CommonDocAlbumService;
    protected cd: ChangeDetectorRef;
    protected appService: GenericAppService;
    protected baseEditPath: string;
    record: R;
    type: string;
    actionTagEvent: EventEmitter<ActionTagEvent>;
    widgetHost: DynamicComponentHostDirective;
    protected childActionTagEvent: EventEmitter<ActionTagEvent>;
    constructor(dynamicComponentService: DynamicComponentService, router: Router, cdocDataService: D, toastr: ToastsManager, vcr: ViewContainerRef, cdocAlbumService: CommonDocAlbumService, cd: ChangeDetectorRef, appService: GenericAppService);
    protected getComponentConfig(config: {}): CommonDocActionsComponentConfig;
    protected configureComponent(config: {}): void;
    protected configureActionListener(): void;
    protected updateData(): void;
}
