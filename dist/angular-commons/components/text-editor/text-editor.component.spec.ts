/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TextEditorComponent} from './text-editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AngularMarkdownService} from '../../services/angular-markdown.service';
import {PlatformService} from '../../services/platform.service';
import {AngularHtmlService} from '../../services/angular-html.service';
import {CommonRoutingService} from '../../services/common-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../testing/router-stubs';

describe('TextEditorComponent', () => {
    let component: TextEditorComponent;
    let fixture: ComponentFixture<TextEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextEditorComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                TranslateService,
                AngularMarkdownService,
                AngularHtmlService,
                CommonRoutingService,
                { provide: Router, useValue: new RouterStub() },
                PlatformService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
