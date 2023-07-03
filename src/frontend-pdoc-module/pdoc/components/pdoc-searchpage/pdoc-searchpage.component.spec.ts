/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PDocSearchPageComponent} from './pdoc-searchpage.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PDocSearchFormConverter} from '../../../shared-pdoc/services/pdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '../../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRouteStub} from '../../../../testing/router-stubs';
import {PDocDataServiceStub} from '../../../../testing/pdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {ErrorResolver} from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../../angular-commons/services/page.utils';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {RouterStub} from '../../../../angular-commons/testing/router-stubs';
import {Angulartics2} from 'angulartics2';
import {GenericTrackingService} from '../../../../angular-commons/services/generic-tracking.service';
import {Angulartics2Stub} from '../../../../angular-commons/testing/angulartics2-stubs';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {SearchFormUtils} from '../../../../angular-commons/services/searchform-utils.service';
import {PDocRoutingService} from '../../../shared-pdoc/services/pdoc-routing.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../../angular-commons/testing/appservice-stubs';
import {PDocSearchFormUtils} from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import {PDocActionTagService} from '../../../shared-pdoc/services/pdoc-actiontag.service';
import {ToastrServiceStub} from '../../../../testing/toasts-stubs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {Location} from '@angular/common';
import {PDocAlbumService} from '../../../shared-pdoc/services/pdoc-album.service';
import {COMMON_APP_ENVIRONMENT} from '../../../../frontend-section-commons/common-environment';

describe('PDocSearchpageComponent', () => {
    let component: PDocSearchPageComponent;
    let fixture: ComponentFixture<PDocSearchPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PDocSearchPageComponent],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: PDocDataService, useValue: new PDocDataServiceStub() },
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
                { provide: Router, useValue: new RouterStub() },
                NgbModal,
                { provide: Location, useValue: {} },
                CommonRoutingService,
                PDocSearchFormConverter,
                SearchFormUtils,
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                CommonDocRoutingService,
                PDocRoutingService,
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                ErrorResolver,
                PageUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() },
                PlatformService,
                GenericTrackingService,
                { provide: Angulartics2, useValue: new Angulartics2Stub() },
                LayoutService,
                PDocSearchFormUtils,
                PDocActionTagService,
                PDocAlbumService,
                PDocContentUtils,
                { provide: COMMON_APP_ENVIRONMENT, useValue: {}}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PDocSearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
