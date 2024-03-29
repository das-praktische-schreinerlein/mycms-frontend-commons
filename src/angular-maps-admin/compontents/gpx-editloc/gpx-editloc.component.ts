import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {AbstractGpxEditLocComponent} from './abstract-gpx-editloc.component';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {DOCUMENT} from '@angular/common';
import {MapDocRecord} from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';

@Component({
    selector: 'app-gpx-editloc',
    templateUrl: './gpx-editloc.component.html',
    styleUrls: ['./gpx-editloc.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GpxEditLocComponent extends AbstractGpxEditLocComponent {
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef,
                appService: GenericAppService,
                @Inject(DOCUMENT) document) {
        super(fb, toastr, cd, appService, document);
    }

    protected createSanitized(values: {}): MapDocRecord {
        return <MapDocRecord>values;
    }
}
