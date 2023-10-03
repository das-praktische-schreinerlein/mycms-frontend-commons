/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GpxEditLocComponent} from './gpx-editloc.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocContentUtils} from '../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {CommonDocRoutingService} from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {ToastrServiceStub} from '../../../testing/toasts-stubs';

describe('GpxEditLocComponent', () => {
    let component: GpxEditLocComponent;
    let fixture: ComponentFixture<GpxEditLocComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GpxEditLocComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                CommonDocRoutingService,
                SearchFormUtils,
                SearchParameterUtils,
                CommonDocContentUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GpxEditLocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
