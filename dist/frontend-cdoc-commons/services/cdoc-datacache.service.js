var CommonDocDataCacheService = /** @class */ (function () {
    function CommonDocDataCacheService(cdocDataService) {
        this.cdocDataService = cdocDataService;
        this.recordCache = new Map();
        this.nameCache = new Map();
        this.searchOptions = {
            loadDetailsMode: 'none',
            showFacets: false,
            loadTrack: false,
            showForm: false
        };
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
            _this.cdocDataService.search(resolveableSearchForm, _this.searchOptions)
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
export { CommonDocDataCacheService };
//# sourceMappingURL=cdoc-datacache.service.js.map