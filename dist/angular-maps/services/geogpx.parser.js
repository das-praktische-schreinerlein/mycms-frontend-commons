"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var L = require("leaflet");
var geo_parser_1 = require("./geo.parser");
var date_utils_1 = require("@dps/mycms-commons/dist/commons/utils/date.utils");
var string_utils_1 = require("@dps/mycms-commons/dist/commons/utils/string.utils");
var GeoGpxParser = /** @class */ (function (_super) {
    __extends(GeoGpxParser, _super);
    function GeoGpxParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GeoGpxParser.fixXml = function (xml) {
        if (!xml) {
            return xml;
        }
        xml = xml.replace('<--?xml version="1.0" encoding="UTF-8" standalone="no" ?-->', '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>');
        xml = xml.replace('<!--?xml version="1.0" encoding="UTF-8" standalone="no" ?-->', '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>');
        xml = xml.replace('</text><time>', '</text></link><time>');
        xml = xml.trim();
        return xml;
    };
    GeoGpxParser.fixXmlExtended = function (xml) {
        if (!xml) {
            return xml;
        }
        xml = xml.replace(/^[ \r\n]+/, '');
        xml = xml.replace(/[ \r\n]+$/, '');
        xml = xml.replace(/'/g, '"');
        if (!(xml.indexOf('<gpx ') >= 0) && !(xml.indexOf('<gpx>') >= 0)) {
            xml = '<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1"' +
                ' xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3"' +
                ' xmlns:wptx1="http://www.garmin.com/xmlschemas/WaypointExtension/v1"' +
                ' xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"' +
                ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
                ' xsi:schemaLocation="http://www.topografix.com/GPX/1/1' +
                '     http://www.topografix.com/GPX/1/1/gpx.xsd' +
                '     http://www.garmin.com/xmlschemas/GpxExtensions/v3' +
                '     http://www8.garmin.com/xmlschemas/GpxExtensionsv3.xsd' +
                '     http://www.garmin.com/xmlschemas/WaypointExtension/v1' +
                '     http://www8.garmin.com/xmlschemas/WaypointExtensionv1.xsd' +
                '     http://www.garmin.com/xmlschemas/TrackPointExtension/v1' +
                '     http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">' + xml;
        }
        if (!(xml.startsWith('<?xml'))) {
            xml = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>' + xml;
        }
        if (!(xml.endsWith('</gpx>'))) {
            xml = xml + '</gpx>';
        }
        return xml;
    };
    GeoGpxParser.reformatXml = function (xml) {
        if (!xml) {
            return xml;
        }
        xml = xml.replace(/[\r\n]/g, ' ')
            .replace(/[ ]+/g, ' ')
            .replace(/<gpx /g, '\n<gpx ')
            .replace(/<gpx>/g, '\n<gpx>')
            .replace(/<\/gpx>/g, '\n</gpx>')
            .replace(/<trk /g, '\n  <trk ')
            .replace(/<trk>/g, '\n  <trk>')
            .replace(/<\/trk>/g, '\n  </trk>')
            .replace(/<trkseg /g, '\n  <trkseg ')
            .replace(/<trkseg>/g, '\n  <trkseg>')
            .replace(/<\/trkseg>/g, '\n  </trkseg>')
            .replace(/<rte /g, '\n  <rte ')
            .replace(/<rte>/g, '\n  <rte>')
            .replace(/<\/rte>/g, '\n  </rte>')
            .replace(/<wpt /g, '\n      <wpt ')
            .replace(/<trkpt /g, '\n      <trkpt ')
            .replace(/<rtept /g, '\n    <rtept ');
        return xml;
    };
    GeoGpxParser.createNewRouteGpx = function (name, type, points) {
        var newGpx = '<rte> <type>' + type + '</type><name>' + name + '</name> ';
        // @ts-ignore
        if (points) {
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                newGpx = newGpx + '<rtept lat="' + point.lat + '" lon="' + point.lng + '"></rtept>';
            }
        }
        newGpx = newGpx + '</rte>';
        return newGpx;
    };
    GeoGpxParser.deleteGpxTrackSegment = function (track, delSegIdx) {
        if (track === undefined || track === null || track.length <= 0 || delSegIdx < 0) {
            return track;
        }
        var newTrack = track;
        var lastPos = string_utils_1.StringUtils.findNeedle(track, '<trkseg>', delSegIdx);
        if (lastPos >= 0) {
            newTrack = track.substring(0, lastPos - 1);
            var endPos = track.indexOf('</trkseg>', lastPos);
            if (endPos >= 0) {
                newTrack += track.substring(endPos + '</trkseg>'.length, track.length);
            }
        }
        return newTrack;
    };
    GeoGpxParser.mergeGpxTrackSegment = function (track, mergeSegIdx) {
        if (track === undefined || track === null || track.length <= 0 || mergeSegIdx <= 0) {
            return track;
        }
        var newTrack = track;
        var lastPos = string_utils_1.StringUtils.findNeedle(track, '</trkseg>', mergeSegIdx - 1);
        if (lastPos >= 0) {
            newTrack = track.substring(0, lastPos - 1);
            var endPos = track.indexOf('<trkseg>', lastPos);
            if (endPos >= 0) {
                newTrack += track.substring(endPos + '<trkseg>'.length, track.length);
            }
        }
        return newTrack;
    };
    GeoGpxParser.mergeGpx = function (track1, track2) {
        if (track1 === undefined || track1 === null) {
            return track2;
        }
        if (track2 === undefined || track2 === null) {
            return track1;
        }
        track1 = GeoGpxParser.fixXml(track1);
        track1 = GeoGpxParser.fixXmlExtended(track1);
        track2 = GeoGpxParser.fixXml(track2);
        track2 = GeoGpxParser.fixXmlExtended(track2);
        var newTrack = '   ';
        for (var _i = 0, _a = [track1, track2]; _i < _a.length; _i++) {
            var track = _a[_i];
            for (var _b = 0, _c = [['<trk>', '</trk>'], ['<rte>', '</rte>'], ['<wpt ', '</wpt>']]; _b < _c.length; _b++) {
                var element = _c[_b];
                var lastPos = -1;
                var idx = -1;
                do {
                    idx++;
                    lastPos = string_utils_1.StringUtils.findNeedle(track, element[0], idx);
                    if (lastPos >= 0) {
                        var endPos = track.indexOf(element[1], lastPos);
                        if (endPos >= 0) {
                            newTrack += track.substring(lastPos, endPos + element[1].length);
                        }
                    }
                } while (lastPos >= 0);
            }
        }
        newTrack = GeoGpxParser.fixXml(newTrack);
        newTrack = GeoGpxParser.fixXmlExtended(newTrack);
        return newTrack;
    };
    GeoGpxParser.prototype.parse = function (xml, options) {
        if (!xml) {
            console.error('cant parse GeoGpxParser: empty');
            return;
        }
        xml = GeoGpxParser.fixXml(xml);
        if (!(xml.startsWith('<?xml'))) {
            console.error('cant parse GeoGpxParser: no valid xml');
            return;
        }
        var oParser = new DOMParser();
        var gpxDom = oParser.parseFromString(xml, 'application/xml');
        if (gpxDom.getElementsByTagName('parsererror').length > 0) {
            console.error('cant parse GeoGpxParser: parsererror', gpxDom.getElementsByTagName('parsererror')[0]);
            return;
        }
        var elements = this._parseGpxDom(gpxDom, options);
        if (!elements) {
            return;
        }
        return elements;
    };
    GeoGpxParser.prototype._parseGpxDom = function (gpxDom, options) {
        var j, i, el = [];
        var elements = [], tags = [['rte', 'rtept'], ['trkseg', 'trkpt']];
        for (j = 0; j < tags.length; j++) {
            el = gpxDom.getElementsByTagName(tags[j][0]);
            for (i = 0; i < el.length; i++) {
                var l = this.parse_trkseg(el[i], gpxDom, tags[j][1]);
                if (!l) {
                    continue;
                }
                if (options.generateName) {
                    this.parse_name(el[i], l);
                }
                elements.push(l);
            }
        }
        el = gpxDom.getElementsByTagName('wpt');
        if (options.display_wpt !== false) {
            for (i = 0; i < el.length; i++) {
                var waypoint = this.parse_wpt(el[i], gpxDom);
                if (!waypoint) {
                    continue;
                }
                if (options.generateName) {
                    this.parse_name(el[i], waypoint);
                }
                elements.push(waypoint);
            }
        }
        if (!elements.length) {
            return;
        }
        return elements;
    };
    GeoGpxParser.prototype.parse_name = function (gpxDom, layer) {
        var i, el, txt = '', name, descr = '', link, len = 0;
        el = gpxDom.getElementsByTagName('name');
        if (el.length) {
            name = el[0].childNodes[0].nodeValue;
        }
        el = gpxDom.getElementsByTagName('desc');
        for (i = 0; i < el.length; i++) {
            for (var j = 0; j < el[i].childNodes.length; j++) {
                descr = descr + el[i].childNodes[j].nodeValue;
            }
        }
        el = gpxDom.getElementsByTagName('link');
        if (el.length) {
            link = el[0].getAttribute('href');
        }
        len = layer !== undefined ? this._polylineLen(layer.points) : undefined;
        if (name) {
            txt += '<h2>' + name + '</h2>' + descr;
        }
        if (len) {
            txt += '<p>' + this._humanLen(len) + '</p>';
        }
        if (link) {
            txt += '<p><a target="_blank" href="' + link + '">[...]</a></p>';
        }
        layer.name = txt;
        return txt;
    };
    GeoGpxParser.prototype.parse_trkseg = function (line, gpxDom, tag) {
        var el = line.getElementsByTagName(tag);
        if (!el.length) {
            return;
        }
        var coords = [];
        for (var i = 0; i < el.length; i++) {
            var ptElement = el[i];
            var eleElement = ptElement.getElementsByTagName('ele');
            var timeElement = ptElement.getElementsByTagName('time');
            var ele = void 0;
            var time = void 0;
            if (eleElement && eleElement.length > 0) {
                ele = eleElement[0].childNodes[0].nodeValue;
            }
            if (timeElement && timeElement.length > 0) {
                time = date_utils_1.DateUtils.parseDate(timeElement[0].childNodes[0].nodeValue);
            }
            var ll = void 0;
            if (time !== undefined) {
                ll = new geo_parser_1.LatLngTime(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'), ele, time);
            }
            else {
                ll = ele !== undefined ? new L.LatLng(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'), ele) :
                    new L.LatLng(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'));
            }
            coords.push(ll);
        }
        var typeEl = gpxDom.getElementsByTagName('type');
        var type = tag === 'trkpt' ? geo_parser_1.GeoElementType.TRACK : geo_parser_1.GeoElementType.ROUTE;
        if (typeEl.length && typeEl[0].childNodes[0].nodeValue === 'AREA') {
            type = geo_parser_1.GeoElementType.AREA;
        }
        return new geo_parser_1.GeoElement(type, coords, name);
    };
    GeoGpxParser.prototype.parse_wpt = function (e, gpxDom) {
        var m = new geo_parser_1.GeoElement(geo_parser_1.GeoElementType.WAYPOINT, [new L.LatLng(e.getAttribute('lat'), e.getAttribute('lon'))], undefined);
        return m;
    };
    return GeoGpxParser;
}(geo_parser_1.GeoParser));
exports.GeoGpxParser = GeoGpxParser;
//# sourceMappingURL=geogpx.parser.js.map