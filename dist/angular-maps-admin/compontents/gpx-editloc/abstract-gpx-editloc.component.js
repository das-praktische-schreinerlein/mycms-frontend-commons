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
import { GeoGpxParser } from '../../../angular-maps/services/geogpx.parser';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { DOCUMENT } from '@angular/common';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { LatLng } from 'leaflet';
import { GeoLocationService } from '@dps/mycms-commons/dist/commons/services/geolocation.service';
import { FormUtils } from '../../../angular-commons/services/form.utils';
import { AbstractGeoGpxParser } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
var AbstractGpxEditLocComponent = /** @class */ (function (_super) {
    __extends(AbstractGpxEditLocComponent, _super);
    function AbstractGpxEditLocComponent(fb, toastr, cd, appService, document) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.toastr = toastr;
        _this.cd = cd;
        _this.appService = appService;
        _this.document = document;
        _this.geoLocationService = new GeoLocationService();
        _this.lastGpx = '';
        _this.lastGeoLoc = '';
        _this.lastName = '';
        _this.geoLocRecords = [];
        _this.flgShowArea = true;
        _this.saveTrackSrc = new EventEmitter();
        _this.saveGeoLoc = new EventEmitter();
        _this.saveAdditionalFields = new EventEmitter();
        _this.editGpxLocFormGroup = _this.fb.group({
            gpxSrc: _this.gpxSrc,
            geoLoc: _this.geoLoc,
            geoLocAddress: _this.name,
            geoLocUseMapClickPos: false,
            keywords: '',
            infos: ''
        });
        return _this;
    }
    AbstractGpxEditLocComponent.prototype.doGeoLocationSearch = function (selector) {
        var me = this;
        this.geoLocationService.doLocationSearch(selector, this.editGpxLocFormGroup.getRawValue()['geoLocAddress']).then(function (event) {
            me.editGpxLocFormGroup.patchValue({
                'keywords': event.detail.raw
                    ? event.detail.raw.class + '_' + event.detail.raw.type
                    : ''
            });
            me.editGpxLocFormGroup.patchValue({
                'infos': event.detail.raw
                    ? 'https://www.openstreetmap.org/' + event.detail.raw.osm_type + '/' + event.detail.raw.osm_id
                    : ''
            });
            me.editGpxLocFormGroup.patchValue({ 'geoLoc': event.detail.lat + ',' + event.detail.lon + ',' + 0 });
            me.updateGeoData();
        }).catch(function (reason) {
            console.warn('locationsearch failed', reason);
        });
        return false;
    };
    AbstractGpxEditLocComponent.prototype.onGeoLocMapCreated = function (map) {
        this.geoLocMap = map;
        var me = this;
        map.on('click', function (event) {
            return me.onGeoLocMapClicked(event.latlng);
        });
    };
    AbstractGpxEditLocComponent.prototype.onGeoLocMapClicked = function (position) {
        if (position && FormUtils.getStringFormValue(this.editGpxLocFormGroup.getRawValue(), 'geoLocUseMapClickPos') === 'true') {
            this.editGpxLocFormGroup.patchValue({ 'geoLoc': position.lat + ',' + position.lng + ',' + 0 });
            this.cd.markForCheck();
        }
    };
    AbstractGpxEditLocComponent.prototype.createNewGeoLocArea = function () {
        var points = [];
        var geoLoc = this.editGpxLocFormGroup.getRawValue()['geoLoc'];
        if (geoLoc !== undefined && geoLoc !== null && geoLoc.length > 0) {
            var lst = geoLoc ? geoLoc.split(',') : [];
            if (lst.length > 1) {
                var lat = parseFloat(lst[0]);
                var lon = parseFloat(lst[1]);
                var factor = void 0;
                var type = this.subtype;
                if (Array.isArray(type) && type.length > 0) {
                    type = type[0];
                }
                switch (type ? type.toString() : '') {
                    case '1':
                        factor = 10;
                        break;
                    case '2':
                        factor = 3;
                        break;
                    case '3':
                        factor = 1;
                        break;
                    case '4':
                        factor = 0.2;
                        break;
                    default:
                        factor = 0.02;
                }
                points.push(new LatLng(lat - factor, lon - factor), new LatLng(lat - factor, lon + factor), new LatLng(lat + factor, lon + factor), new LatLng(lat + factor, lon - factor), new LatLng(lat - factor, lon - factor));
            }
        }
        var newGpx = GeoGpxParser.createNewRouteGpx(this.name, 'AREA', points);
        newGpx = GeoGpxParser.fixXml(newGpx);
        newGpx = GeoGpxParser.fixXmlExtended(newGpx);
        newGpx = GeoGpxParser.reformatXml(newGpx);
        this.setValue('gpxSrc', newGpx);
        this.updateGeoData();
        return false;
    };
    AbstractGpxEditLocComponent.prototype.updateGeoLocArea = function () {
        var _this = this;
        if (this.geoLocMap) {
            var newGpx_1 = '';
            this.geoLocMap.eachLayer(function (layer) {
                if (layer['getPoints']) {
                    var points_1 = [];
                    // @ts-ignore
                    var markers = layer.getPoints();
                    if (markers) {
                        markers.forEach(function (marker) {
                            points_1.push(marker.getLatLng());
                        });
                        newGpx_1 += GeoGpxParser.createNewRouteGpx(_this.name, 'AREA', points_1);
                    }
                }
            });
            newGpx_1 = GeoGpxParser.fixXml(newGpx_1);
            newGpx_1 = GeoGpxParser.fixXmlExtended(newGpx_1);
            newGpx_1 = GeoGpxParser.reformatXml(newGpx_1);
            this.setValue('gpxSrc', newGpx_1);
            this.updateGeoData();
        }
        return false;
    };
    AbstractGpxEditLocComponent.prototype.updateGeoLoc = function () {
        this.updateGeoData();
        return false;
    };
    AbstractGpxEditLocComponent.prototype.updateMap = function (values) {
        var me = this;
        var geoRecords = [];
        var trackSrc = values['gpxSrc'];
        if (trackSrc !== undefined && trackSrc !== null && trackSrc.length > 0) {
            if (AbstractGeoGpxParser.isResponsibleForSrc(trackSrc)) {
                trackSrc = GeoGpxParser.fixXml(trackSrc);
                trackSrc = GeoGpxParser.fixXmlExtended(trackSrc);
                trackSrc = GeoGpxParser.reformatXml(trackSrc);
                trackSrc = trackSrc.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ');
            }
            geoRecords.push(this.createSanitized({
                id: 'TMPLOC' + (new Date()).getTime(),
                gpsTrackSrc: trackSrc,
                name: values['name'],
                type: this.type,
                datestart: new Date().toISOString(),
                dateend: new Date().toISOString(),
                dateshow: values['dateshow']
            }));
        }
        var geoLoc = values['geoLoc'];
        if (geoLoc !== undefined && geoLoc !== null && geoLoc.length > 0) {
            var lst = geoLoc ? geoLoc.split(',') : [];
            geoRecords.push(this.createSanitized({
                id: 'TMPAREA' + (new Date()).getTime(),
                geoLoc: geoLoc,
                geoLat: lst.length > 1 ? lst[0] : undefined,
                geoLon: lst.length > 1 ? lst[1] : undefined,
                name: values['name'],
                type: this.type,
                datestart: new Date().toISOString(),
                dateend: new Date().toISOString(),
                dateshow: values['dateshow']
            }));
        }
        me.geoLocRecords = geoRecords;
        this.cd.markForCheck();
        return false;
    };
    AbstractGpxEditLocComponent.prototype.setValue = function (field, value) {
        var config = {};
        config[field] = value;
        this.editGpxLocFormGroup.patchValue(config);
    };
    AbstractGpxEditLocComponent.prototype.updateGeoData = function () {
        if (this.lastGpx === this.getCurrentGpx() && this.lastGeoLoc === this.getCurrentGeoLoc()) {
            return false;
        }
        this.lastGpx = this.getCurrentGpx();
        this.lastGeoLoc = this.getCurrentGeoLoc();
        var values = this.editGpxLocFormGroup.getRawValue();
        this.prepareSubmitValues(values);
        this.saveTrackSrc.emit(values['gpxSrc']);
        this.saveGeoLoc.emit(values['geoLoc']);
        this.saveAdditionalFields.emit(values);
        return this.updateMap(this.editGpxLocFormGroup.getRawValue());
    };
    AbstractGpxEditLocComponent.prototype.prepareSubmitValues = function (values) {
        if (values['gpxSrc'] !== undefined && values['gpxSrc'] !== null) {
            if (AbstractGeoGpxParser.isResponsibleForSrc(values['gpxSrc'])) {
                values['gpxSrc'] = GeoGpxParser.trimXml(values['gpxSrc']);
            }
        }
    };
    AbstractGpxEditLocComponent.prototype.updateFormComponents = function () {
        this.setCurrentGpx(this.gpxSrc);
        this.setCurrentGeoLoc(this.geoLoc);
        this.setCurrentGeoLocAddress(this.name);
        this.lastName = this.getCurrentGeoLocAddress();
        this.updateGeoData();
        this.cd.markForCheck();
    };
    AbstractGpxEditLocComponent.prototype.updateData = function () {
        this.updateFormComponents();
    };
    AbstractGpxEditLocComponent.prototype.setCurrentGpx = function (value) {
        var config = {};
        config['gpxSrc'] = value;
        this.editGpxLocFormGroup.patchValue(config);
    };
    AbstractGpxEditLocComponent.prototype.getCurrentGpx = function () {
        return this.editGpxLocFormGroup.getRawValue()['gpxSrc'];
    };
    AbstractGpxEditLocComponent.prototype.setCurrentGeoLoc = function (value) {
        var config = {};
        config['geoLoc'] = value;
        this.editGpxLocFormGroup.patchValue(config);
    };
    AbstractGpxEditLocComponent.prototype.getCurrentGeoLoc = function () {
        return this.editGpxLocFormGroup.getRawValue()['geoLoc'];
    };
    AbstractGpxEditLocComponent.prototype.setCurrentGeoLocAddress = function (value) {
        var config = {};
        config['geoLocAddress'] = value;
        this.editGpxLocFormGroup.patchValue(config);
    };
    AbstractGpxEditLocComponent.prototype.getCurrentGeoLocAddress = function () {
        return this.editGpxLocFormGroup.getRawValue()['geoLocAddress'];
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditLocComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditLocComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditLocComponent.prototype, "subtype", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditLocComponent.prototype, "gpxSrc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AbstractGpxEditLocComponent.prototype, "geoLoc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AbstractGpxEditLocComponent.prototype, "flgShowArea", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AbstractGpxEditLocComponent.prototype, "saveTrackSrc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AbstractGpxEditLocComponent.prototype, "saveGeoLoc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AbstractGpxEditLocComponent.prototype, "saveAdditionalFields", void 0);
    AbstractGpxEditLocComponent = __decorate([
        __param(4, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [FormBuilder, ToastrService, ChangeDetectorRef,
            GenericAppService, Object])
    ], AbstractGpxEditLocComponent);
    return AbstractGpxEditLocComponent;
}(AbstractInlineComponent));
export { AbstractGpxEditLocComponent };
//# sourceMappingURL=abstract-gpx-editloc.component.js.map