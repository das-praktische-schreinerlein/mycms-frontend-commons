/**
 * inspired by leaflet-plugins
 */
import {GeoLoader} from './geo.loader';
import {GeoElement, GeoElementType} from './geo.parser';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-editable-polyline';

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
    iconPolylineEditor?: L.Icon
    iconEnd?: L.DivIcon;
    featureLayer?: L.Layer;
}

export class GeoParsedFeature extends L.FeatureGroup {
    options: any;
    _layers: {};
    geoLoader: GeoLoader;

    public static convertGeoElementsToLayers(gpxElement: MapElement, geoElements: GeoElement[], options): L.FeatureGroup {
        const layers = [];
        const flags: {
            hasTrack: boolean
            hasRoute: boolean;
        } = {
            hasTrack: false,
            hasRoute: false
        };
        for (let i = 0; i < geoElements.length; i++) {
            const geoElement = geoElements[i];
            flags.hasRoute = flags.hasRoute || geoElement.type === GeoElementType.ROUTE;
            flags.hasTrack = flags.hasTrack || geoElement.type === GeoElementType.TRACK;
        }

        for (let i = 0; i < geoElements.length; i++) {
            const geoElement = geoElements[i];
            const prefix = (gpxElement.code !== undefined ? gpxElement.code + ' ' : '');
            switch (geoElement.type) {
                case GeoElementType.WAYPOINT:
                    let point;
                    point = new L.Marker(geoElement.points[0], {
                        clickable: true,
                        title: gpxElement.title || (prefix + gpxElement.type + ': ' + gpxElement.name),
                        icon: gpxElement.iconStart
                            || new L.DivIcon({className: 'leaflet-div-icon-point', html: '&#128204;' + prefix + gpxElement.name})
                    });
                    layers.push(point);
                    break;
                default:
                    if (geoElements.length > 1
                        && ((gpxElement.type === 'TRACK' && geoElement.type !== GeoElementType.TRACK && flags.hasTrack)
                            || (gpxElement.type === 'ROUTE' && geoElement.type !== GeoElementType.ROUTE && flags.hasRoute))) {
                        break;
                    }

                    const lineOptions: L.PolylineOptions = {};
                    if (gpxElement.color) {
                        lineOptions['color'] = gpxElement.color;
                    }

                    let element;
                    if (options.editable) {
                        lineOptions['pointIcon'] = gpxElement.iconPolylineEditor
                            || new L.DivIcon({className: 'leaflet-div-icon-editorpoint', html: '&#128204;'});
                        lineOptions['newPointIcon'] = gpxElement.iconPolylineEditor
                            || new L.DivIcon({className: 'leaflet-div-icon-neweditorpoint', html: '+'});
                        lineOptions['newPolylines'] = true;
                        // @ts-ignore
                        element = L.Polyline.PolylineEditor(geoElement.points, lineOptions);
                    } else {
                        if (geoElement.type === GeoElementType.AREA) {
                            element = new L.Polygon(geoElement.points, lineOptions);
                            lineOptions['fillOpacity'] = 0.1;
                        } else {
                            element = new L.Polyline(geoElement.points, lineOptions);
                        }
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
                                icon: gpxElement.iconStart ||
                                    new L.DivIcon({className: 'leaflet-div-icon-area', html: '&#128506;' + prefix + gpxElement.name})
                            }));
                        }
                    } else {
                        if (options['showStartMarker']) {
                            layers.push(new L.Marker(geoElement.points[0], {
                                clickable: true,
                                title: gpxElement.title || (prefix + 'Start: ' + gpxElement.name),
                                icon: gpxElement.iconStart ||
                                    new L.DivIcon({className: 'leaflet-div-icon-start', html: '&#128204;' + prefix + 'S:' + gpxElement.name})
                            }));
                        }
                        if (options['showEndMarker']) {
                            layers.push(new L.Marker(geoElement.points[geoElement.points.length - 1], {
                                clickable: true,
                                title: gpxElement.title || (prefix + 'End: ' + gpxElement.name),
                                icon: gpxElement.iconEnd ||
                                    new L.DivIcon({className: 'leaflet-div-icon-end', html: '&#128205;' + prefix + 'E:' + gpxElement.name})
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

    addGeoData(mapElement: MapElement, options) {
        const me = this;

        let promise: Promise<GeoElement[]>;
        if (mapElement.trackSrc !== undefined && mapElement.trackSrc.length > 20) {
            promise = this.geoLoader.loadData(mapElement.trackSrc, options);
        } else {
            promise = this.geoLoader.loadDataFromUrl(mapElement.trackUrl, options);
        }
        promise.then(function onLoaded(geoElements) {
            if (!geoElements) {
                this.fire('error');
                return;
            }
            const layers = GeoParsedFeature.convertGeoElementsToLayers(mapElement, geoElements, options);
            if (layers !== undefined) {
                me.addLayer(layers);
                mapElement.featureLayer = layers;
                me.fire('loaded', { mapElement: mapElement, layers: layers});
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for leafletmap', error);
        });
    }
}
