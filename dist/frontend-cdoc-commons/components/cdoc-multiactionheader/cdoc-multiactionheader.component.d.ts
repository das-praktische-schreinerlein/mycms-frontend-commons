import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { ActionTag, MultiActionTagConfig } from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import { CommonDocContentUtils } from '../../services/cdoc-contentutils.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { CommonDocRecord } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import { CommonDocSearchForm } from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import { CommonDocSearchResult } from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import { CommonDocDataService } from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import { CommonDocMultiActionManager } from '../../services/cdoc-multiaction.manager';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
export interface CommonDocMultiActionHeaderComponentConfig {
    tagConfigs: MultiActionTagConfig[];
}
export declare class CommonDocMultiActionHeaderComponent<R extends CommonDocRecord, F extends CommonDocSearchForm, S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent implements OnInit {
    protected appService: GenericAppService;
    protected contentUtils: CommonDocContentUtils;
    protected cd: ChangeDetectorRef;
    tagConfigs: MultiActionTagConfig[];
    tags: ActionTag[];
    tagsValues: string[];
    tagsOptions: IMultiSelectOption[];
    tagsSettings: IMultiSelectSettings;
    tagsTexts: IMultiSelectTexts;
    inputParamValue: string;
    selectParamValues: any[];
    selectParamOptions: IMultiSelectOption[];
    selectParamSettings: IMultiSelectSettings;
    selectParamTexts: IMultiSelectTexts;
    flgShowInputParam: boolean;
    flgShowSelectParam: boolean;
    flgRecordsSelected: boolean;
    protected config: any;
    searchResult: S;
    multiActionManager: CommonDocMultiActionManager<R, F, S, D>;
    selectValueMap?: Map<string, IMultiSelectOption[]>;
    submitSelectedMultiActions: EventEmitter<MultiActionTagConfig[]>;
    constructor(appService: GenericAppService, contentUtils: CommonDocContentUtils, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onInputParamValue(event: any): boolean;
    onSelectParamValue(event: any): boolean;
    onCheckAll(event: any): boolean;
    onChangeSelectedMultiAction(event: any): boolean;
    onSubmitSelectedMultiActions(event: any): boolean;
    protected doProcessAdditionalParameters(): void;
    protected getComponentConfig(config: {}): CommonDocMultiActionHeaderComponentConfig;
    protected configureComponent(config: {}): void;
    protected updateData(): void;
}
