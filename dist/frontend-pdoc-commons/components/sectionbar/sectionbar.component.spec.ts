/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SectionBarComponent} from './sectionbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {ToastrService} from 'ngx-toastr';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CommonDocRoutingService} from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {PDocDataServiceStub} from '../../../testing/pdoc-dataservice-stubs';
import {StaticPagesDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import {FormBuilder} from '@angular/forms';
import {ErrorResolver} from '../../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../../angular-commons/services/page.utils';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {ToastrServiceStub} from '../../../testing/toasts-stubs';

describe('SectionBarComponent', () => {
    let component: SectionBarComponent;
    let fixture: ComponentFixture<SectionBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SectionBarComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()],
            providers: [
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
                { provide: Router, useValue: new RouterStub() },
                { provide: StaticPagesDataService, useValue: new PDocDataServiceStub() },
                CommonRoutingService,
                FormBuilder,
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                ErrorResolver,
                CommonDocRoutingService,
                PageUtils
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SectionBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
