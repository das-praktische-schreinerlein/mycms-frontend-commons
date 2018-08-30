import { GeoElement, GeoParser } from './geo.parser';
export declare class GeoGpxParser extends GeoParser {
    static fixXml(xml: string): string;
    static fixXmlExtended(xml: string): string;
    static reformatXml(xml: string): string;
    parse(xml: string, options: any): GeoElement[];
    _parseGpxDom(gpxDom: any, options: any): GeoElement[];
    parse_name(gpxDom: any, layer: GeoElement): string;
    parse_trkseg(line: any, gpxDom: any, tag: any): GeoElement;
    parse_wpt(e: any, gpxDom: any): GeoElement;
}
