import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { MapElement } from './leaflet-geo.plugin';
import { ChartElement } from '../components/visjs-profilechart/visjs-profilechart.component';
import { TrackColors } from '@dps/mycms-commons/dist/geo-commons/model/track-colors';
import { MapDocRecord } from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';
export declare class MapContentUtils {
    protected appService: GenericAppService;
    constructor(appService: GenericAppService);
    createMapElementForDocRecord(record: MapDocRecord, code: string, showImageTrackAndGeoPos: boolean, trackColors?: TrackColors): MapElement[];
    createChartElementForDocRecord(record: MapDocRecord, code: string, showImageTrackAndGeoPos: boolean, trackColors?: TrackColors): ChartElement[];
}
