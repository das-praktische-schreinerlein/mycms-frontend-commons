/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PDocListItemComponent} from './pdoc-list-item.component';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {PDocDataServiceStub} from '../../../../testing/pdoc-dataservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../../angular-commons/testing/appservice-stubs';
import {RouterStub} from '../../../../angular-commons/testing/router-stubs';
import {CommonRoutingService} from '../../../../angular-commons/services/common-routing.service';
import {CommonDocRoutingService} from '../../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonDocContentUtils} from '../../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {PDocContentUtils} from '../../services/pdoc-contentutils.service';
import {LayoutService} from '../../../../angular-commons/services/layout.service';
import {PDocRoutingService} from '../../services/pdoc-routing.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {ToastrService} from 'ngx-toastr';
import {ToastrServiceStub} from '../../../../testing/toasts-stubs';
import {TruncatePipe} from '../../../../angular-commons/pipes/truncate.pipe';

describe('PDocListItemComponent', () => {
    let component: PDocListItemComponent;
    let fixture: ComponentFixture<PDocListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PDocListItemComponent, TruncatePipe],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                CommonDocRoutingService,
                PDocRoutingService,
                CommonDocContentUtils,
                PDocContentUtils,
                { provide: PDocDataService, useValue: new PDocDataServiceStub() },
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                LayoutService
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PDocListItemComponent);
        component = fixture.componentInstance;
        component.record = PDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
