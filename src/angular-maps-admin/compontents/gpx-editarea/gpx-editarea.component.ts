import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GeoGpxParser} from '../../../angular-maps/services/geogpx.parser';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {GpsTrackValidationRule} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {DOCUMENT} from '@angular/common';
import {GeoParserDeterminer} from '../../../angular-maps/services/geo-parser.determiner';
import {AbstractGpxEditAreaComponent} from './abstract-gpx-editarea.component';
import {MapDocRecord} from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';

@Component({
    selector: 'app-gpx-editarea',
    templateUrl: './gpx-editarea.component.html',
    styleUrls: ['./gpx-editarea.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GpxEditAreaComponent extends AbstractGpxEditAreaComponent {
    constructor(fb: FormBuilder, toastr: ToastrService, cd: ChangeDetectorRef,
                appService: GenericAppService, geoParserService: GeoParserDeterminer, gpxParser: GeoGpxParser,
                @Inject(DOCUMENT) document) {
        super(fb, toastr, cd, appService, geoParserService, gpxParser, document, 1000000);
    }

    protected createSanitized(values: {}): MapDocRecord {
        return <MapDocRecord>values;
    }
}
