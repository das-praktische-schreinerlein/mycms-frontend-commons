import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {PDocCreatepageComponent} from './pdoc-createpage.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {COMMON_APP_ENVIRONMENT, CommonEnvironment} from '../../../../frontend-section-commons/common-environment';

@Component({
    selector: 'app-pdoc-modal-createpage',
    templateUrl: './pdoc-modal-createpage.component.html',
    styleUrls: ['./pdoc-createpage.component.css', '../../../../frontend-cdoc-commons/styles/cdoc-modal-createpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDocModalCreatepageComponent extends PDocCreatepageComponent {
    constructor(protected route: ActivatedRoute, protected cdocRoutingService: PDocRoutingService,
                protected toastr: ToastrService, contentUtils: PDocContentUtils,
                protected errorResolver: ErrorResolver, protected pageUtils: PageUtils,
                protected commonRoutingService: CommonRoutingService, protected angularMarkdownService: AngularMarkdownService,
                protected angularHtmlService: AngularHtmlService, protected cd: ChangeDetectorRef,
                protected trackingProvider: GenericTrackingService, protected appService: GenericAppService,
                protected platformService: PlatformService, protected layoutService: LayoutService,
                protected pdocDataService: PDocDataService, router: Router,
                @Inject(COMMON_APP_ENVIRONMENT) protected environment: CommonEnvironment) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService,
            angularMarkdownService, angularHtmlService, cd, trackingProvider, appService,
            platformService, layoutService, pdocDataService, router, environment);
        this.modal = true;
    }

    submitSave(values: {}) {
        const me = this;
        this.cdocDataService.add(values).then(function doneDocCreated(cdoc: PDocRecord) {
                me.closeModal();
            },
            function errorCreate(reason: any) {
                console.error('create add failed:', reason);
                me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
            }
        );
        return false;
    }

}
