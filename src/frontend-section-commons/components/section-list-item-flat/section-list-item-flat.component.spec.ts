/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SectionListItemFlatComponent} from './section-list-item-flat.component';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {PDocDataServiceStub} from '../../../testing/pdoc-dataservice-stubs';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';

describe('SectionListItemFlatComponent', () => {
    let component: SectionListItemFlatComponent;
    let fixture: ComponentFixture<SectionListItemFlatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SectionListItemFlatComponent],
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
        fixture = TestBed.createComponent(SectionListItemFlatComponent);
        component = fixture.componentInstance;
        component.record = PDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
