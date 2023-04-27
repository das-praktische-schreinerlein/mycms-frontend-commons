/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SectionListItemComponent} from './section-list-item.component';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {PDocDataServiceStub} from '../../../testing/pdoc-dataservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {TruncatePipe} from '../../../angular-commons/pipes/truncate.pipe';

describe('SectionListItemComponent', () => {
    let component: SectionListItemComponent;
    let fixture: ComponentFixture<SectionListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SectionListItemComponent, TruncatePipe],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SectionListItemComponent);
        component = fixture.componentInstance;
        component.record = PDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
