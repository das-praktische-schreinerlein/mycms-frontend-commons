/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LeafletMapComponent} from './leaflet-map.component';
import {HttpClientModule} from '@angular/common/http'
import {SimpleAngularBackendHttpClient} from '../../../angular-commons/services/simple-angular-backend-http-client';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';

describe('LeafletMapComponent', () => {
    let component: LeafletMapComponent;
    let fixture: ComponentFixture<LeafletMapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeafletMapComponent],
            imports: [ReactiveFormsModule, HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                    { provide: MinimalHttpBackendClient, useClass: SimpleAngularBackendHttpClient }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeafletMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
