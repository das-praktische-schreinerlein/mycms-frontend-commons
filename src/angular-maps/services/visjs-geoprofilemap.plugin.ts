import {DataSet, Graph3d} from 'vis/index-graph3d';
import {GeoLoader} from './geo.loader';
import {GeoElement} from './geo.parser';

export class VisJsGeoProfileMapPoint {
    x: string;
    y: number;
    z: string;
    style: string;
    id: string;

    constructor(values) {
        this.x = values.x;
        this.y = values.y;
        this.z = values.z;
        this.style = values.style;
        this.id = values.index;
    }
}

export interface VisJsGeoProfileMapDataSource {
    geoLoader: GeoLoader;
    url?: string;
    src?: string;
}

export class VisJsGeoProfileMapStyles {
    public static styles = [
        {
            fill: '#7DC1FF',
            stroke: '#3267D2',
            border: '#3267D2'
        },
        {
            fill: '#ff7726',
            stroke: '#ff1521',
            border: '#ff1521'
        }];
}

Object.defineProperty(Graph3d.prototype, '_redrawBarSizeGraphPoint', { value: function (ctx, point) {
        // calculate size for the bar
        const fraction = (point.point.value - this.valueRange.min) / this.valueRange.range();
        const xWidth = this.xBarWidth / 2 * (fraction * 0.8 + 0.2);
        const yWidth = this.yBarWidth / 2 * (fraction * 0.8 + 0.2);
        let colors;
        const style = point.point.data.style;
        if (style && style < VisJsGeoProfileMapStyles.styles.length) {
            colors = VisJsGeoProfileMapStyles.styles[style];
        } else {
            colors = this._getColorsSize();
        }

        this._redrawBar(ctx, point, xWidth, yWidth, colors.fill, colors.border);
    }
});


export class VisJsGeoProfileMap {
    graph: Graph3d;
    constructor(private dataSources: VisJsGeoProfileMapDataSource[], private element: any, private options: {}) {
        this.initialize();
    }

    protected initialize() {
        if (this.dataSources) {
            this.addData(this.dataSources, this.element, this.options);
        }
    }

    // TODO deprecated
    protected _addData(dataSources: VisJsGeoProfileMapDataSource[], element, options) {
        return this.addData(dataSources, element, options);
    }

    // TODO deprecated
    protected _convertGeoElementsToDataSet(geoElements: GeoElement[], element, options): DataSet<any> {
        return this.convertGeoElementsToDataSet(geoElements, element, options);
    }

    protected addData(dataSources: VisJsGeoProfileMapDataSource[], element, options) {
        const me = this;
        const promises: Promise<GeoElement[]>[] = [];
        for (const dataSource of dataSources) {
            let promise: Promise<GeoElement[]>;
            if (dataSource.src !== undefined && dataSource.src.length > 20) {
                promise = dataSource.geoLoader.loadData(dataSource.src, options);
            } else {
                promise = dataSource.geoLoader.loadDataFromUrl(dataSource.url, options);
            }

            promises.push(promise);
        }

        return Promise.all(promises).then(function onLoaded(arrGeoElements: GeoElement[][]) {
            let allGeoElements: GeoElement[] = [];
            for (const geoElements of arrGeoElements) {
                allGeoElements = allGeoElements.concat(geoElements);
            }
            if (allGeoElements.length <= 0) {
                return;
            }

            const layers = me.convertGeoElementsToDataSet(allGeoElements, element, options);
            if (layers !== undefined) {
                me.graph = new Graph3d(element, layers, options);
            } else {
                console.log('SKIPPED visjs-profilemap: no Dataset');
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for VisJsGeoProfileMap:', error);
        });
    }

    protected convertGeoElementsToDataSet(geoElements: GeoElement[], element, options): DataSet<any> {
        if (!geoElements) {
            return undefined;
        }

        let counter = 0;
        let style = 0;
        const points: VisJsGeoProfileMapPoint[] = [];
        for (let i = 0; i < geoElements.length; i++) {
            const geoElement = geoElements[i];
            if (geoElement === undefined || geoElement.points === undefined) {
                continue;
            }

            for (let p = 0; p < geoElement.points.length; p++) {
                const point = geoElement.points[p];
                if (point.lat && point.lng && point.alt !== undefined) {
                    points.push(new VisJsGeoProfileMapPoint({
                        id: counter++,
                        x: Number(point.lng),
                        y: Number(point.lat),
                        z: Number(point.alt),
                        style: style
                    }));
                } else {
                    // console.trace('SKIPPED visjs-profilemap poin: no values', point);
                }
            }
            style = style + 1;
        }

        if (points.length < 1) {
            return undefined;
        }

        const data = new DataSet<any>();
        points.map(value => data.add(value));

        return data;
    }
}
