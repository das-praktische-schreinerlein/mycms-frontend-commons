/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonDocChangelogComponent} from './cdoc-changelog.component';
import {TranslateModule} from '@ngx-translate/core';
import { CommonDocRecordType } from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';

describe('CommonDocChangelogComponent', () => {
    let component: CommonDocChangelogComponent;
    let fixture: ComponentFixture<CommonDocChangelogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommonDocChangelogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonDocChangelogComponent);
        component = fixture.componentInstance;
        component.record = <CommonDocRecordType>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
