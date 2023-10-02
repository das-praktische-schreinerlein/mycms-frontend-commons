/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MapDocMapComponent} from './mapdoc-map.component';
import {AppServiceStub} from '../../../angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {Router} from '@angular/router';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';
import {CommonDocRoutingService} from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import {RouterStub} from '../../../angular-commons/testing/router-stubs';
import {PlatformService} from '../../../angular-commons/services/platform.service';
import {MapContentUtils} from '../../services/map-contentutils.service';

describe('TourDocMapComponent', () => {
    let component: MapDocMapComponent;
    let fixture: ComponentFixture<MapDocMapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapDocMapComponent],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                PlatformService,
                CommonRoutingService,
                CommonDocRoutingService,
                MapContentUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapDocMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
