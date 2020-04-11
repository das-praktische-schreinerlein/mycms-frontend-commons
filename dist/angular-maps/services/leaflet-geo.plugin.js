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
var geo_parser_1 = require("./geo.parser");
var L = require("leaflet");
require("leaflet.markercluster");
require("leaflet-editable-polyline");
var GeoParsedFeature = /** @class */ (function (_super) {
    __extends(GeoParsedFeature, _super);
    function GeoParsedFeature(geoLoader, geoElement, options) {
        var _this = _super.call(this, []) || this;
        _this.geoLoader = geoLoader;
        _this.initialize(geoLoader, geoElement, options);
        return _this;
    }
    GeoParsedFeature.convertGeoElementsToLayers = function (gpxElement, geoElements, options) {
        var layers = [];
        var flags = {
            hasTrack: false,
            hasRoute: false
        };
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            flags.hasRoute = flags.hasRoute || geoElement.type === geo_parser_1.GeoElementType.ROUTE;
            flags.hasTrack = flags.hasTrack || geoElement.type === geo_parser_1.GeoElementType.TRACK;
        }
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            var prefix = (gpxElement.code !== undefined ? gpxElement.code + ' ' : '');
            switch (geoElement.type) {
                case geo_parser_1.GeoElementType.WAYPOINT:
                    var point = void 0;
                    point = new L.Marker(geoElement.points[0], {
                        title: gpxElement.title || (prefix + gpxElement.type + ': ' + gpxElement.name),
                        icon: gpxElement.iconStart
                            || new L.DivIcon({ className: 'leaflet-div-icon-point', html: '&#128204;' + prefix + gpxElement.name })
                    });
                    layers.push(point);
                    break;
                default:
                    if (geoElements.length > 1
                        && ((gpxElement.type === 'TRACK' && geoElement.type !== geo_parser_1.GeoElementType.TRACK && flags.hasTrack)
                            || (gpxElement.type === 'ROUTE' && geoElement.type !== geo_parser_1.GeoElementType.ROUTE && flags.hasRoute))) {
                        break;
                    }
                    var lineOptions = {};
                    if (gpxElement.color) {
                        lineOptions['color'] = gpxElement.color;
                    }
                    var element = void 0;
                    if (options.editable) {
                        lineOptions['pointIcon'] = gpxElement.iconPolylineEditor
                            || new L.DivIcon({ className: 'leaflet-div-icon-editorpoint', html: '&#128204;' });
                        lineOptions['newPointIcon'] = gpxElement.iconPolylineEditor
                            || new L.DivIcon({ className: 'leaflet-div-icon-neweditorpoint', html: '+' });
                        lineOptions['newPolylines'] = true;
                        // @ts-ignore
                        element = L.Polyline.PolylineEditor(geoElement.points, lineOptions);
                    }
                    else {
                        if (geoElement.type === geo_parser_1.GeoElementType.AREA) {
                            element = new L.Polygon(geoElement.points, lineOptions);
                            lineOptions['fillOpacity'] = 0.1;
                        }
                        else {
                            element = new L.Polyline(geoElement.points, lineOptions);
                        }
                    }
                    if (gpxElement.popupContent) {
                        element.bindPopup(gpxElement.popupContent);
                    }
                    layers.push(element);
                    if (geoElement.type === geo_parser_1.GeoElementType.AREA) {
                        if (options['showAreaMarker']) {
                            layers.push(new L.Marker(geoElement.points[0], {
                                title: gpxElement.title || (prefix + 'Area: ' + gpxElement.name),
                                icon: gpxElement.iconStart ||
                                    new L.DivIcon({ className: 'leaflet-div-icon-area', html: '&#128506;' + prefix + gpxElement.name })
                            }));
                        }
                    }
                    else {
                        if (options['showStartMarker']) {
                            layers.push(new L.Marker(geoElement.points[0], {
                                title: gpxElement.title || (prefix + 'Start: ' + gpxElement.name),
                                icon: gpxElement.iconStart ||
                                    new L.DivIcon({ className: 'leaflet-div-icon-start', html: '&#128204;' + prefix + 'S:' + gpxElement.name })
                            }));
                        }
                        if (options['showEndMarker']) {
                            layers.push(new L.Marker(geoElement.points[geoElement.points.length - 1], {
                                title: gpxElement.title || (prefix + 'End: ' + gpxElement.name),
                                icon: gpxElement.iconEnd ||
                                    new L.DivIcon({ className: 'leaflet-div-icon-end', html: '&#128205;' + prefix + 'E:' + gpxElement.name })
                            }));
                        }
                    }
                    break;
            }
        }
        if (!layers.length) {
            return;
        }
        return new L.FeatureGroup(layers);
    };
    GeoParsedFeature.prototype.initialize = function (geoLoader, geoElement, options) {
        this.geoLoader = geoLoader;
        L.Util.setOptions(this, options);
        this._layers = {};
        if (geoElement) {
            this.addGeoData(geoElement, options);
        }
    };
    GeoParsedFeature.prototype.addGeoData = function (mapElement, options) {
        var me = this;
        var promise;
        if (mapElement.trackSrc !== undefined && mapElement.trackSrc.length > 20) {
            promise = this.geoLoader.loadData(mapElement.trackSrc, options);
        }
        else {
            promise = this.geoLoader.loadDataFromUrl(mapElement.trackUrl, options);
        }
        promise.then(function onLoaded(geoElements) {
            if (!geoElements) {
                me.fire('error', { mapElement: mapElement });
                return;
            }
            var layers = GeoParsedFeature.convertGeoElementsToLayers(mapElement, geoElements, options);
            if (layers !== undefined) {
                me.addLayer(layers);
                mapElement.featureLayer = layers;
                me.fire('loaded', { mapElement: mapElement, layers: layers });
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for leafletmap', error);
        });
    };
    return GeoParsedFeature;
}(L.FeatureGroup));
exports.GeoParsedFeature = GeoParsedFeature;
//# sourceMappingURL=leaflet-geo.plugin.js.map