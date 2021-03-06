/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonDocInitialtableComponent} from './cdoc-initialtable.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocSearchFormUtils} from '../../services/cdoc-searchform-utils.service';
import {CommonDocDataServiceStub} from '../../../testing/cdoc-dataservice-stubs';

describe('CommonDocInitialtableComponent', () => {
    let component: CommonDocInitialtableComponent;
    let fixture: ComponentFixture<CommonDocInitialtableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommonDocInitialtableComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
                SearchParameterUtils,
                SearchFormUtils,
                CommonDocSearchFormUtils
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDocInitialtableComponent);
        component = fixture.componentInstance;
        component.searchResult = CommonDocDataServiceStub.defaultSearchResult();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
