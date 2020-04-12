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
import { GeoLoader } from '../../services/geo.loader';
import { GeoJsonParser } from '../../services/geojson.parser';
import { GeoGpxParser } from '../../services/geogpx.parser';
import { ComponentUtils } from '../../../angular-commons/services/component.utils';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import * as L from 'leaflet';
import { GeoElement, GeoElementType } from '../../services/geo.parser';
var LatLng = L.LatLng;
var LeafletMapComponent = /** @class */ (function () {
    function LeafletMapComponent(http) {
        this.http = http;
        // create the tile layer with correct attribution
        this.osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        this.osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        this.osm = new L.TileLayer(this.osmUrl, {
            minZoom: 1, maxZoom: 16,
            attribution: this.osmAttrib
        });
        this.mapHeight = '390px';
        this.flgfullScreen = false;
        this.bounds = undefined;
        this.centerOnMapElements = undefined;
        this.centerChanged = new EventEmitter();
        this.mapCreated = new EventEmitter();
        this.mapElementClicked = new EventEmitter();
        this.mapElementsLoaded = new EventEmitter();
        this.gpxLoader = new GeoLoader(http, new GeoGpxParser());
        this.jsonLoader = new GeoLoader(http, new GeoJsonParser());
    }
    LeafletMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.renderMap();
    };
    LeafletMapComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && ComponentUtils.hasNgChanged(changes)) {
            this.renderMap();
        }
    };
    LeafletMapComponent.prototype.toggleFullScreen = function () {
        this.flgfullScreen = !this.flgfullScreen;
        this.renderMap();
        var me = this;
        setTimeout(function init() {
            me.map.invalidateSize();
        }, 500);
    };
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
        this.featureGroup = L.markerClusterGroup();
        this.featureGroup.addTo(this.map);
        var _loop_1 = function (i) {
            var mapElement = this_1.mapElements[i];
            if (mapElement.trackUrl || mapElement.trackSrc) {
                var geoFeature = void 0;
                if ((mapElement.trackUrl !== undefined && mapElement.trackUrl.endsWith('.gpx'))
                    || (mapElement.trackSrc !== undefined && mapElement.trackSrc !== null &&
                        (mapElement.trackSrc.indexOf('<trkpt') || mapElement.trackSrc.indexOf('<rpt')))) {
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
                else {
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
        __metadata("design:type", String)
    ], LeafletMapComponent.prototype, "mapId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LeafletMapComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LeafletMapComponent.prototype, "mapElements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LeafletMapComponent.prototype, "centerOnMapElements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", L.LatLng)
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
}());
export { LeafletMapComponent };
//# sourceMappingURL=leaflet-map.component.js.map