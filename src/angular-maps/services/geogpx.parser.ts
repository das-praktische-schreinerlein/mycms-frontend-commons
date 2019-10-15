import * as L from 'leaflet';
import {GeoElement, GeoElementType, GeoParser, LatLngTime} from './geo.parser';
import {DateUtils} from '@dps/mycms-commons/dist/commons/utils/date.utils';
import {StringUtils} from '@dps/mycms-commons/dist/commons/utils/string.utils';

export class GeoGpxParser extends GeoParser {
    public static fixXml(xml: string): string {
        if (!xml) {
            return xml;
        }

        xml = xml.replace('<--?xml version="1.0" encoding="UTF-8" standalone="no" ?-->',
            '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>');
        xml = xml.replace('<!--?xml version="1.0" encoding="UTF-8" standalone="no" ?-->',
            '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>');
        xml = xml.replace('</text><time>',
            '</text></link><time>');
        xml = xml.trim();

        return xml;
    }

    public static fixXmlExtended(xml: string): string {
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
    }

    public static reformatXml(xml: string): string {
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
            .replace(/<rtept /g, '\n    <rtept ')
        ;

        return xml;
    }

    public static createNewRouteGpx(name: string, type: string, points: L.LatLng[]): string {
        let newGpx = '<rte> <type>' + type + '</type><name>' + name + '</name> ';
        // @ts-ignore
        if (points) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                newGpx = newGpx + '<rtept lat="' + point.lat + '" lon="' + point.lng + '"></rtept>';
            }
        }
        newGpx = newGpx + '</rte>';

        return newGpx;
    }

    public static deleteGpxTrackSegment(track: string, delSegIdx: number): string {
        if (track === undefined || track === null || track.length <= 0 || delSegIdx < 0) {
            return track;
        }

        let newTrack = track;
        const lastPos = StringUtils.findNeedle(track, '<trkseg>', delSegIdx);
        if (lastPos >= 0) {
            newTrack = track.substring(0, lastPos - 1);
            const endPos = track.indexOf('</trkseg>', lastPos);
            if (endPos >= 0) {
                newTrack += track.substring(endPos + '</trkseg>'.length, track.length);
            }
        }

        return newTrack;
    }

    public static mergeGpxTrackSegment(track: string, mergeSegIdx: number): string {
        if (track === undefined || track === null || track.length <= 0 || mergeSegIdx <= 0) {
            return track;
        }

        let newTrack = track;
        const lastPos = StringUtils.findNeedle(track, '</trkseg>', mergeSegIdx - 1);
        if (lastPos >= 0) {
            newTrack = track.substring(0, lastPos - 1);
            const endPos = track.indexOf('<trkseg>', lastPos);
            if (endPos >= 0) {
                newTrack += track.substring(endPos + '<trkseg>'.length, track.length);
            }
        }

        return newTrack;
    }

    public static mergeGpx(track1: string, track2: string): string {
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

        let newTrack = '   ';
        for (const track of [track1, track2]) {
            for (const element of [['<trk>', '</trk>'], ['<rte>', '</rte>'], ['<wpt ', '</wpt>']]) {
                let lastPos = -1;
                let idx = -1;
                do {
                    idx++;
                    lastPos = StringUtils.findNeedle(track, element[0], idx);
                    if (lastPos >= 0) {
                        const endPos = track.indexOf(element[1], lastPos);
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
    }

    parse(xml: string, options): GeoElement[] {
        if (!xml) {
            console.error('cant parse GeoGpxParser: empty');
            return;
        }
        xml = GeoGpxParser.fixXml(xml);
        if (!(xml.startsWith('<?xml'))) {
            console.error('cant parse GeoGpxParser: no valid xml');
            return;
        }

        const oParser = new DOMParser();
        const gpxDom = oParser.parseFromString(xml, 'application/xml');
        if (gpxDom.getElementsByTagName('parsererror').length > 0) {
            console.error('cant parse GeoGpxParser: parsererror', gpxDom.getElementsByTagName('parsererror')[0]);
            return;
        }

        const elements = this._parseGpxDom(gpxDom, options);
        if (!elements) {
            return;
        }

        return elements;
    }

    _parseGpxDom(gpxDom, options): GeoElement[] {
        let j, i, el = [];
        const elements = [], tags = [['rte', 'rtept'], ['trkseg', 'trkpt']];

        for (j = 0; j < tags.length; j++) {
            el = gpxDom.getElementsByTagName(tags[j][0]);
            for (i = 0; i < el.length; i++) {
                const l = this.parse_trkseg(el[i], gpxDom, tags[j][1]);
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
                const waypoint = this.parse_wpt(el[i], gpxDom);
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
    }

    parse_name(gpxDom, layer: GeoElement): string {
        let i, el, txt = '', name, descr = '', link, len = 0;
        el = gpxDom.getElementsByTagName('name');
        if (el.length) {
            name = el[0].childNodes[0].nodeValue;
        }
        el = gpxDom.getElementsByTagName('desc');
        for (i = 0; i < el.length; i++) {
            for (let j = 0; j < el[i].childNodes.length; j++) {
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
    }

    parse_trkseg(line, gpxDom, tag): GeoElement {
        const el = line.getElementsByTagName(tag);
        if (!el.length) {
            return;
        }
        const coords = [];
        for (let i = 0; i < el.length; i++) {
            const ptElement = el[i];
            const eleElement = ptElement.getElementsByTagName('ele');
            const timeElement = ptElement.getElementsByTagName('time');
            let ele;
            let time;
            if (eleElement && eleElement.length > 0) {
                ele = eleElement[0].childNodes[0].nodeValue;
            }
            if (timeElement && timeElement.length > 0) {
                time = DateUtils.parseDate(timeElement[0].childNodes[0].nodeValue);
            }
            let ll;
            if (time !== undefined) {
                ll = new LatLngTime(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'), ele, time);
            } else {
                ll = ele !== undefined ? new L.LatLng(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'), ele) :
                new L.LatLng(ptElement.getAttribute('lat'), ptElement.getAttribute('lon'));
            }
            coords.push(ll);
        }

        const typeEl = gpxDom.getElementsByTagName('type');
        let type = tag === 'trkpt' ? GeoElementType.TRACK : GeoElementType.ROUTE;
        if (typeEl.length && typeEl[0].childNodes[0].nodeValue === 'AREA') {
            type = GeoElementType.AREA;
        }

        return new GeoElement(type, coords, name);
    }

    parse_wpt(e, gpxDom): GeoElement {
        const m = new GeoElement(GeoElementType.WAYPOINT, [new L.LatLng(e.getAttribute('lat'), e.getAttribute('lon'))], undefined);
        return m;
    }
}
