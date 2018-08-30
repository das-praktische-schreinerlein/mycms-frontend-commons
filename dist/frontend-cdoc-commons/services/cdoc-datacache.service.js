"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonDocDataCacheService = /** @class */ (function () {
    function CommonDocDataCacheService(cdocDataService) {
        this.cdocDataService = cdocDataService;
        this.recordCache = new Map();
        this.nameCache = new Map();
    }
    CommonDocDataCacheService.prototype.resolveNamesForIds = function (ids) {
        var _this = this;
        var resolveableSearchForm = this.cdocDataService.newSearchForm({});
        resolveableSearchForm.moreFilter = '';
        resolveableSearchForm.perPage = 99;
        ids.forEach(function (key) {
            if (!_this.nameCache.has(key)) {
                resolveableSearchForm.moreFilter += key + ',';
            }
        });
        if (resolveableSearchForm.moreFilter === '') {
            return Promise.resolve(this.nameCache);
        }
        var me = this;
        resolveableSearchForm.moreFilter = 'id:' + resolveableSearchForm.moreFilter;
        var result = new Promise(function (resolve, reject) {
            _this.cdocDataService.search(resolveableSearchForm, { showFacets: false, loadTrack: false, showForm: false })
                .then(function doneSearch(resolveableSearchResult) {
                if (resolveableSearchResult !== undefined) {
                    for (var _i = 0, _a = resolveableSearchResult.currentRecords; _i < _a.length; _i++) {
                        var record = _a[_i];
                        me.nameCache.set(record.id.toString(), record.name);
                        me.recordCache.set(record.id.toString(), record);
                    }
                }
                return resolve(me.nameCache);
            }).catch(function errorSearch(reason) {
                console.error('resolve resolveNamesForIds failed:', reason);
                return reject(reason);
            });
        });
        return result;
    };
    return CommonDocDataCacheService;
}());
exports.CommonDocDataCacheService = CommonDocDataCacheService;
//# sourceMappingURL=cdoc-datacache.service.js.map