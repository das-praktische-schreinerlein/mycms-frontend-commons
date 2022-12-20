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
import { CommonGeoLoader } from '@dps/mycms-commons/dist/geo-commons/services/geo.loader';
var GeoLoader = /** @class */ (function (_super) {
    __extends(GeoLoader, _super);
    function GeoLoader(http, parser) {
        return _super.call(this, http, parser) || this;
    }
    return GeoLoader;
}(CommonGeoLoader));
export { GeoLoader };
//# sourceMappingURL=geo.loader.js.map