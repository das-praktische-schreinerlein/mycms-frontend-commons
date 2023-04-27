/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SectionListComponent} from './section-list.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SectionListComponent', () => {
    let component: SectionListComponent;
    let fixture: ComponentFixture<SectionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SectionListComponent],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SectionListComponent);
        component = fixture.componentInstance;
        component.records = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
