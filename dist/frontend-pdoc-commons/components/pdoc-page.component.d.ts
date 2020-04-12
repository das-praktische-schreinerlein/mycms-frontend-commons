import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PageUtils } from '../../angular-commons/services/page.utils';
import { GenericTrackingService } from '../../angular-commons/services/generic-tracking.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { LayoutService, LayoutSizeData } from '../../angular-commons/services/layout.service';
import { BehaviorSubject } from 'rxjs';
import { PlatformService } from '../../angular-commons/services/platform.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { CommonEnvironment } from '../common-environment';
export declare abstract class AbstractPageComponent implements OnInit, OnDestroy {
    protected route: ActivatedRoute;
    protected toastr: ToastrService;
    protected pageUtils: PageUtils;
    protected cd: ChangeDetectorRef;
    protected trackingProvider: GenericTrackingService;
    protected appService: GenericAppService;
    protected platformService: PlatformService;
    protected layoutService: LayoutService;
    protected environment: CommonEnvironment;
    protected config: any;
    protected initialized: boolean;
    protected layoutSizeObservable: BehaviorSubject<LayoutSizeData>;
    showLoadingSpinner: boolean;
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    constructor(route: ActivatedRoute, toastr: ToastrService, pageUtils: PageUtils, cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService, environment: CommonEnvironment);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onScrollToTop(): void;
    protected onResize(layoutSizeData: LayoutSizeData): void;
    protected abstract configureComponent(config: {}): void;
    protected abstract configureProcessing(config: {}): void;
    protected abstract processError(data: any): boolean;
    protected abstract setMetaTags(config: {}, pdoc: PDocRecord, record: any): void;
    protected abstract setPageLayoutAndStyles(): void;
}
