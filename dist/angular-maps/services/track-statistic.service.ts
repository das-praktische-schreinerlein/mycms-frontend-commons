import {LatLng, latLngBounds, LatLngBounds} from 'leaflet';
import {TrackStatisticBase} from '@dps/mycms-commons/dist/geo-commons/model/geoElementTypes';
import {AbstractTrackStatisticService} from '@dps/mycms-commons/dist/geo-commons/services/track-statistic.service';

export interface TrackStatistic extends TrackStatisticBase<LatLng, LatLngBounds> {
}

export class TrackStatisticService extends AbstractTrackStatisticService<LatLng, LatLngBounds> {
    protected getLatLngBounds(coords: LatLng[]): LatLngBounds {
        return latLngBounds(coords);
    }

    protected calcDistance(from: LatLng, to: LatLng): number {
        return from.distanceTo(to);
    }
}
