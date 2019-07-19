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
            velocity: undefined,
            altAscVelocity: undefined,
            altDescVelocity: undefined,
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
            velocity: undefined,
            altAscVelocity: undefined,
            altDescVelocity: undefined,
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
        var l = null, altSum = 0, altCount = 0, fullDuration = 0;
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
            fullDuration = t.dateEnd.getTime() - t.dateStart.getTime();
            t.duration = this.formatMillisToHH24(fullDuration);
        }
        t.altAsc = this.formatM(t.altAsc);
        t.altDesc = this.formatM(t.altDesc);
        t.altAvg = this.formatM(t.altAvg);
        t.altMax = this.formatM(t.altMax);
        t.altMin = this.formatM(t.altMin);
        t.altStart = this.formatM(t.altStart);
        t.altEnd = this.formatM(t.altEnd);
        t.dist = this.formatMToKm(t.dist);
        if (t.dist !== undefined && fullDuration > 0) {
            t.velocity = t.dist / fullDuration * 1000 * 60 * 60;
        }
        if (t.altAsc !== undefined && fullDuration > 0) {
            t.altAscVelocity = this.formatM(t.altAsc / fullDuration * 1000 * 60 * 60);
        }
        if (t.altDesc !== undefined && fullDuration > 0) {
            t.altDescVelocity = this.formatM(t.altDesc / fullDuration * 1000 * 60 * 60);
        }
        return t;
    };
    TrackStatisticService.prototype.mergeStatistics = function (param1, param2) {
        if (param1 === undefined) {
            return param2;
        }
        if (param2 === undefined) {
            return param1;
        }
        var stat1 = param1;
        var stat2 = param2;
        if (stat1.dateStart !== undefined && stat2.dateStart !== undefined && stat1.dateStart.getTime() > stat2.dateStart.getTime()) {
            stat1 = param2;
            stat2 = param1;
        }
        var coords = [];
        if (stat1.bounds !== undefined) {
            coords = coords.concat([stat1.bounds.getNorthEast(), stat1.bounds.getNorthWest(),
                stat1.bounds.getSouthEast(), stat1.bounds.getSouthWest()]);
        }
        if (stat2.bounds !== undefined) {
            coords = coords.concat([stat2.bounds.getNorthEast(), stat2.bounds.getNorthWest(),
                stat2.bounds.getSouthEast(), stat2.bounds.getSouthWest()]);
        }
        var t = {
            altAsc: math_utils_1.MathUtils.sum(stat1.altAsc, stat2.altAsc),
            altDesc: math_utils_1.MathUtils.sum(stat1.altDesc, stat2.altDesc),
            dist: math_utils_1.MathUtils.sum(stat1.dist, stat2.dist),
            velocity: stat1.velocity,
            altAscVelocity: stat1.altAscVelocity,
            altDescVelocity: stat1.altDescVelocity,
            altMin: math_utils_1.MathUtils.min(stat1.altMin, stat2.altMin),
            altMax: math_utils_1.MathUtils.max(stat1.altMax, stat2.altMax),
            altAvg: stat1.altAvg,
            altStart: stat1.altStart !== undefined ? stat1.altStart : stat2.altStart,
            altEnd: stat2.altEnd !== undefined ? stat2.altEnd : stat1.altEnd,
            bounds: leaflet_1.latLngBounds(coords),
            posStart: stat1.posStart !== undefined ? stat1.posStart : stat2.posStart,
            posEnd: stat2.posEnd !== undefined ? stat2.posEnd : stat1.posEnd,
            dateStart: stat1.dateStart !== undefined ? stat1.dateStart : stat2.dateStart,
            dateEnd: stat2.dateEnd !== undefined ? stat2.dateEnd : stat1.dateEnd,
            duration: math_utils_1.MathUtils.sum(stat1.duration, stat2.duration)
        };
        var fullDuration = 0;
        t.altAvg = this.formatM(math_utils_1.MathUtils.sum(t.altMin, t.altMax) / 2);
        if (stat1.dateEnd !== undefined && stat1.dateStart !== undefined) {
            fullDuration = stat1.dateEnd.getTime() - stat1.dateStart.getTime();
        }
        if (stat2.dateEnd !== undefined && stat2.dateStart !== undefined) {
            fullDuration = stat2.dateEnd.getTime() - stat2.dateStart.getTime();
        }
        if (t.dist !== undefined && fullDuration > 0) {
            t.velocity = t.dist / fullDuration * 1000 * 60 * 60;
        }
        if (t.altAsc !== undefined && fullDuration > 0) {
            t.altAscVelocity = this.formatM(t.altAsc / fullDuration * 1000 * 60 * 60);
        }
        if (t.altDesc !== undefined && fullDuration > 0) {
            t.altDescVelocity = this.formatM(t.altDesc / fullDuration * 1000 * 60 * 60);
        }
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