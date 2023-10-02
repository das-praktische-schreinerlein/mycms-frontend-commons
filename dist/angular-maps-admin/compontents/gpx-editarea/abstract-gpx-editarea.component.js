var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectorRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrackStatisticService } from '../../../angular-maps/services/track-statistic.service';
import { GeoGpxParser } from '../../../angular-maps/services/geogpx.parser';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
import { DOCUMENT } from '@angular/common';
import { GeoElementType, LatLngTime } from '../../../angular-maps/services/geo.parser';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { AbstractGeoGpxParser } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
import { GeoParserDeterminer } from '../../../angular-maps/services/geo-parser.determiner';
import { DefaultTrackColors } from '@dps/mycms-commons/dist/geo-commons/model/track-colors';
var AbstractGpxEditAreaComponent = /** @class */ (function (_super) {
    __extends(AbstractGpxEditAreaComponent, _super);
    function AbstractGpxEditAreaComponent(fb, toastr, cd, appService, geoParserService, gpxParser, document, maxGpxFileLength) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.geoParserService = geoParserService;
        _this.gpxParser = gpxParser;
        _this.document = document;
        _this.maxGpxFileLength = maxGpxFileLength;
        _this.trackStatisticService = new TrackStatisticService();
        _this.lastGpx = '';
        _this.lastName = '';
        _this.trackColors = new DefaultTrackColors();
        _this.editTrackRecords = [];
        _this.renderedMapElements = [];
        _this.trackSegmentStatistics = [];
        _this.editGpxFormGroup = _this.fb.group({
            gpxSrc: '',
            mergeNewTracks: false
        });
        _this.mergeNewTracks = false;
        _this.defaultPosition = AbstractGpxEditAreaComponent.createDefaultPosition();
        _this.save = new EventEmitter();
        return _this;
    }
    AbstractGpxEditAreaComponent.createDefaultPosition = function () {
        return new LatLngTime(AbstractGpxEditAreaComponent._DEFAULT_LAT, AbstractGpxEditAreaComponent._DEFAULT_LON, undefined, undefined);
    };
    AbstractGpxEditAreaComponent.prototype.gpxDropped = function (event) {
        var _this = this;
        var me = this;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var droppedFile = _a[_i];
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    var maxLength = _this.maxGpxFileLength;
                    if (file.size > maxLength) {
                        me.toastr.warning('Die GPX-Datei darf höchstes ' + maxLength / 1000000 + 'MB groß sein.', 'Oje!');
                        return;
                    }
                    if (!file.name.toLowerCase().endsWith('.gpx')) {
                        me.toastr.warning('Es dürfen nur .gpx Dateien geladen werden.', 'Oje!');
                        return;
                    }
                    reader.onload = (function (theFile) {
                        return function (e) {
                            var track = e.target.result;
                            if (AbstractGeoGpxParser.isResponsibleForSrc(track)) {
                                if (me.editGpxFormGroup.getRawValue()['mergeNewTracks'] === true) {
                                    track = GeoGpxParser.mergeGpx(me.getCurrentGpx(), track);
                                }
                                track = GeoGpxParser.reformatXml(track);
                            }
                            me.setCurrentGpx(track);
                            return me.updateGpsTrack();
                        };
                    })(file);
                    // Read in the file as a data URL.
                    reader.readAsText(file);
                });
                return;
            }
        }
    };
    AbstractGpxEditAreaComponent.prototype.updateMap = function () {
        var track = this.getCurrentGpx();
        this.trackColors.setCurrent(0);
        if (track !== undefined && track !== null && track.length > 0) {
            if (AbstractGeoGpxParser.isResponsibleForSrc(track)) {
                track = track
                    .replace(/[\r\n]/g, ' ')
                    .replace(/[ ]+/g, ' ');
                track = GeoGpxParser.reformatXml(track);
            }
            this.setCurrentGpx(track);
        }
        this.generateTrackSegments(track);
        this.renderedMapElements = [];
        this.cd.markForCheck();
        return false;
    };
    AbstractGpxEditAreaComponent.prototype.generateTrackSegments = function (track) {
        if (track === undefined || track === null || track.length <= 0) {
            this.trackSegmentStatistics = [];
            this.editTrackRecords = [];
            return;
        }
        var geoParser = this.geoParserService.determineParser(undefined, track);
        if (!geoParser) {
            this.trackSegmentStatistics = [];
            this.editTrackRecords = [];
            return;
        }
        var geoElements = geoParser.parse(track, {});
        if (geoElements !== undefined && geoElements.length > 0) {
            var trackStatistics = [];
            var editTrackRecords = [];
            for (var _i = 0, geoElements_1 = geoElements; _i < geoElements_1.length; _i++) {
                var geoElement = geoElements_1[_i];
                var trackSrc = '';
                var type = 'TRACK';
                switch (geoElement.type) {
                    case GeoElementType.TRACK:
                        type = 'TRACK';
                        this.lastName = geoElement.name;
                        trackSrc = '<trk><trkseg>';
                        var trackStatistic = this.trackStatisticService.trackStatisticsForGeoElement(geoElement);
                        trackStatistic['type'] = type;
                        trackStatistics.push(trackStatistic);
                        trackSrc += geoElement.points.map(function (value) {
                            return '<trkpt lat="' + value.lat + '" lon="' + value.lng + '">' +
                                '<ele>' + value.alt + '</ele>' +
                                (value['time'] ? '<time>' + value['time'].toISOString() + '</time>' : '') +
                                '</trkpt>';
                        }).join('\n');
                        trackSrc += '</trkseg></trk>';
                        break;
                    case GeoElementType.ROUTE:
                        type = 'ROUTE';
                        this.lastName = geoElement.name;
                        trackSrc = '<rte>';
                        var routeStatistic = this.trackStatisticService.trackStatisticsForGeoElement(geoElement);
                        routeStatistic['type'] = type;
                        trackStatistics.push(routeStatistic);
                        trackSrc += geoElement.points.map(function (value) {
                            return '<rtept lat="' + value.lat + '" lon="' + value.lng + '"><ele>' + value.alt + '</ele></rtept>';
                        }).join('\n');
                        trackSrc += '</rte>';
                        break;
                    case GeoElementType.WAYPOINT:
                        type = 'LOCATION';
                        this.lastName = geoElement.name;
                        var locStatistic = this.trackStatisticService.trackStatisticsForGeoElement(geoElement);
                        locStatistic['type'] = type;
                        trackStatistics.push(locStatistic);
                        trackSrc += geoElement.points.map(function (value) {
                            return '<wpt lat="' + value.lat + '" lon="' + value.lng + '"></wpt>';
                        }).join('\n');
                        break;
                }
                trackSrc = GeoGpxParser.fixXml(trackSrc);
                trackSrc = GeoGpxParser.fixXmlExtended(trackSrc);
                trackSrc = GeoGpxParser.reformatXml(trackSrc);
                editTrackRecords.push(this.createSanitized({
                    id: 'TMP' + (new Date()).getTime(),
                    gpsTrackSrc: trackSrc,
                    gpsTrackBaseFile: 'tmp.gpx',
                    name: geoElement.name || new Date().toISOString(),
                    type: type,
                    datestart: new Date().toISOString(),
                    dateend: new Date().toISOString(),
                    dateshow: new Date().toISOString()
                }));
            }
            this.editTrackRecords = editTrackRecords;
            this.trackSegmentStatistics = trackStatistics;
        }
        else {
            this.trackSegmentStatistics = [];
            this.editTrackRecords = [];
        }
    };
    AbstractGpxEditAreaComponent.prototype.deleteTrackSegment = function (delSegIdx) {
        this.setCurrentGpx(GeoGpxParser.deleteGpxTrackSegment(this.getCurrentGpx(), delSegIdx));
        return this.updateGpsTrack();
    };
    AbstractGpxEditAreaComponent.prototype.mergeTrackSegment = function (mergeSegIdx) {
        this.setCurrentGpx(GeoGpxParser.mergeGpxTrackSegment(this.getCurrentGpx(), mergeSegIdx));
        return this.updateGpsTrack();
    };
    AbstractGpxEditAreaComponent.prototype.jumpToTrackSegment = function (delSegIdx) {
        var track = this.getCurrentGpx();
        if (track !== undefined && track !== null && track.length > 0) {
            var lastPos = StringUtils.findNeedle(track, '<trkseg>', delSegIdx);
            if (lastPos >= 0) {
                var element = this.document.getElementById('gpxSrc');
                if (!element) {
                    return false;
                }
                element.focus();
                this.setSelectionRangeOnInput(element, lastPos, lastPos);
            }
        }
        return false;
    };
    AbstractGpxEditAreaComponent.prototype.fixMap = function () {
        var track = this.getCurrentGpx();
        if (track !== undefined && track !== null && track.length > 0) {
            if (AbstractGeoGpxParser.isResponsibleForSrc(track)) {
                track = GeoGpxParser.fixXml(track);
                track = GeoGpxParser.fixXmlExtended(track);
                track = GeoGpxParser.reformatXml(track);
            }
            this.setCurrentGpx(track);
        }
        return this.updateGpsTrack();
    };
    AbstractGpxEditAreaComponent.prototype.setMapElementsRendered = function (mapElements) {
        this.renderedMapElements = [].concat(mapElements);
        this.cd.markForCheck();
    };
    AbstractGpxEditAreaComponent.prototype.updateGpsTrack = function () {
        if (this.lastGpx === this.getCurrentGpx()) {
            return false;
        }
        this.lastGpx = this.getCurrentGpx();
        var values = this.editGpxFormGroup.getRawValue();
        this.prepareSubmitValues(values);
        this.save.emit(values['gpxSrc']);
        return this.updateMap();
    };
    AbstractGpxEditAreaComponent.prototype.onGeoMapCreated = function (map) {
        this.geoMap = map;
    };
    AbstractGpxEditAreaComponent.prototype.updateGpsTrackFromMap = function () {
        var _this = this;
        if (this.geoMap) {
            var newGpx_1 = '';
            var segments_1 = [];
            this.geoMap.eachLayer(function (layer) {
                var points = [];
                if (layer['getLatLngs']) {
                    // @ts-ignore
                    points = layer.getLatLngs();
                }
                else if (layer['getPoints']) {
                    // @ts-ignore
                    var markers = layer.getPoints();
                    if (markers) {
                        markers.forEach(function (marker) {
                            points.push(marker.getLatLng());
                        });
                    }
                }
                if (points) {
                    if (_this.type === 'TRACK') {
                        segments_1.push(_this.gpxParser.createGpxTrackSegment(points, undefined));
                    }
                    else {
                        newGpx_1 += _this.gpxParser.createGpxRoute(_this.lastName, _this.type, points, undefined);
                    }
                }
            });
            if (this.type === 'TRACK') {
                newGpx_1 += this.gpxParser.createGpxTrack(this.lastName, this.type, segments_1);
            }
            newGpx_1 = GeoGpxParser.fixXml(newGpx_1);
            newGpx_1 = GeoGpxParser.fixXmlExtended(newGpx_1);
            newGpx_1 = GeoGpxParser.reformatXml(newGpx_1);
            this.setCurrentGpx(newGpx_1);
            this.fixMap();
            this.updateData();
        }
        return false;
    };
    AbstractGpxEditAreaComponent.prototype.createNewGpx = function () {
        var me = this;
        var points = [];
        var lat = this.defaultPosition.lat;
        var lon = this.defaultPosition.lng;
        var factor = 0.01;
        points.push(new LatLngTime(lat - factor, lon - factor, this.defaultPosition.alt, this.defaultPosition.time), new LatLngTime(lat - factor, lon + factor, this.defaultPosition.alt, this.defaultPosition.time), new LatLngTime(lat + factor, lon - factor, this.defaultPosition.alt, this.defaultPosition.time));
        var track = '';
        if (this.type === 'TRACK') {
            track = this.gpxParser.createGpxTrack(this.lastName, this.type, [
                this.gpxParser.createGpxTrackSegment(points, this.defaultPosition)
            ]);
        }
        else {
            track = this.gpxParser.createGpxRoute(this.lastName, this.type, points, this.defaultPosition);
        }
        me.setCurrentGpx(GeoGpxParser.reformatXml(track));
        return me.fixMap();
    };
    AbstractGpxEditAreaComponent.prototype.prepareSubmitValues = function (values) {
        if (values['gpxSrc'] !== undefined && values['gpxSrc'] !== null) {
            if (AbstractGeoGpxParser.isResponsibleForSrc(values['gpxSrc'])) {
                values['gpxSrc'] = GeoGpxParser.trimXml(values['gpxSrc']);
            }
        }
    };
    AbstractGpxEditAreaComponent.prototype.updateFormComponents = function () {
        this.setCurrentGpx(this.gpxSrc);
        this.lastGpx = this.getCurrentGpx();
        this.updateMap();
    };
    AbstractGpxEditAreaComponent.prototype.setSelectionRangeOnInput = function (input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }
    };
    AbstractGpxEditAreaComponent.prototype.updateData = function () {
        this.updateFormComponents();
    };
    AbstractGpxEditAreaComponent.prototype.setCurrentGpx = function (value) {
        var config = {};
        config['gpxSrc'] = value;
        this.editGpxFormGroup.patchValue(config);
    };
    AbstractGpxEditAreaComponent.prototype.getCurrentGpx = function () {
        return this.editGpxFormGroup.getRawValue()['gpxSrc'];
    };
    AbstractGpxEditAreaComponent._DEFAULT_LAT = 51.9746413082;
    AbstractGpxEditAreaComponent._DEFAULT_LON = 13.8;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditAreaComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditAreaComponent.prototype, "gpxSrc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AbstractGpxEditAreaComponent.prototype, "mergeNewTracks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AbstractGpxEditAreaComponent.prototype, "defaultPosition", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AbstractGpxEditAreaComponent.prototype, "save", void 0);
    AbstractGpxEditAreaComponent = __decorate([
        __param(6, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [FormBuilder, ToastrService, ChangeDetectorRef,
            GenericAppService, GeoParserDeterminer, GeoGpxParser, Object, Number])
    ], AbstractGpxEditAreaComponent);
    return AbstractGpxEditAreaComponent;
}(AbstractInlineComponent));
export { AbstractGpxEditAreaComponent };
//# sourceMappingURL=abstract-gpx-editarea.component.js.map