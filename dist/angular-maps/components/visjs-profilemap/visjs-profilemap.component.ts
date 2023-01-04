import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GeoLoader} from '../../services/geo.loader';
import {VisJsGeoProfileMap, VisJsGeoProfileMapDataSource} from '../../services/visjs-geoprofilemap.plugin';
import {AbstractMapComponent} from '../abstract-map.component';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {AbstractGeoGpxParser} from '@dps/mycms-commons/dist/geo-commons/services/geogpx.parser';

@Component({
    selector: 'app-visjs-profilemap',
    templateUrl: './visjs-profilemap.component.html',
    styleUrls: ['./visjs-profilemap.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisJsProfileMapComponent extends AbstractMapComponent {

    @Input()
    public flgGenerateNameFromGpx?: boolean;

    constructor(http: MinimalHttpBackendClient) {
        super(http);
    }

    protected renderMap() {
        if (!this.initialized || !this.mapId) {
            return;
        }

        this.mapHeight = this.flgfullScreen ? window.innerHeight + 'px' : this.height;
        const dataSources: VisJsGeoProfileMapDataSource[] = [];
        for (let i = 0; i < this.mapElements.length; i++) {
            const mapElement = this.mapElements[i];
            let trackSrc = mapElement.trackSrc;
            const trackUrl = mapElement.trackUrl;
            const point = mapElement.point;
            // specify options
            let loader: GeoLoader;
            if ((trackSrc === undefined || trackSrc === null) && (trackUrl === undefined || trackUrl === null) && point !== undefined) {
                trackSrc = '{ "track": {' +
                    '"tId":"dummy",' +
                    '"tName":"' + mapElement.name.replace(/[^-a-zA-Z0-9+ .;,:]+/g, '') + '",' +
                    '"color":"Red",' +
                    '"colorIdx":"0",' +
                    '"type":"' + mapElement.type + '",' +
                    '"header":["lat","lon","ele"],' +
                    '"records":[[' + point.lat + ', ' + point.lng + ', ' + (point.alt ? point.alt : 0) + ']]}}';
                loader = this.jsonLoader;
            } else {
                loader = this.determineLoader(mapElement);
            }

            if (loader) {
                dataSources.push({ geoLoader: loader, url: trackUrl, src: trackSrc});
            } else {
                console.error('no loader for mapElement:', mapElement.id, mapElement, trackUrl, trackSrc,
                    this.gpxLoader.isResponsibleForSrc(trackSrc));
            }
        }

        if (dataSources.length > 0) {
            const options = {
                // generateName: this.flgGenerateNameFromGpx,
                width:  '100%',
                height: this.mapHeight,
                style: 'bar-size',
                showPerspective: true,
                showGrid: true,
                showShadow: false,
                keepAspectRatio: true,
                verticalRatio: 0.2,
                xBarWidth: 0.004,
                yBarWidth: 0.004,
                xLabel: 'lat',
                yLabel: 'lon',
                zLabel: 'm',
                cameraPosition: {
                    horizontal: 1.0,
                    vertical: 0.5,
                    distance: 2
                },
                tooltip: function (data) {
                    return 'Hoehe:' +  data.data.z;
                }
            };
            const container = document.getElementById(this.mapId);
            const mapProfileObj = new VisJsGeoProfileMap(dataSources, container, options); // NOSONAR do not remove !!!
        }
    }
}
