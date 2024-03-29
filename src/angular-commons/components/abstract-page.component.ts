import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PageUtils} from '../services/page.utils';
import {GenericTrackingService} from '../services/generic-tracking.service';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {LayoutService, LayoutSizeData} from '../services/layout.service';
import {BehaviorSubject} from 'rxjs';
import {PlatformService} from '../services/platform.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {CommonEnvironment} from '../../frontend-section-commons/common-environment';

export interface CommonPageComponentComponentConfig {
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    modalOutletName?: string;
}

export abstract class AbstractPageComponent implements OnInit, OnDestroy {
    protected config;
    protected initialized = false;
    protected layoutSizeObservable: BehaviorSubject<LayoutSizeData>;

    showLoadingSpinner = false;
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    modalOutletName: string;

    constructor(protected route: ActivatedRoute, protected toastr: ToastrService, protected pageUtils: PageUtils,
                protected cd: ChangeDetectorRef, protected trackingProvider: GenericTrackingService,
                protected appService: GenericAppService, protected platformService: PlatformService,
                protected layoutService: LayoutService, protected environment: CommonEnvironment) {
    }

    ngOnInit() {
        // reset initialized
        this.initialized = false;
        const me = this;

        this.layoutSizeObservable = this.layoutService.getLayoutSizeData();
        this.layoutSizeObservable.subscribe(layoutSizeData => {
            me.onResize(layoutSizeData);
        });

        this.appService.getAppState().subscribe(appState => {
            if (appState === AppState.Ready) {
                me.config = me.appService.getAppConfig();
                me.configureComponent(me.config);
                me.configureProcessing(me.config);
            }
        });
    }

    ngOnDestroy() {
    }

    onScrollToTop() {
        this.pageUtils.scrollToTop();
    }

    protected onResize(layoutSizeData: LayoutSizeData): void {
    }

    protected abstract configureComponent(config: {}): void;

    protected abstract configureProcessing(config: {}): void;

    protected abstract processError(data: any): boolean;

    protected abstract setMetaTags(config: {}, pdoc: PDocRecord, record: any): void;

    protected abstract setPageLayoutAndStyles(): void;
}
