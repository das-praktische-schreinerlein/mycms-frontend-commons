import {LatLng} from 'leaflet';
import {GeoElement, GeoElementType, GeoParser} from './geo.parser';
import {AbstractGeoGpxParser} from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
import {GeoGpxUtils} from '@dps/mycms-commons/dist/geo-commons/services/geogpx.utils';
import {GeoUtils} from './geo.utils';

export class GeoGpxParser extends AbstractGeoGpxParser<LatLng> implements GeoParser {
    protected static geoGpxUtils: GeoGpxUtils = new GeoGpxUtils();

    public static fixXml(xml: string): string {
        return GeoGpxParser.geoGpxUtils.fixXml(xml);
    }

    public static trimXml(xml: string): string {
        return GeoGpxParser.geoGpxUtils.trimXml(xml);
    }

    public static fixXmlExtended(xml: string): string {
        return GeoGpxParser.geoGpxUtils.fixXmlExtended(xml);
    }

    public static reformatXml(xml: string): string {
        return GeoGpxParser.geoGpxUtils.reformatXml(xml);
    }

    public static createNewRouteGpx(name: string, type: string, points: LatLng[]): string {
        return GeoGpxParser.geoGpxUtils.createNewRouteGpx(name, type, points);
    }

    public static deleteGpxTrackSegment(track: string, delSegIdx: number): string {
        return GeoGpxParser.geoGpxUtils.deleteGpxTrackSegment(track, delSegIdx);
    }

    public static mergeGpxTrackSegment(track: string, mergeSegIdx: number): string {
        return GeoGpxParser.geoGpxUtils.mergeGpxTrackSegment(track, mergeSegIdx);
    }

    public static mergeGpx(track1: string, track2: string): string {
        return GeoGpxParser.geoGpxUtils.mergeGpx(track1, track2);
    }

    protected parseDomFromString(xml: string): Document {
        const oParser = new DOMParser();
        return oParser.parseFromString(xml, 'application/xml');
    }

    protected createLatLng(lat: string | number, lng: string | number, alt?: number, time?: Date): LatLng {
        return GeoUtils.createLatLng(lat, lng, alt, time);
    }

    protected createGeoElement(type: GeoElementType, points: LatLng[], name: string): GeoElement {
        return GeoUtils.createGeoElement(type, points, name);
    }

    protected calcDistance(from: LatLng, to: LatLng): number {
        return from.distanceTo(to);
    }
}
