import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {BaseObjectDetectionImageObjectRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/baseobjectdetectionimageobject-record';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';

export interface CommonDocODObjectDetailsComponentConfig {
    defaultShowKeyAsTooltip: boolean;
    defaultFilterForNameToShowNameAndKey: [string];
}
@Component({
    selector: 'app-cdoc-odobjectdetails',
    templateUrl: './cdoc-odobjectdetails.component.html',
    styleUrls: ['./cdoc-odobjectdetails.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocODObjectDetailsComponent extends AbstractInlineComponent implements OnInit {
    protected showKeyColumn = false;
    protected defaultShowKeyAsTooltip = false;
    protected defaultFilterForNameToShowNameAndKey: string[] = [];
    protected config;

    @Input()
    public objects: BaseObjectDetectionImageObjectRecordType[];

    @Input()
    public showKeyAsTooltip?: boolean = undefined;

    @Input()
    public filterForNameToShowNameAndKey?: string = undefined;

    constructor(protected appService: GenericAppService, protected cd: ChangeDetectorRef) {
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

    protected getComponentConfig(config: {}): CommonDocODObjectDetailsComponentConfig {
        return {
            defaultShowKeyAsTooltip: BeanUtils.getValue(config, 'components.cdoc-odobjectdetails.defaultShowKeyAsTooltip') || false,
            defaultFilterForNameToShowNameAndKey: BeanUtils.getValue(config, 'components.cdoc-odobjectdetails.defaultFilterForNameToShowNameAndKey') || []
        };
    }

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.defaultShowKeyAsTooltip = componentConfig.defaultShowKeyAsTooltip;
        this.defaultFilterForNameToShowNameAndKey = componentConfig.defaultFilterForNameToShowNameAndKey;
    }

    protected checkShowName(object: BaseObjectDetectionImageObjectRecordType): boolean {
        if (!this.defaultFilterForNameToShowNameAndKey || !object.key || !object.name) {
            return false;
        }

        for (let pattern of this.defaultFilterForNameToShowNameAndKey) {
            if (object.name.startsWith(pattern)) {
                return true;
            }
            if (object.name.match(new RegExp(pattern))) {
                return true;
            }
        }

        return false;
    }

    protected updateData(): void {
        this.showKeyColumn = false;
        if (this.objects) {
            for (var object of this.objects) {
                if (this.checkShowName(object)) {
                    this.showKeyColumn = true;
                    break;
                }
            }
        }

        this.cd.markForCheck();
    }
}
