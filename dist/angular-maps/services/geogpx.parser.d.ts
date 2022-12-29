import { LatLng } from 'leaflet';
import { GeoElement, GeoElementType, GeoParser } from './geo.parser';
import { AbstractGeoGpxParser } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
import { GeoGpxUtils } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.utils';
export declare class GeoGpxParser extends AbstractGeoGpxParser<LatLng> implements GeoParser {
    protected static geoGpxUtils: GeoGpxUtils;
    static fixXml(xml: string): string;
    static fixXmlExtended(xml: string): string;
    static reformatXml(xml: string): string;
    static createNewRouteGpx(name: string, type: string, points: LatLng[]): string;
    static deleteGpxTrackSegment(track: string, delSegIdx: number): string;
    static mergeGpxTrackSegment(track: string, mergeSegIdx: number): string;
    static mergeGpx(track1: string, track2: string): string;
    protected parseDomFromString(xml: string): Document;
    protected createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng;
    protected createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement;
    protected calcDistance(from: LatLng, to: LatLng): number;
}
