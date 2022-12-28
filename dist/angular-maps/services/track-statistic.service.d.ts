import { LatLng, LatLngBounds } from 'leaflet';
import { TrackStatisticBase } from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
import { AbstractTrackStatisticService } from '@dps/mycms-commons/dist/geo-commons/services/track-statistic.service';
export interface TrackStatistic extends TrackStatisticBase<LatLng, LatLngBounds> {
}
export declare class TrackStatisticService extends AbstractTrackStatisticService<LatLng, LatLngBounds> {
    protected getLocalDateTimeForLatLng(position: LatLng): Date;
    protected getLatLngBounds(coords: LatLng[]): LatLngBounds;
}
