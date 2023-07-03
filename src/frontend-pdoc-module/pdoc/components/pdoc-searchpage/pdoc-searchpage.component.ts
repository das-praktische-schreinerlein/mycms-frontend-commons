import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject} from '@angular/core';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons//services/pdoc-data.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ActivatedRoute} from '@angular/router';
import {PDocSearchForm} from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import {PDocSearchResult} from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import {PDocSearchFormConverter} from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {
    CommonDocSearchpageComponent,
    CommonDocSearchpageComponentConfig
} from '../../../../frontend-cdoc-commons/components/cdoc-searchpage.component';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {SearchFormUtils} from '../../../../angular-commons/services/searchform-utils.service';
import {PDocActionTagService} from '../../../shared-pdoc/services/pdoc-actiontag.service';
import {PDocSearchFormUtils} from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import {CommonDocMultiActionManager} from '../../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {Location} from '@angular/common';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {COMMON_APP_ENVIRONMENT, CommonEnvironment} from '../../../../frontend-section-commons/common-environment';

export interface PDocSearchPageComponentConfig extends CommonDocSearchpageComponentConfig {
}

@Component({
    selector: 'app-pdoc-searchpage',
    templateUrl: './pdoc-searchpage.component.html',
    styleUrls: ['./pdoc-searchpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocSearchPageComponent extends CommonDocSearchpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult,
    PDocDataService> {
    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService, errorResolver: ErrorResolver,
                pdocDataService: PDocDataService, searchFormConverter: PDocSearchFormConverter,
                protected cdocRoutingService: PDocRoutingService, toastr: ToastrService, pageUtils: PageUtils,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, layoutService: LayoutService, searchFormUtils: SearchFormUtils,
                pdocSearchFormUtils: PDocSearchFormUtils, protected actionService: PDocActionTagService,
                protected elRef: ElementRef, location: Location,
                @Inject(COMMON_APP_ENVIRONMENT) protected environment: CommonEnvironment) {
        super(route, commonRoutingService, errorResolver, pdocDataService, searchFormConverter, cdocRoutingService,
            toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils,
            pdocSearchFormUtils, new CommonDocMultiActionManager(appService, actionService), environment, location);
    }

    onCreateNewRecord(type: string) {
        this.cdocRoutingService.navigateToCreate(type, null, null);
        return false;
    }

    protected getComponentConfig(config: {}): PDocSearchPageComponentConfig {
        return {
            maxAllowedM3UExportItems: 0,
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            availableCreateActionTypes: BeanUtils.getValue(config, 'components.pdoc-searchpage.availableCreateActionTypes'),
            defaultLayoutPerType: BeanUtils.getValue(config, 'components.pdoc-searchpage.defaultLayoutPerType')
        };
    }

    protected configureComponent(config: {}): void {
        super.configureComponent(config);
        const componentConfig = this.getComponentConfig(config);
        this.defaultLayoutPerType = componentConfig.defaultLayoutPerType;
    }

    protected doPreChecksBeforeSearch(): boolean {
        if ((this.searchForm.type === undefined || this.searchForm.type === '')
            && this.environment['pdocEmptyDefaultSearchTypes'] !== undefined && this.environment['pdocEmptyDefaultSearchTypes'] !== '') {
            this.searchForm.type = this.environment['pdocEmptyDefaultSearchTypes'];
            return this.redirectToSearch();
        }

        return super.doPreChecksBeforeSearch();
    }
}
