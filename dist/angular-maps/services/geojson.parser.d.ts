import { GeoElement, GeoParser } from './geo.parser';
export declare class GeoJsonParser extends GeoParser {
    parse(json: string, options: any): GeoElement[];
    _parseJsonObj(obj: any, options: any): GeoElement[];
}
