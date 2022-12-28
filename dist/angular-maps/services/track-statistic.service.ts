import {LatLng, latLngBounds, LatLngBounds} from 'leaflet';
import {TrackStatisticBase} from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
import {AbstractTrackStatisticService} from '@dps/mycms-commons/dist/geo-commons/services/track-statistic.service';
import {GeoDateUtils} from './geodate.utils';

export interface TrackStatistic extends TrackStatisticBase<LatLng, LatLngBounds> {
}

export class TrackStatisticService extends AbstractTrackStatisticService<LatLng, LatLngBounds> {
    protected getLocalDateTimeForLatLng(position: LatLng): Date {
        return GeoDateUtils.getLocalDateTimeForLatLng(position);
    }

    protected getLatLngBounds(coords: LatLng[]): LatLngBounds {
        return latLngBounds(coords);
    }

}
