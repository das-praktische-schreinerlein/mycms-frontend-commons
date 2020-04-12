import {ChangeDetectorRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {ActionTag, ActionTagUtils, MultiActionTagConfig} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {CommonDocContentUtils} from '../../services/cdoc-contentutils.service';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocMultiActionManager} from '../../services/cdoc-multiaction.manager';
import {StringUtils} from '@dps/mycms-commons/dist/commons/utils/string.utils';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

export interface CommonDocMultiActionHeaderComponentConfig {
    tagConfigs: MultiActionTagConfig[];
}

export class CommonDocMultiActionHeaderComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractInlineComponent
    implements OnInit {
    tagConfigs: MultiActionTagConfig[] = [];
    tags: ActionTag[] = [];
    tagsValues: string[] = [];
    tagsOptions: IMultiSelectOption[] = [];
    tagsSettings: IMultiSelectSettings = { dynamicTitleMaxItems: 5,
        buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm',
        containerClasses: 'dropdown-inline',
        enableSearch: true,
        showUncheckAll: true,
        autoUnselect: true,
        selectionLimit: 1
    };
    tagsTexts: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Aktion ausgewählt',
        checkedPlural: 'Aktion ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '--',
        allSelected: 'Alle'};
    inputParamValue = '';
    selectParamValues = [];
    selectParamOptions: IMultiSelectOption[] = [];
    selectParamSettings: IMultiSelectSettings = { dynamicTitleMaxItems: 5,
        buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm',
        containerClasses: 'dropdown-inline',
        enableSearch: true,
        showUncheckAll: true,
        autoUnselect: false,
        selectionLimit: 0
    };
    selectParamTexts: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Keyword ausgewählt',
        checkedPlural: 'Keyword ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '--',
        allSelected: 'Alle'};
    flgShowInputParam = false;
    flgShowSelectParam = false;
    flgRecordsSelected = false;

    protected config;

    @Input()
    public searchResult: S;

    @Input()
    public multiActionManager: CommonDocMultiActionManager<R, F, S, D>;

    @Input()
    public selectValueMap?: Map<string, IMultiSelectOption[]>;

    @Input()
    public type?: string;

    @Output()
    public submitSelectedMultiActions: EventEmitter<MultiActionTagConfig[]> = new EventEmitter();

    constructor(protected appService: GenericAppService, protected contentUtils: CommonDocContentUtils, protected cd: ChangeDetectorRef) {
        super(cd);
    }

    ngOnInit() {
        this.appService.getAppState().subscribe(appState => {
            if (appState === AppState.Ready) {
                this.config = this.appService.getAppConfig();
                this.configureComponent(this.config);
                this.updateData();
            }
        });
    }

    onInputParamValue(event): boolean {
        this.inputParamValue = event.target.value;
        this.doProcessAdditionalParameters();

        return true;
    }

    onSelectParamValue(event): boolean {
        this.doProcessAdditionalParameters();

        return true;
    }

    onCheckAll(event): boolean {
        if (this.searchResult) {
            this.searchResult.currentRecords.map(record => {
                if (event.target.checked) {
                    this.multiActionManager.appendRecordToMultiActionTag(record);
                } else {
                    this.multiActionManager.removeRecordFromMultiActionTag(record);
                }
            });
            // signal a change
            this.multiActionManager.setSelectedMultiActionTags(
                this.multiActionManager.getSelectedMultiActionTags())
        }

        return true;
    }

    onChangeSelectedMultiAction(event): boolean {
        const actionTagConfigs: MultiActionTagConfig[] = [];
        this.flgShowInputParam = false;
        this.flgShowSelectParam = false;

        this.tagsValues = StringUtils.uniqueKeywords(this.tagsValues.join(','));

        for (const tagKey of this.tagsValues) {
            const actionTag = this.tags.find(value => value.config.key === tagKey);
            if (actionTag) {
                const multiConfig = <MultiActionTagConfig>actionTag.config;
                actionTagConfigs.push(multiConfig);
                if (multiConfig.flgUseInput) {
                    this.flgShowInputParam = true;
                    this.inputParamValue = multiConfig.payload[multiConfig.inputFieldName];
                }
                if (multiConfig.flgUseSelect) {
                    this.flgShowSelectParam = true;
                    this.selectParamOptions = [];
                    this.selectParamValues = [];
                    if (Array.isArray(multiConfig.selectParameterConstants)) {
                        multiConfig.selectParameterConstants.map(value => {
                            this.selectParamOptions.push({ id: value[0], name: value[1]});
                        });
                    } else if (multiConfig.selectParameterValueListKey && this.selectValueMap &&
                        Array.isArray(this.selectValueMap.get(multiConfig.selectParameterValueListKey))) {
                        this.selectValueMap.get(multiConfig.selectParameterValueListKey).map(value => {
                            this.selectParamOptions.push(value);
                        });
                    }
                }
            }
        }

        this.multiActionManager.setSelectedMultiActionTags(actionTagConfigs);
        this.flgRecordsSelected = this.multiActionManager.getSelectedRecords().length > 0
            && this.multiActionManager.getSelectedMultiActionTags().length > 0;
        this.cd.markForCheck();

        return false;
    }

    onSubmitSelectedMultiActions(event): boolean {
        this.submitSelectedMultiActions.emit(this.multiActionManager.getSelectedMultiActionTags());

        return false;
    }

    protected doProcessAdditionalParameters() {
        this.multiActionManager.getSelectedMultiActionTags().forEach(multiConfig => {
            if (multiConfig.flgUseSelect && multiConfig.flgUseInput) {
                this.flgShowSelectParam = true;
                this.flgShowInputParam = true;
                multiConfig.payload[multiConfig.inputFieldName] =
                    StringUtils.mergeKeywords(this.inputParamValue, this.selectParamValues.join(','), false);
            } else if (multiConfig.flgUseInput) {
                this.flgShowInputParam = true;
                this.flgShowSelectParam = false;
                multiConfig.payload[multiConfig.inputFieldName] = StringUtils.mergeKeywords(this.inputParamValue, '', false);
            } else if (multiConfig.flgUseSelect) {
                this.flgShowInputParam = false;
                this.flgShowSelectParam = true;
                multiConfig.payload[multiConfig.inputFieldName] = StringUtils.mergeKeywords(this.selectParamValues.join(','), '', false);
            }
        });

        this.cd.markForCheck();
    }

    protected getComponentConfig(config: {}): CommonDocMultiActionHeaderComponentConfig {
        if (BeanUtils.getValue(config, 'components.cdoc-multiactionheader.actionTags')) {
            return {
                tagConfigs: config['components']['cdoc-multiactionheader']['actionTags']
            };
        } else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    }

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.tagConfigs = componentConfig.tagConfigs;
    }

    protected updateData(): void {
        this.tagsOptions = [];
        if (this.searchResult === undefined) {
            this.tags = [];
        } else {
            this.tags = ActionTagUtils.generateTagsForRecords(this.tagConfigs, this.searchResult.currentRecords,
                this.config, { type: this.type});
            this.tags.map(value => {
                if (value.available) {
                    this.tagsOptions.push({id: value.config.key, name: value.config.name});
                }
            });
            if (this.multiActionManager) {
                if (this.searchResult.currentRecords !== undefined && this.multiActionManager.getSelectedRecords().length > 0) {
                    const recordToFind = new Map<string, R>();
                    this.multiActionManager.getSelectedRecords().map(value => {
                        recordToFind.set(value.id, value);
                    });

                    let idx = 0;
                    while (idx < this.searchResult.currentRecords.length && recordToFind.size > 0) {
                        const record = this.searchResult.currentRecords[idx];
                        if (recordToFind.has(record.id)) {
                            recordToFind.delete(record.id);
                        }
                        idx++;
                    }

                    recordToFind.forEach((record) => {
                        this.multiActionManager.removeRecordFromMultiActionTag(record);
                    });
                }
                this.multiActionManager.getSelectedRecordsObservable().subscribe(value => {
                    this.flgRecordsSelected = this.multiActionManager.getSelectedRecords().length > 0
                        && this.multiActionManager.getSelectedMultiActionTags().length > 0;
                    this.cd.markForCheck();
                });
            }
        }

        this.cd.markForCheck();
    }

}
