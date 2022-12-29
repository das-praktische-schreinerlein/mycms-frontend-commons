var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AbstractGeoGpxParser } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
import { GeoGpxUtils } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.utils';
import { GeoUtils } from './geo.utils';
var GeoGpxParser = /** @class */ (function (_super) {
    __extends(GeoGpxParser, _super);
    function GeoGpxParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoGpxParser.fixXml = function (xml) {
        return GeoGpxParser.geoGpxUtils.fixXml(xml);
    };
    GeoGpxParser.fixXmlExtended = function (xml) {
        return GeoGpxParser.geoGpxUtils.fixXmlExtended(xml);
    };
    GeoGpxParser.reformatXml = function (xml) {
        return GeoGpxParser.geoGpxUtils.reformatXml(xml);
    };
    GeoGpxParser.createNewRouteGpx = function (name, type, points) {
        return GeoGpxParser.geoGpxUtils.createNewRouteGpx(name, type, points);
    };
    GeoGpxParser.deleteGpxTrackSegment = function (track, delSegIdx) {
        return GeoGpxParser.geoGpxUtils.deleteGpxTrackSegment(track, delSegIdx);
    };
    GeoGpxParser.mergeGpxTrackSegment = function (track, mergeSegIdx) {
        return GeoGpxParser.geoGpxUtils.mergeGpxTrackSegment(track, mergeSegIdx);
    };
    GeoGpxParser.mergeGpx = function (track1, track2) {
        return GeoGpxParser.geoGpxUtils.mergeGpx(track1, track2);
    };
    GeoGpxParser.prototype.parseDomFromString = function (xml) {
        var oParser = new DOMParser();
        return oParser.parseFromString(xml, 'application/xml');
    };
    GeoGpxParser.prototype.createLatLng = function (lat, lng, alt, time) {
        return GeoUtils.createLatLng(lat, lng, alt, time);
    };
    GeoGpxParser.prototype.createGeoElement = function (type, points, name) {
        return GeoUtils.createGeoElement(type, points, name);
    };
    GeoGpxParser.prototype.calcDistance = function (from, to) {
        return from.distanceTo(to);
    };
    GeoGpxParser.geoGpxUtils = new GeoGpxUtils();
    return GeoGpxParser;
}(AbstractGeoGpxParser));
export { GeoGpxParser };
//# sourceMappingURL=geogpx.parser.js.map