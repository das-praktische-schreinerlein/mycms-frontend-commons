"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vis_1 = require("vis");
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
exports.VisJsGeoProfileMapPoint = VisJsGeoProfileMapPoint;
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
exports.VisJsGeoProfileMapStyles = VisJsGeoProfileMapStyles;
Object.defineProperty(vis_1.Graph3d.prototype, '_redrawBarSizeGraphPoint', { value: function (ctx, point) {
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
        this._initialize();
    }
    VisJsGeoProfileMap.prototype._initialize = function () {
        if (this.dataSources) {
            this._addData(this.dataSources, this.element, this.options);
        }
    };
    VisJsGeoProfileMap.prototype._addData = function (dataSources, element, options) {
        var me = this;
        var promises = [];
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var dataSource = dataSources_1[_i];
            var promise = void 0;
            if (dataSource.src !== undefined && dataSource.src.length > 20) {
                promise = dataSource.geoLoader.loadData(dataSource.src, options);
            }
            else {
                promise = dataSource.geoLoader.loadDataFromUrl(dataSource.url, options);
            }
            promises.push(promise);
        }
        Promise.all(promises).then(function onLoaded(arrGeoElements) {
            var allGeoElements = [];
            for (var _i = 0, arrGeoElements_1 = arrGeoElements; _i < arrGeoElements_1.length; _i++) {
                var geoElements = arrGeoElements_1[_i];
                allGeoElements = allGeoElements.concat(geoElements);
            }
            if (allGeoElements.length <= 0) {
                return;
            }
            var layers = me._convertGeoElementsToDataSet(allGeoElements, element, options);
            if (layers !== undefined) {
                me.graph = new vis_1.Graph3d(element, layers, options);
            }
        }).catch(function onError(error) {
            console.error('failed to load gpx for VisJsGeoProfileMap:', error);
        });
    };
    VisJsGeoProfileMap.prototype._convertGeoElementsToDataSet = function (geoElements, element, options) {
        var data = new vis_1.DataSet();
        if (!geoElements) {
            return data;
        }
        var counter = 0;
        var style = 0;
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i];
            for (var p = 0; p < geoElement.points.length; p++) {
                var point = geoElement.points[p];
                if (point.lat && point.lng && point.alt !== undefined) {
                    data.add(new VisJsGeoProfileMapPoint({
                        id: counter++,
                        x: point.lng,
                        y: point.lat,
                        z: point.alt,
                        style: style
                    }));
                }
            }
            style = style + 1;
        }
        return data;
    };
    return VisJsGeoProfileMap;
}());
exports.VisJsGeoProfileMap = VisJsGeoProfileMap;
//# sourceMappingURL=visjs-geoprofilemap.plugin.js.map