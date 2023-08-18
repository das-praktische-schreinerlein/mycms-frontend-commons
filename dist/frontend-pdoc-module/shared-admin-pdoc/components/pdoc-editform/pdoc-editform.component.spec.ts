/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PDocEditformComponent} from './pdoc-editform.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PDocDataServiceStub} from '../../../../testing/pdoc-dataservice-stubs';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PDocSearchFormUtils} from '../../../shared-pdoc/services/pdoc-searchform-utils.service';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {SearchFormUtils} from '../../../../angular-commons/services/searchform-utils.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {CommonDocContentUtils} from '../../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../../angular-commons/testing/appservice-stubs';
import {CommonDocRoutingService} from '../../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {RouterStub} from '../../../../angular-commons/testing/router-stubs';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {ToastrServiceStub} from '../../../../testing/toasts-stubs';
import {PDocNameSuggesterService} from '../../services/pdoc-name-suggester.service';
import {PDocDescSuggesterService} from '../../services/pdoc-desc-suggester.service';
import {PlatformService} from '../../../../angular-commons/services/platform.service';
import {AngularHtmlService} from '../../../../angular-commons/services/angular-html.service';
import {PDocPageDescSuggesterService} from '../../services/pdoc-page-desc-suggester.service';
import {PDocActionTagService} from '../../../shared-pdoc/services/pdoc-actiontag.service';
import {SimpleAngularMarkdownService} from '../../../../angular-commons/services/simple-angular-markdown.service';
import {AngularMarkdownService} from '../../../../angular-commons/services/angular-markdown.service';
import {SimpleAngularHtmlService} from '../../../../angular-commons/services/simple-angular-html.service';

describe('PDocEditformComponent', () => {
    let component: PDocEditformComponent;
    let fixture: ComponentFixture<PDocEditformComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PDocEditformComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                { provide: PDocDataService, useValue: new PDocDataServiceStub() },
                PDocSearchFormUtils,
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                CommonDocRoutingService,
                SearchFormUtils,
                SearchParameterUtils,
                CommonDocContentUtils,
                PDocContentUtils,
                PDocNameSuggesterService,
                PDocDescSuggesterService,
                PDocPageDescSuggesterService,
                PlatformService,
                {provide: AngularMarkdownService, useClass: SimpleAngularMarkdownService},
                {provide: AngularHtmlService, useClass: SimpleAngularHtmlService},
                { provide: GenericAppService, useValue: new AppServiceStub() },
                PDocActionTagService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PDocEditformComponent);
        component = fixture.componentInstance;
        component.record = PDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
