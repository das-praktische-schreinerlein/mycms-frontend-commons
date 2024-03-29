var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { latLngBounds } from 'leaflet';
import { AbstractTrackStatisticService } from '@dps/mycms-commons/dist/geo-commons/services/track-statistic.service';
var TrackStatisticService = /** @class */ (function (_super) {
    __extends(TrackStatisticService, _super);
    function TrackStatisticService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackStatisticService.prototype.getLatLngBounds = function (coords) {
        return latLngBounds(coords);
    };
    TrackStatisticService.prototype.calcDistance = function (from, to) {
        return from.distanceTo(to);
    };
    return TrackStatisticService;
}(AbstractTrackStatisticService));
export { TrackStatisticService };
//# sourceMappingURL=track-statistic.service.js.map