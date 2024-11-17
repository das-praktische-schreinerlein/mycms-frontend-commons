import { DataSet, Graph3d } from 'vis/dist/vis-graph3d.min';
var VisJsGeoProfileMapPoint = /** @class */ (function () {
    function VisJsGeoProfileMapPoint(values) {
        this.x = values.x;
        this.y = values.y;
        this.z = values.z;
        this.style = values.style;
        this.id = values.index;
    }
    return VisJsGeoProfileMapPoint;
}());
export { VisJsGeoProfileMapPoint };
var VisJsGeoProfileMapStyles = /** @class */ (function () {
    function VisJsGeoProfileMapStyles() {
    }
    VisJsGeoProfileMapStyles.styles = [
        {
            fill: '#7DC1FF',
            stroke: '#3267D2',
            border: '#3267D2'
        },
        {
            fill: '#ff7726',
            stroke: '#ff1521',
            border: '#ff1521'
        }
    ];
    return VisJsGeoProfileMapStyles;
}());
export { VisJsGeoProfileMapStyles };
Object.defineProperty(Graph3d.prototype, '_redrawBarSizeGraphPoint', { value: function (ctx, point) {
        // calculate size for the bar
        var fraction = (point.point.value - this.valueRange.min) / this.valueRange.range();
        var xWidth = this.xBarWidth / 2 * (fraction * 0.8 + 0.2);
        var yWidth = this.yBarWidth / 2 * (fraction * 0.8 + 0.2);
        var colors;
        var style = point.point.data.style;
        if (style && style < VisJsGeoProfileMapStyles.styles.length) {
            colors = VisJsGeoProfileMapStyles.styles[style];
        }
        else {
            colors = this._getColorsSize();
        }
        this._redrawBar(ctx, point, xWidth, yWidth, colors.fill, colors.border);
    }
});
var VisJsGeoProfileMap = /** @class */ (function () {
    function VisJsGeoProfileMap(dataSources, element, options) {
        this.dataSources = dataSources;
        this.element = element;
        this.options = options;
        this.initialize();
    }
    VisJsGeoProfileMap.prototype.initialize = function () {
        if (this.dataSources) {
            this.addData(this.dataSources, this.element, this.options);
        }
    };
    // TODO deprecated
    VisJsGeoProfileMap.prototype._addData = function (dataSources, element, options) {
        return this.addData(dataSources, element, options);
    };
    // TODO deprecated
    VisJsGeoProfileMap.prototype._convertGeoElementsToDataSet = function (geoElements, element, options) {
        return this.convertGeoElementsToDataSet(geoElements, element, options);
    };
    VisJsGeoProfileMap.prototype.addData = function (dataSources, element, options) {
        var me = this;
        var promises = [];
        var _loop_1 = function (dataSource) {
            var promise = void 0;
            if (dataSource.src !== undefined && dataSource.src.length > 20) {
                promise = dataSource.geoLoader.loadData(dataSource.src, options).then(function (result) {
                    return Promise.resolve(result);
                }).catch(function (error) {
                    console.error('error while loading data from src', dataSource.src, error);
                    return Promise.resolve(undefined);
                });
            }
            else {
                promise = dataSource.geoLoader.loadDataFromUrl(dataSource.url, options).then(function (result) {
                    return Promise.resolve(result);
                }).catch(function (error) {
                    console.error('error while loading data from url', dataSource.url, error);
                    return Promise.resolve(undefined);
                });
            }
            promises.push(promise);
        };
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var dataSource = dataSources_1[_i];
            _loop_1(dataSource);
        }
        return Promise.all(promises).then(function onLoaded(arrGeoElements) {
            var allGeoElements = [];
            for (var _i = 0, arrGeoElements_1 = arrGeoElements; _i < arrGeoElements_1.length; _i++) {
                var geoElements = arrGeoElements_1[_i];
                allGeoElements = allGeoElements.concat(geoElements);
            }
            if (allGeoElements.length <= 0) {
                return;
            }
            var layers = me.convertGeoElementsToDataSet(allGeoElements, element, options);
            if (layers !== undefined) {
                me.graph = new Graph3d(element, layers, options);
            }
            else {
                console.log('SKIPPED visjs-profilemap: no Dataset');
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for VisJsGeoProfileMap:', error);
        });
    };
    VisJsGeoProfileMap.prototype.convertGeoElementsToDataSet = function (geoElements, element, options) {
        if (!geoElements) {
            return undefined;
        }
        var counter = 0;
        var style = 0;
        var points = [];
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            if (geoElement === undefined || geoElement.points === undefined) {
                continue;
            }
            for (var p = 0; p < geoElement.points.length; p++) {
                var point = geoElement.points[p];
                if (point.lat && point.lng && point.alt !== undefined) {
                    points.push(new VisJsGeoProfileMapPoint({
                        id: counter++,
                        x: Number(point.lng),
                        y: Number(point.lat),
                        z: Number(point.alt),
                        style: style
                    }));
                }
                else {
                    // console.debug('SKIPPED visjs-profilemap poin: no values', point);
                }
            }
            style = style + 1;
        }
        if (points.length < 1) {
            return undefined;
        }
        var data = new DataSet();
        points.map(function (value) { return data.add(value); });
        return data;
    };
    return VisJsGeoProfileMap;
}());
export { VisJsGeoProfileMap };
//# sourceMappingURL=visjs-geoprofilemap.plugin.js.map