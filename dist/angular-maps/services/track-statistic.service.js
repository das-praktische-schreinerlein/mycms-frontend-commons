"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_1 = require("leaflet");
var math_utils_1 = require("@dps/mycms-commons/dist/commons/utils/math.utils");
var TrackStatisticService = /** @class */ (function () {
    function TrackStatisticService() {
    }
    TrackStatisticService.prototype.emptyStatistic = function () {
        return {
            altAsc: undefined,
            altDesc: undefined,
            dist: undefined,
            altMin: undefined,
            altMax: undefined,
            altAvg: undefined,
            altStart: undefined,
            altEnd: undefined,
            bounds: undefined,
            posStart: undefined,
            posEnd: undefined,
            dateStart: undefined,
            dateEnd: undefined,
            duration: undefined
        };
    };
    TrackStatisticService.prototype.trackStatisticsForGeoElement = function (geoElement) {
        if (geoElement === undefined || geoElement.points === undefined) {
            return this.emptyStatistic();
        }
        return this.trackStatistics(geoElement.points);
    };
    TrackStatisticService.prototype.trackStatistics = function (ll) {
        var t = {
            altAsc: undefined,
            altDesc: undefined,
            dist: (ll.length > 0 ? 0 : undefined),
            altMin: undefined,
            altMax: undefined,
            altAvg: undefined,
            altStart: undefined,
            altEnd: undefined,
            bounds: leaflet_1.latLngBounds(ll),
            posStart: (ll.length > 0 ? ll[0] : undefined),
            posEnd: (ll.length > 0 ? ll[ll.length - 1] : undefined),
            dateStart: (ll.length > 0 ? ll[0]['time'] : undefined),
            dateEnd: (ll.length > 0 ? ll[ll.length - 1]['time'] : undefined),
            duration: undefined
        };
        var l = null, altSum, altCount = 0;
        for (var i = 0; i < ll.length; i++) {
            var p = ll[i];
            if (p && l) {
                t.dist += l.distanceTo(p);
            }
            if (p.alt !== undefined) {
                if (t.altEnd !== undefined) {
                    var diff = math_utils_1.MathUtils.sub(math_utils_1.MathUtils.round(p.alt), math_utils_1.MathUtils.round(t.altEnd));
                    if (diff > 0) {
                        t.altAsc = (t.altAsc !== undefined ? t.altAsc + diff : diff);
                    }
                    else {
                        t.altDesc = (t.altDesc !== undefined ? t.altDesc - diff : -diff);
                    }
                }
                t.altMin = math_utils_1.MathUtils.min(t.altMin, p.alt);
                t.altMax = math_utils_1.MathUtils.max(t.altMax, p.alt);
                if (t.altStart === undefined) {
                    t.altStart = p.alt;
                }
                t.altEnd = p.alt;
                altSum = math_utils_1.MathUtils.sum(altSum, p.alt);
                altCount++;
            }
            l = p;
        }
        if (altSum > 0) {
            t.altAvg = altSum / altCount;
        }
        if (t.dateEnd !== undefined && t.dateStart !== undefined) {
            t.duration = this.formatMillisToHH24(t.dateEnd.getTime() - t.dateStart.getTime());
        }
        t.altAsc = this.formatM(t.altAsc);
        t.altDesc = this.formatM(t.altDesc);
        t.altAvg = this.formatM(t.altAvg);
        t.altMax = this.formatM(t.altMax);
        t.altMin = this.formatM(t.altMin);
        t.altStart = this.formatM(t.altStart);
        t.altEnd = this.formatM(t.altEnd);
        t.dist = this.formatMToKm(t.dist);
        return t;
    };
    TrackStatisticService.prototype.formatMToKm = function (l) {
        if (l !== undefined) {
            return parseFloat((l / 1000).toFixed(1));
        }
        return undefined;
    };
    TrackStatisticService.prototype.formatM = function (l) {
        if (l !== undefined) {
            return parseInt(l.toFixed(0), 10);
        }
        return undefined;
    };
    TrackStatisticService.prototype.formatMillisToHH24 = function (l) {
        if (l !== undefined) {
            return parseFloat((l / 1000 / 60 / 60).toFixed(1));
        }
        return undefined;
    };
    return TrackStatisticService;
}());
exports.TrackStatisticService = TrackStatisticService;
//# sourceMappingURL=track-statistic.service.js.map