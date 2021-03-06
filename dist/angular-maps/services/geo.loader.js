import { LogUtils } from '@dps/mycms-commons/dist/commons/utils/log.utils';
var GeoLoader = /** @class */ (function () {
    function GeoLoader(http, parser) {
        this.http = http;
        this.parser = parser;
    }
    GeoLoader.prototype.loadDataFromUrl = function (url, options) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.http.makeHttpRequest({ method: 'get', url: url, withCredentials: true })
                .then(function onLoaded(res) {
                return resolve(me.parser.parse(res.text(), options));
            }).catch(function onError(error) {
                console.error('loading geofeature failed:' + LogUtils.sanitizeLogMsg(url), error);
                return reject(error);
            });
        });
    };
    GeoLoader.prototype.loadData = function (src, options) {
        var _this = this;
        return new Promise(function (resolve) {
            return resolve(_this.parser.parse(src, options));
        });
    };
    return GeoLoader;
}());
export { GeoLoader };
//# sourceMappingURL=geo.loader.js.map