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
var GeoParsedFeature = /** @class */ (function (_super) {
    __extends(GeoParsedFeature, _super);
    function GeoParsedFeature(geoLoader, geoElement, options) {
        var _this = _super.call(this, []) || this;
        _this.geoLoader = geoLoader;
        _this.initialize(geoLoader, geoElement, options);
        return _this;
    }
    GeoParsedFeature.prototype.initialize = function (geoLoader, geoElement, options) {
        this.geoLoader = geoLoader;
        L.Util.setOptions(this, options);
        this._layers = {};
        if (geoElement) {
            this.addGeoData(geoElement, options);
        }
    };
    GeoParsedFeature.prototype.addGeoData = function (geoElement, options) {
        var me = this;
        var promise;
        if (geoElement.trackSrc !== undefined && geoElement.trackSrc.length > 20) {
            promise = this.geoLoader.loadData(geoElement.trackSrc, options);
        }
        else {
            promise = this.geoLoader.loadDataFromUrl(geoElement.trackUrl, options);
        }
        promise.then(function onLoaded(geoElements) {
            var layers = me.convertGeoElementsToLayers(geoElement, geoElements, options);
            if (layers !== undefined) {
                me.addLayer(layers);
                me.fire('loaded', { mapElement: geoElement, layers: layers });
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for leafletmap', error);
        });
    };
    GeoParsedFeature.prototype.convertGeoElementsToLayers = function (gpxElement, geoElements, options) {
        if (!geoElements) {
            this.fire('error');
            return;
        }
        var layers = [];
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            switch (geoElement.type) {
                case geo_parser_1.GeoElementType.WAYPOINT:
                    var point = new L.Marker(geoElement.points[0], {
                        clickable: true,
                        title: gpxElement.type + ': ' + gpxElement.name,
                        icon: new L.DivIcon({ className: 'leaflet-div-icon-point', html: '&#128204;' + gpxElement.name })
                    });
                    layers.push(point);
                    break;
                default:
                    if (geoElements.length > 1
                        && ((gpxElement.type === 'TRACK' && geoElement.type === geo_parser_1.GeoElementType.ROUTE)
                            || (gpxElement.type === 'ROUTE' && geoElement.type === geo_parser_1.GeoElementType.TRACK))) {
                        break;
                    }
                    var line = new L.Polyline(geoElement.points, {});
                    if (gpxElement.popupContent) {
                        line.bindPopup(gpxElement.popupContent);
                    }
                    layers.push(line);
                    if (options['showStartMarker']) {
                        layers.push(new L.Marker(geoElement.points[0], {
                            clickable: true,
                            title: 'Start: ' + gpxElement.name,
                            icon: new L.DivIcon({ className: 'leaflet-div-icon-start', html: '&#128204;S:' + gpxElement.name })
                        }));
                    }
                    if (options['showEndMarker']) {
                        layers.push(new L.Marker(geoElement.points[geoElement.points.length - 1], {
                            clickable: true,
                            title: 'End: ' + gpxElement.name,
                            icon: new L.DivIcon({ className: 'leaflet-div-icon-end', html: '&#128205;E:' + gpxElement.name })
                        }));
                    }
                    break;
            }
        }
        if (!layers.length) {
            return;
        }
        return new L.FeatureGroup(layers);
    };
    return GeoParsedFeature;
}(L.FeatureGroup));
exports.GeoParsedFeature = GeoParsedFeature;
//# sourceMappingURL=leaflet-geo.plugin.js.map