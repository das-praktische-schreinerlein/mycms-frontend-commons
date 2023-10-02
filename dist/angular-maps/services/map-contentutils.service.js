var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { LatLng } from 'leaflet';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
var MapContentUtils = /** @class */ (function () {
    function MapContentUtils(appService) {
        this.appService = appService;
    }
    MapContentUtils.prototype.createMapElementForDocRecord = function (record, code, showImageTrackAndGeoPos, trackColors) {
        return this.createChartElementForDocRecord(record, code, showImageTrackAndGeoPos, trackColors);
    };
    MapContentUtils.prototype.createChartElementForDocRecord = function (record, code, showImageTrackAndGeoPos, trackColors) {
        var trackUrl = record.gpsTrackBasefile;
        var isImage = (record.type === 'IMAGE' || record.type === 'VIDEO');
        var showTrack = ((trackUrl !== undefined && trackUrl.length > 0)
            || (record.gpsTrackSrc !== undefined && record.gpsTrackSrc !== null && record.gpsTrackSrc.length > 0))
            && (!isImage || showImageTrackAndGeoPos);
        var showGeoPos = (!showTrack || isImage) && record.geoLat && record.geoLon &&
            record.geoLat !== '0.0' && record.geoLon !== '0.0';
        var mapElements = [];
        if (showTrack) {
            var storeUrl = void 0;
            // TODO make it configurable json/gpx
            if (this.appService.getAppConfig()['useAssetStoreUrls'] === true) {
                storeUrl = this.appService.getAppConfig()['tracksBaseUrl'] + 'json/' + record.id;
            }
            else {
                storeUrl = this.appService.getAppConfig()['tracksBaseUrl'] + trackUrl + '.json';
            }
            var mapElement = {
                id: record.id,
                code: code,
                name: record.name,
                color: trackColors !== undefined ? trackColors.next() : undefined,
                trackUrl: storeUrl,
                trackSrc: record.gpsTrackSrc,
                popupContent: '<b>' + '&#128204;' + code + ' ' + record.type + ': ' + record.name + '</b>',
                type: record.type
            };
            mapElements.push(mapElement);
        }
        if (showGeoPos) {
            var ele = BeanUtils.getValue(record, 'tdocdatatech.altMax');
            var point = ele !== undefined ? new LatLng(+record.geoLat, +record.geoLon, +ele) : new LatLng(+record.geoLat, +record.geoLon);
            var mapElement = {
                id: record.id,
                code: code,
                name: record.type + ': ' + record.name,
                point: point,
                popupContent: '<b>' + '&#128204;' + code + ' ' + record.type + ': ' + record.name + '</b>',
                type: record.type
            };
            mapElements.push(mapElement);
        }
        return mapElements;
    };
    MapContentUtils = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService])
    ], MapContentUtils);
    return MapContentUtils;
}());
export { MapContentUtils };
//# sourceMappingURL=map-contentutils.service.js.map