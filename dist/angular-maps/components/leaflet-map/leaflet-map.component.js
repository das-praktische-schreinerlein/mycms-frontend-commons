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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import { GeoParsedFeature } from '../../services/leaflet-geo.plugin';
import * as L from 'leaflet';
import { LatLng, markerClusterGroup, TileLayer } from 'leaflet';
import { GeoElement, GeoElementType } from '../../services/geo.parser';
import { AbstractMapComponent } from '../abstract-map.component';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import { AbstractGeoGpxParser } from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';
var LeafletMapComponent = /** @class */ (function (_super) {
    __extends(LeafletMapComponent, _super);
    function LeafletMapComponent(http) {
        var _this = _super.call(this, http) || this;
        _this.mapHeight = '390px';
        // create the tile layer with correct attribution
        _this.osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        _this.osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        _this.osm = new TileLayer(_this.osmUrl, {
            minZoom: 1, maxZoom: 16,
            attribution: _this.osmAttrib
        });
        _this.bounds = undefined;
        _this.centerOnMapElements = undefined;
        _this.centerChanged = new EventEmitter();
        _this.mapCreated = new EventEmitter();
        _this.mapElementClicked = new EventEmitter();
        _this.mapElementsLoaded = new EventEmitter();
        return _this;
    }
    LeafletMapComponent.prototype.renderMap = function () {
        // TODO: move to Service
        if (!this.initialized || !this.mapId) {
            return;
        }
        var mapHeight = this.flgfullScreen ? window.innerHeight - 10 : parseInt(this.height, 10) - 10;
        this.mapHeight = mapHeight + 'px';
        if (!this.map) {
            // set up the map
            this.map = new L.Map(this.mapId);
            this.map.addLayer(this.osm);
            this.mapCreated.emit(this.map);
        }
        if (!this.map) {
            return;
        }
        if (this.featureGroup) {
            this.featureGroup.clearLayers();
            this.map.removeLayer(this.featureGroup);
        }
        this.loadedMapElements = [];
        this.noCoorElements = [];
        this.bounds = undefined;
        var center = this.center || new LatLng(43, 16);
        this.map.setView(center, this.zoom);
        var me = this;
        this.featureGroup = markerClusterGroup();
        this.featureGroup.addTo(this.map);
        var _loop_1 = function (i) {
            var mapElement = this_1.mapElements[i];
            var trackSrc = mapElement.trackSrc;
            var trackUrl = mapElement.trackUrl;
            if (trackUrl || trackSrc) {
                var geoFeature = void 0;
                if (this_1.gpxLoader.isResponsibleForFile(trackUrl)
                    || this_1.gpxLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this_1.gpxLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this_1.options.editable,
                        generateName: this_1.options.flgGenerateNameFromGpx,
                        showAreaMarker: this_1.options.showAreaMarker,
                        showStartMarker: this_1.options.showStartMarker,
                        showEndMarker: this_1.options.showEndMarker
                    });
                }
                else if (this_1.txtLoader.isResponsibleForFile(trackUrl)
                    || this_1.txtLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this_1.txtLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this_1.options.editable,
                        generateName: this_1.options.flgGenerateNameFromGpx,
                        showAreaMarker: this_1.options.showAreaMarker,
                        showStartMarker: this_1.options.showStartMarker,
                        showEndMarker: this_1.options.showEndMarker
                    });
                }
                else if (this_1.jsonLoader.isResponsibleForFile(trackUrl)
                    || this_1.jsonLoader.isResponsibleForSrc(trackSrc)) {
                    geoFeature = new GeoParsedFeature(this_1.jsonLoader, mapElement, {
                        async: true,
                        display_wpt: false,
                        editable: this_1.options.editable,
                        generateName: this_1.options.flgGenerateNameFromGpx,
                        showAreaMarker: this_1.options.showAreaMarker,
                        showStartMarker: this_1.options.showStartMarker,
                        showEndMarker: this_1.options.showEndMarker
                    });
                }
                else {
                    console.error('no loader for mapElement responsible:', mapElement.id, mapElement, trackUrl, trackSrc, AbstractGeoGpxParser.isResponsibleForSrc(trackSrc));
                    me.pushNoCoorMapElement(mapElement);
                    return "continue";
                }
                if (!geoFeature) {
                    console.error('no geoFeature for mapElement parsed by loader:', mapElement.id, mapElement, trackUrl, trackSrc, this_1.gpxLoader.isResponsibleForSrc(trackSrc));
                    me.pushNoCoorMapElement(mapElement);
                    return "continue";
                }
                geoFeature.on('error', function (e) {
                    var loadedMapElement = e['mapElement'];
                    console.error('cant load mapElement:', loadedMapElement.id);
                    me.pushNoCoorMapElement(loadedMapElement);
                });
                geoFeature.on('loaded', function (e) {
                    var loadedTrackFeature = e.target;
                    var loadedMapElement = e['mapElement'];
                    me.featureGroup.addLayer(loadedTrackFeature);
                    loadedTrackFeature.on('click', function () {
                        me.mapElementClicked.emit(loadedMapElement);
                    });
                    if (me.centerOnMapElements && me.centerOnMapElements.length > 0) {
                        if (me.centerOnMapElements.indexOf(loadedMapElement) >= 0) {
                            me.bounds = me.extendBounds(me.bounds, loadedTrackFeature.getBounds());
                        }
                    }
                    else {
                        me.bounds = me.extendBounds(me.bounds, loadedTrackFeature.getBounds());
                    }
                    if (me.bounds) {
                        me.map.fitBounds(me.bounds);
                    }
                    me.pushLoadedMapElement(loadedMapElement);
                });
            }
            else if (mapElement.point) {
                var prefix = (mapElement.code !== undefined ? mapElement.code + ' ' : '');
                var geoElement = new GeoElement(GeoElementType.WAYPOINT, [mapElement.point], mapElement.title || (prefix + mapElement.name));
                var pointFeature = GeoParsedFeature.convertGeoElementsToLayers(mapElement, [geoElement], {
                    async: true,
                    display_wpt: true,
                    editable: this_1.options.editable,
                    generateName: this_1.options.flgGenerateNameFromGpx,
                    showAreaMarker: this_1.options.showAreaMarker,
                    showStartMarker: this_1.options.showStartMarker,
                    showEndMarker: this_1.options.showEndMarker
                });
                mapElement.featureLayer = pointFeature;
                me.featureGroup.addLayer(pointFeature);
                pointFeature.on('click', function () {
                    me.mapElementClicked.emit(mapElement);
                });
                if (me.centerOnMapElements && me.centerOnMapElements.length > 0) {
                    if (me.centerOnMapElements.indexOf(mapElement) >= 0) {
                        me.bounds = me.extendBounds(me.bounds, pointFeature.getBounds());
                    }
                }
                else {
                    me.bounds = me.extendBounds(me.bounds, pointFeature.getBounds());
                }
                if (me.bounds) {
                    me.map.fitBounds(me.bounds);
                }
                me.pushLoadedMapElement(mapElement);
            }
            else {
                me.pushNoCoorMapElement(mapElement);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.mapElements.length; i++) {
            _loop_1(i);
        }
        this.checkAndEmitLoadedEventIfAllProcessed();
    };
    LeafletMapComponent.prototype.pushLoadedMapElement = function (loadedMapElement) {
        this.loadedMapElements.push(loadedMapElement);
        this.checkAndEmitLoadedEventIfAllProcessed();
    };
    LeafletMapComponent.prototype.pushNoCoorMapElement = function (noCoorElement) {
        this.noCoorElements.push(noCoorElement);
        this.checkAndEmitLoadedEventIfAllProcessed();
    };
    LeafletMapComponent.prototype.checkAndEmitLoadedEventIfAllProcessed = function () {
        if (this.mapElements.length === 0 ||
            this.loadedMapElements.length + this.noCoorElements.length === this.mapElements.length) {
            this.mapElementsLoaded.emit(this.loadedMapElements);
        }
    };
    LeafletMapComponent.prototype.extendBounds = function (bounds, element) {
        if (!bounds) {
            return element;
        }
        return bounds.extend(element);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LeafletMapComponent.prototype, "centerOnMapElements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", LatLng)
    ], LeafletMapComponent.prototype, "center", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LeafletMapComponent.prototype, "zoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LeafletMapComponent.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LeafletMapComponent.prototype, "centerChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LeafletMapComponent.prototype, "mapCreated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LeafletMapComponent.prototype, "mapElementClicked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LeafletMapComponent.prototype, "mapElementsLoaded", void 0);
    LeafletMapComponent = __decorate([
        Component({
            selector: 'app-leaflet-map',
            templateUrl: './leaflet-map.component.html',
            styleUrls: ['./leaflet-map.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [MinimalHttpBackendClient])
    ], LeafletMapComponent);
    return LeafletMapComponent;
}(AbstractMapComponent));
export { LeafletMapComponent };
//# sourceMappingURL=leaflet-map.component.js.map