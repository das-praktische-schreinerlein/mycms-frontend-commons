/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonDocObjectNavigationComponent} from './cdoc-object-navigation.component';

describe('CommonDocObjectNavigationComponent', () => {
    let component: CommonDocObjectNavigationComponent;
    let fixture: ComponentFixture<CommonDocObjectNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommonDocObjectNavigationComponent],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                NgbModal,
                CommonRoutingService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDocObjectNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
