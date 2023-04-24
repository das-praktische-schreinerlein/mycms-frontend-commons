import {LatLng} from 'leaflet';
import {GeoGpxParser} from './geogpx.parser';
import {GeoJsonParser} from './geojson.parser';
import {GeoTxtParser} from './geotxt.parser';
import {Injectable} from '@angular/core';
import {AbstractGeoParserDeterminer} from '@dps/mycms-commons/dist/geo-commons/services/geo-parser.determiner';

@Injectable()
export class GeoParserDeterminer extends AbstractGeoParserDeterminer<LatLng> {

    constructor(protected gpxParser: GeoGpxParser,
                protected jsonParser: GeoJsonParser,
                protected txtParser: GeoTxtParser) {
        super(gpxParser, jsonParser, txtParser);
    }
}
