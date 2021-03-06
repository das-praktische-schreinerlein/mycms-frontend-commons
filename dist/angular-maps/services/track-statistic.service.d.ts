import { LatLng } from 'leaflet';
import { GeoElement } from './geo.parser';
export interface TrackStatistic {
    altAsc?: number;
    altDesc?: number;
    dist: number;
    velocity?: number;
    altAscVelocity?: number;
    altDescVelocity?: number;
    altMin?: number;
    altMax?: number;
    altAvg?: number;
    altStart?: number;
    altEnd?: number;
    bounds: L.LatLngBounds;
    posStart: L.LatLng;
    posEnd: L.LatLng;
    dateStart: Date;
    dateEnd: Date;
    duration: number;
}
export declare class TrackStatisticService {
    emptyStatistic(): TrackStatistic;
    trackStatisticsForGeoElement(geoElement: GeoElement): TrackStatistic;
    trackStatistics(ll: LatLng[]): TrackStatistic;
    mergeStatistics(param1: TrackStatistic, param2: TrackStatistic): TrackStatistic;
    formatMToKm(l: number): number;
    formatM(l: number): number;
    formatMillisToHH24(l: number): number;
}
