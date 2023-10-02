import { ChangeDetectorRef } from '@angular/core';
import { AbstractGpxEditLocComponent } from './abstract-gpx-editloc.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { MapDocRecord } from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';
export declare class GpxEditLocComponent extends AbstractGpxEditLocComponent {
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef, appService: GenericAppService, document: any);
    protected createSanitized(values: {}): MapDocRecord;
}
