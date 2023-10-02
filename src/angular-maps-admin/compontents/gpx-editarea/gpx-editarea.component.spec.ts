/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GpxEditAreaComponent} from './gpx-editarea.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {SearchFormUtils} from '../../../angular-commons/services/searchform-utils.service';
import {CommonDocContentUtils} from '../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {CommonDocRoutingService} from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {ToastrServiceStub} from '../../../testing/toasts-stubs';
import {GeoParserDeterminer} from '../../../angular-maps/services/geo-parser.determiner';
import {GeoGpxParser} from '../../../angular-maps/services/geogpx.parser';
import {GeoJsonParser} from '../../../angular-maps/services/geojson.parser';
import {GeoTxtParser} from '../../../angular-maps/services/geotxt.parser';
import {GeoGpxUtils} from '@dps/mycms-commons/dist/geo-commons/services/geogpx.utils';

describe('GpxEditAreaComponent', () => {
    let component: GpxEditAreaComponent;
    let fixture: ComponentFixture<GpxEditAreaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GpxEditAreaComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                { provide: Router, useValue: new RouterStub() },
                GeoParserDeterminer,
                { provide: GeoGpxParser, useValue: new GeoGpxParser() },
                GeoJsonParser,
                GeoTxtParser,
                GeoGpxUtils,
                CommonRoutingService,
                CommonDocRoutingService,
                SearchFormUtils,
                SearchParameterUtils,
                CommonDocContentUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GpxEditAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
