/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {CommonDocODObjectRectanglesComponent} from './cdoc-odobjectrectangles.component';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';

describe('CommonDocODObjectRectanglesComponent', () => {
    let component: CommonDocODObjectRectanglesComponent;
    let fixture: ComponentFixture<CommonDocODObjectRectanglesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommonDocODObjectRectanglesComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()],
            providers: [
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDocODObjectRectanglesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
