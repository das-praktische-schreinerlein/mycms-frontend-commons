/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {PDocDataServiceStub} from '../../../../testing/pdoc-dataservice-stubs';
import {AppServiceStub} from '../../../../angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocContentUtils} from '../../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {CommonDocRoutingService} from '../../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../../../angular-commons/testing/router-stubs';
import {PDocContentUtils} from '../../../shared-pdoc/services/pdoc-contentutils.service';
import {PDocAssignJoinFormComponent} from './pdoc-assignjoinform.component';
import {FormBuilder} from '@angular/forms';
import {PDocDataStore} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.store';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {SearchFormUtils} from '../../../../angular-commons/services/searchform-utils.service';
import {ToastrService} from 'ngx-toastr';
import {ToastrServiceStub} from '../../../../testing/toasts-stubs';

describe('PDocAssignJoinFormComponent', () => {
    let component: PDocAssignJoinFormComponent;
    let fixture: ComponentFixture<PDocAssignJoinFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PDocAssignJoinFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                { provide: PDocDataStore, useValue: new PDocDataStore(new SearchParameterUtils()) },
                { provide: PDocDataService, useValue: new PDocDataServiceStub() },
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                FormBuilder,
                NgbModal,
                NgbActiveModal,
                CommonRoutingService,
                CommonDocRoutingService,
                CommonDocContentUtils,
                PDocContentUtils,
                SearchFormUtils,
                { provide: ToastrService, useValue: new ToastrServiceStub() }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PDocAssignJoinFormComponent);
        component = fixture.componentInstance;
        component.records = [PDocDataServiceStub.defaultRecord()];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
