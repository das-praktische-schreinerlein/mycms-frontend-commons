import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {PDocSearchResult} from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {
    CommonDocEditpageComponent,
    CommonDocEditpageComponentConfig
} from '../../../../frontend-cdoc-commons/components/cdoc-editpage.component';
import {PDocSearchForm} from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {COMMON_APP_ENVIRONMENT, CommonEnvironment} from '../../../../frontend-section-commons/common-environment';

@Component({
    selector: 'app-pdoc-editpage',
    templateUrl: './pdoc-editpage.component.html',
    styleUrls: ['./pdoc-editpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocEditpageComponent
    extends CommonDocEditpageComponent<PDocRecord, PDocSearchForm, PDocSearchResult, PDocDataService> {
    showResultListTrigger: {
        PAGE: boolean|number;
    } = {
        PAGE: false
    };
    availableTabs = {
        'PAGE': true
    };

    constructor(protected route: ActivatedRoute, protected cdocRoutingService: PDocRoutingService,
                protected toastr: ToastrService, contentUtils: PDocContentUtils,
                protected errorResolver: ErrorResolver, protected pageUtils: PageUtils,
                protected commonRoutingService: CommonRoutingService, protected angularMarkdownService: AngularMarkdownService,
                protected angularHtmlService: AngularHtmlService, protected cd: ChangeDetectorRef,
                protected trackingProvider: GenericTrackingService, protected appService: GenericAppService,
                protected platformService: PlatformService, protected layoutService: LayoutService,
                protected pdocDataService: PDocDataService,
                @Inject(COMMON_APP_ENVIRONMENT) protected environment: CommonEnvironment) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService,
            angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, pdocDataService);
    }

    protected getComponentConfig(config: {}): CommonDocEditpageComponentConfig {
        return {
            baseSearchUrl: ['pdoc'].join('/'),
            baseSearchUrlDefault: ['pdoc'].join('/'),
            editAllowed: (BeanUtils.getValue(config, 'permissions.pdocWritable') === true)
        };
    }

    getFiltersForType(record: PDocRecord, type: string): any {
        return (<PDocContentUtils>this.contentUtils).getPDocSubItemFiltersForType(record, type,
            (this.pdoc ? this.pdoc.theme : undefined));
    }

}
