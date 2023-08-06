/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PDocShowPageComponent} from './pdoc-showpage.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '../../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRouteStub} from '../../../../testing/router-stubs';
import {AppServiceStub} from '../../../../angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {RouterStub} from '../../../../angular-commons/testing/router-stubs';
import {Angulartics2} from 'angulartics2';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {Angulartics2Stub} from '../../../../angular-commons/testing/angulartics2-stubs';
import {DatePipe} from '@angular/common';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {PDocSearchFormConverter} from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {SearchFormUtils} from '../../../../angular-commons/services/searchform-utils.service';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {ToastrServiceStub} from '../../../../testing/toasts-stubs';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {PDocDataServiceStub} from '../../../../testing/pdoc-dataservice-stubs';
import {COMMON_APP_ENVIRONMENT} from '../../../../frontend-section-commons/common-environment';

describe('PDocShowPageComponent', () => {
    let component: PDocShowPageComponent;
    let fixture: ComponentFixture<PDocShowPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PDocShowPageComponent],
            imports: [
                TranslateModule.forRoot()],
            providers: [
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
                { provide: Router, useValue: new RouterStub() },
                DatePipe,
                CommonRoutingService,
                PlatformService,
                PDocContentUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() },
                CommonDocRoutingService,
                PDocRoutingService,
                { provide: PDocDataService, useValue: new PDocDataServiceStub() },
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                AngularMarkdownService,
                AngularHtmlService,
                ErrorResolver,
                PageUtils,
                GenericTrackingService,
                { provide: Angulartics2, useValue: new Angulartics2Stub() },
                LayoutService,
                PDocSearchFormConverter,
                SearchFormUtils,
                SearchParameterUtils,
                { provide: COMMON_APP_ENVIRONMENT, useValue: {}}
        ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PDocShowPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
