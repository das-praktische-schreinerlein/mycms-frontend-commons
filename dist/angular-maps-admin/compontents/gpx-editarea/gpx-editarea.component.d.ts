import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeoGpxParser } from '../../../angular-maps/services/geogpx.parser';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { GeoParserDeterminer } from '../../../angular-maps/services/geo-parser.determiner';
import { AbstractGpxEditAreaComponent } from './abstract-gpx-editarea.component';
import { MapDocRecord } from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';
export declare class GpxEditAreaComponent extends AbstractGpxEditAreaComponent {
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef, appService: GenericAppService, geoParserService: GeoParserDeterminer, gpxParser: GeoGpxParser, document: any);
    protected createSanitized(values: {}): MapDocRecord;
}
