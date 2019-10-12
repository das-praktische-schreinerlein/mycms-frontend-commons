/**
 * inspired by leaflet-plugins
 */
import {GeoLoader} from './geo.loader';
import {GeoElement, GeoElementType} from './geo.parser';

import * as L from 'leaflet';
import 'leaflet.markercluster';

export interface MapElement {
    id: string;
    code?: string;
    color?: string;
    name: string;
    popupContent: string;
    trackUrl?: string;
    trackSrc?: string;
    point?: L.LatLng;
    type?: string;
    title?: string;
    iconStart?: L.DivIcon;
    iconEnd?: L.DivIcon;
}

export class GeoParsedFeature extends L.FeatureGroup {
    options: any;
    _layers: {};
    layers: {};
    geoLoader: GeoLoader;

    constructor(geoLoader: GeoLoader, geoElement: MapElement, options: {}) {
        super([]);
        this.geoLoader = geoLoader;
        this.initialize(geoLoader, geoElement, options);
    }

    initialize(geoLoader: GeoLoader, geoElement: MapElement, options: {}) {
        this.geoLoader = geoLoader;
        L.Util.setOptions(this, options);
        this._layers = {};

        if (geoElement) {
            this.addGeoData(geoElement, options);
        }
    }

    addGeoData(geoElement: MapElement, options) {
        const me = this;

        let promise: Promise<GeoElement[]>;
        if (geoElement.trackSrc !== undefined && geoElement.trackSrc.length > 20) {
            promise = this.geoLoader.loadData(geoElement.trackSrc, options);
        } else {
            promise = this.geoLoader.loadDataFromUrl(geoElement.trackUrl, options);
        }
        promise.then(function onLoaded(geoElements) {
            const layers = me.convertGeoElementsToLayers(geoElement, geoElements, options);
            if (layers !== undefined) {
                me.addLayer(layers);
                me.fire('loaded', { mapElement: geoElement, layers: layers});
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for leafletmap', error);
        });
    }

    convertGeoElementsToLayers(gpxElement: MapElement, geoElements: GeoElement[], options): L.FeatureGroup {
        if (!geoElements) {
            this.fire('error');
            return;
        }

        const layers = [];
        const availableTypes: {
            hasTrack: boolean
            hasRoute: boolean;
        } = {
            hasTrack: false,
            hasRoute: false
        };
        for (let i = 0; i < geoElements.length; i++) {
            const geoElement = geoElements[i];
            availableTypes.hasRoute = availableTypes.hasRoute || geoElement.type === GeoElementType.ROUTE;
            availableTypes.hasTrack = availableTypes.hasTrack || geoElement.type === GeoElementType.TRACK;
        }

        for (let i = 0; i < geoElements.length; i++) {
            const geoElement = geoElements[i];
            const prefix = (gpxElement.code !== undefined ? gpxElement.code + ' ' : '');
            switch (geoElement.type) {
                case GeoElementType.WAYPOINT:
                    const point = new L.Marker(geoElement.points[0], {
                        clickable: true,
                        title: gpxElement.title || (prefix + gpxElement.type + ': ' + gpxElement.name),
                        icon: gpxElement.iconStart || new L.DivIcon({className: 'leaflet-div-icon-point', html: '&#128204;' + prefix + gpxElement.name})
                    });
                    layers.push(point);
                    break;
                default:
                    if (geoElements.length > 1
                        && ((gpxElement.type === 'TRACK'  && availableTypes.hasTrack && geoElement.type !== GeoElementType.TRACK)
                            || (gpxElement.type === 'ROUTE' && availableTypes.hasRoute && geoElement.type !== GeoElementType.ROUTE))) {
                        // ignore tracks or routes if master-type is available
                        break;
                    }

                    const lineOptions: L.PolylineOptions = {};
                    if (gpxElement.color) {
                        lineOptions['color'] = gpxElement.color;
                    }

                    let element;
                    if (geoElement.type === GeoElementType.AREA) {
                        element = new L.Polygon(geoElement.points, lineOptions)
                        lineOptions['fillOpacity'] = 0.1;
                    } else {
                        element = new L.Polyline(geoElement.points, lineOptions);
                    }
                    if (gpxElement.popupContent) {
                        element.bindPopup(gpxElement.popupContent);
                    }
                    layers.push(element);

                    if (geoElement.type === GeoElementType.AREA) {
                        if (options['showAreaMarker']) {
                            layers.push(new L.Marker(geoElement.points[0], {
                                clickable: true,
                                title: gpxElement.title || (prefix + 'Area: ' + gpxElement.name),
                                icon: gpxElement.iconStart || new L.DivIcon({className: 'leaflet-div-icon-area', html: '&#128506;' + prefix + gpxElement.name})
                            }));
                        }
                    } else {
                        if (options['showStartMarker']) {
                            layers.push(new L.Marker(geoElement.points[0], {
                                clickable: true,
                                title: gpxElement.title || (prefix + 'Start: ' + gpxElement.name),
                                icon: gpxElement.iconStart || new L.DivIcon({className: 'leaflet-div-icon-start', html: '&#128204;' + prefix + 'S:' + gpxElement.name})
                            }));
                        }
                        if (options['showEndMarker']) {
                            layers.push(new L.Marker(geoElement.points[geoElement.points.length - 1], {
                                clickable: true,
                                title: gpxElement.title || (prefix + 'End: ' + gpxElement.name),
                                icon: gpxElement.iconEnd || new L.DivIcon({className: 'leaflet-div-icon-end', html: '&#128205;' + prefix + 'E:' + gpxElement.name})
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
    }
}
