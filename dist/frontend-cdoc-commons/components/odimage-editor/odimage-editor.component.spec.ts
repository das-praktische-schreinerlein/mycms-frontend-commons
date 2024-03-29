/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OdImageEditorComponent} from './odimage-editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AngularMarkdownService} from '../../../angular-commons/services/angular-markdown.service';
import {PlatformService} from '../../../angular-commons/services/platform.service';
import {AngularHtmlService} from '../../../angular-commons/services/angular-html.service';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {SimpleAngularHtmlService} from '../../../angular-commons/services/simple-angular-html.service';
import {SimpleAngularMarkdownService} from '../../../angular-commons/services/simple-angular-markdown.service';

describe('OdImageEditorComponent', () => {
    let component: OdImageEditorComponent;
    let fixture: ComponentFixture<OdImageEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OdImageEditorComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                TranslateService,
                { provide: AngularMarkdownService, useClass: SimpleAngularMarkdownService },
                { provide: AngularHtmlService, useClass: SimpleAngularHtmlService },
                CommonRoutingService,
                { provide: Router, useValue: new RouterStub() },
                PlatformService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OdImageEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
