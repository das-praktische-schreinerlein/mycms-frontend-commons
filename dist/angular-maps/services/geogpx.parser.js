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
        if (!(xml.indexOf('<gpx') > 0)) {
            xml = '<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1"' +
                ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
                ' xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">' + xml;
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
            .replace(/<trkpt /g, '\n      <trkpt ')
            .replace(/<rtept /g, '\n    <rtept ');
        return xml;
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
        return new geo_parser_1.GeoElement(tag === 'trkpt' ? geo_parser_1.GeoElementType.TRACK : geo_parser_1.GeoElementType.ROUTE, coords, name);
    };
    GeoGpxParser.prototype.parse_wpt = function (e, gpxDom) {
        var m = new geo_parser_1.GeoElement(geo_parser_1.GeoElementType.WAYPOINT, [new L.LatLng(e.getAttribute('lat'), e.getAttribute('lon'))], undefined);
        return m;
    };
    return GeoGpxParser;
}(geo_parser_1.GeoParser));
exports.GeoGpxParser = GeoGpxParser;
//# sourceMappingURL=geogpx.parser.js.map