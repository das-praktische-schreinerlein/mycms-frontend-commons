/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonDocMediaMetaComponent} from './cdoc-mediameta.component';
import {TranslateModule} from '@ngx-translate/core';
import {BaseMediaMetaRecordType} from '@dps/mycms-commons/dist/search-commons/model/records/basemediameta-record';

describe('CommonDocMediaMetaComponent', () => {
    let component: CommonDocMediaMetaComponent;
    let fixture: ComponentFixture<CommonDocMediaMetaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommonDocMediaMetaComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDocMediaMetaComponent);
        component = fixture.componentInstance;
        component.record = <BaseMediaMetaRecordType>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
