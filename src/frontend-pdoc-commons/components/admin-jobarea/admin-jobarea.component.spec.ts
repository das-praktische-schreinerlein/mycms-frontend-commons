/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminJobAreaComponent} from './admin-jobarea.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {ToastrServiceStub} from '../../../testing/toasts-stubs';
import {DurationPipe} from '../../../angular-commons/pipes/duration.pipe';
import {PageUtils} from '../../../angular-commons/services/page.utils';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {SimpleAngularBackendHttpClient} from '../../../angular-commons/services/simple-angular-backend-http-client';
import {HttpClientModule} from '@angular/common/http';

describe('AdminJobAreaComponent', () => {
    let component: AdminJobAreaComponent;
    let fixture: ComponentFixture<AdminJobAreaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminJobAreaComponent, DurationPipe],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot(),
                HttpClientModule
            ],
            providers: [
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                PageUtils,
                { provide: MinimalHttpBackendClient, useClass: SimpleAngularBackendHttpClient },
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminJobAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
