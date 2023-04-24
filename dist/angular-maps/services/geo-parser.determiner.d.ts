import { LatLng } from 'leaflet';
import { GeoGpxParser } from './geogpx.parser';
import { GeoJsonParser } from './geojson.parser';
import { GeoTxtParser } from './geotxt.parser';
import { AbstractGeoParserDeterminer } from '@dps/mycms-commons/dist/geo-commons/services/geo-parser.determiner';
export declare class GeoParserDeterminer extends AbstractGeoParserDeterminer<LatLng> {
    protected gpxParser: GeoGpxParser;
    protected jsonParser: GeoJsonParser;
    protected txtParser: GeoTxtParser;
    constructor(gpxParser: GeoGpxParser, jsonParser: GeoJsonParser, txtParser: GeoTxtParser);
}
