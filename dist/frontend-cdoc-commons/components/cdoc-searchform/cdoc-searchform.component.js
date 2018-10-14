"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var facets_1 = require("@dps/mycms-commons/dist/search-commons/model/container/facets");
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var cdoc_searchform_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform");
var cdoc_searchresult_1 = require("@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult");
var CommonDocSearchformComponent = /** @class */ (function () {
    function CommonDocSearchformComponent(sanitizer, fb, searchFormUtils, cdocSearchFormUtils, searchFormConverter, cdocDataCacheService, toastr, cd) {
        this.sanitizer = sanitizer;
        this.fb = fb;
        this.searchFormUtils = searchFormUtils;
        this.cdocSearchFormUtils = cdocSearchFormUtils;
        this.searchFormConverter = searchFormConverter;
        this.cdocDataCacheService = cdocDataCacheService;
        this.toastr = toastr;
        this.cd = cd;
        this.defaultSeLectSettings = { dynamicTitleMaxItems: 5,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm multiselect-highlight-value',
            containerClasses: 'dropdown-inline fullwidth',
            enableSearch: true,
            showUncheckAll: true };
        this.optionsSelectWhat = [];
        this.optionsSelectType = [];
        this.optionsSelectPlaylists = [];
        this.settingsSelectWhat = this.defaultSeLectSettings;
        this.settingsSelectType = { dynamicTitleMaxItems: 5,
            buttonClasses: 'btn btn-default btn-secondary text-right fullwidth btn-sm multiselect-highlight-value',
            containerClasses: 'dropdown-inline fullwidth',
            enableSearch: false };
        this.settingsSelectPlaylists = this.defaultSeLectSettings;
        this.textsSelectWhat = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Eigenschaft ausgewählt',
            checkedPlural: 'Eigenschaften ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        this.textsSelectType = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Typ ausgewählt',
            checkedPlural: 'Typen ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'Alle' };
        this.textsSelectPlaylists = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Playlist ausgewählt',
            checkedPlural: 'Playlist ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'Alle' };
        this.humanReadableSearchForm = '';
        this.humanReadableSpecialFilter = '';
        this.showDetailsAvailable = true;
        this.showMetaAvailable = true;
        this.width8 = 'col-sm-8';
        this.width4 = 'col-sm-4';
        this.width3 = 'col-sm-3';
        this.width2 = 'col-sm-2';
        this.searchFormLayout = layout_service_1.SearchFormLayout.GRID;
        this.short = false;
        this.showForm = false;
        this.showWhat = this.showForm;
        this.showFulltext = this.showForm;
        this.showDetails = this.showForm;
        this.showMeta = this.showForm;
        this.showSpecialFilter = this.showForm;
        this.search = new core_1.EventEmitter();
        this.changedShowForm = new core_1.EventEmitter();
        this._searchResult = new BehaviorSubject_1.BehaviorSubject(this.createDefaultSearchResult());
        this.searchFormGroup = this.createDefaultFormGroup();
    }
    Object.defineProperty(CommonDocSearchformComponent.prototype, "searchResult", {
        get: function () {
            // get the latest value from _data BehaviorSubject
            return this._searchResult.getValue();
        },
        set: function (value) {
            // set the latest value for _data BehaviorSubject
            this._searchResult.next(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    CommonDocSearchformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._searchResult.subscribe(function (cdocSearchSearchResult) {
            _this.updateSearchForm(cdocSearchSearchResult);
        });
    };
    CommonDocSearchformComponent.prototype.onSubmitSearch = function (event) {
        this.doSearch();
        return false;
    };
    CommonDocSearchformComponent.prototype.onChangeSelect = function (event) {
        this.doSearch();
        return false;
    };
    CommonDocSearchformComponent.prototype.createDefaultSearchResult = function () {
        return new cdoc_searchresult_1.CommonDocSearchResult(new cdoc_searchform_1.CommonDocSearchForm({}), 0, undefined, new facets_1.Facets());
    };
    CommonDocSearchformComponent.prototype.createDefaultFormGroup = function () {
        return this.fb.group({
            what: [],
            moreFilter: '',
            fulltext: '',
            playlists: [],
            type: [],
            sort: '',
            perPage: 10,
            pageNum: 1
        });
    };
    CommonDocSearchformComponent.prototype.updateSearchForm = function (searchSearchResult) {
        if (this.searchFormLayout === layout_service_1.SearchFormLayout.STACKED) {
            this.width8 = 'col-sm-12';
            this.width4 = 'col-sm-12';
            this.width3 = 'col-sm-12';
            this.width2 = 'col-sm-6';
        }
        else {
            this.width8 = 'col-sm-8';
            this.width4 = 'col-sm-4';
            this.width3 = 'col-sm-3';
            this.width2 = 'col-sm-2';
        }
        this.updateFormGroup(searchSearchResult);
        this.updateSelectComponents(searchSearchResult);
        this.updateAvailabilityFlags(searchSearchResult);
        this.updateHumanReadableFiltes(searchSearchResult);
    };
    CommonDocSearchformComponent.prototype.updateFormGroup = function (cdocSearchSearchResult) {
        var values = cdocSearchSearchResult.searchForm;
        this.searchFormGroup = this.fb.group({
            what: [(values.what ? values.what.split(/,/) : [])],
            fulltext: values.fulltext,
            moreFilter: values.moreFilter,
            playlists: [(values.playlists ? values.playlists.split(/,/) : [])],
            type: [(values.type ? values.type.split(/,/) : [])]
        });
    };
    CommonDocSearchformComponent.prototype.updateSelectComponents = function (cdocSearchSearchResult) {
        var rawValues = this.searchFormGroup.getRawValue();
        this.optionsSelectWhat = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getWhatValues(cdocSearchSearchResult), true, [/^kw_/gi], true), rawValues['what']);
        this.optionsSelectType = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getTypeValues(cdocSearchSearchResult), true, [], true)
            .sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (this.cdocSearchFormUtils.getTypeLimit(cdocSearchSearchResult) > 0) {
            this.settingsSelectType.selectionLimit = this.cdocSearchFormUtils.getTypeLimit(cdocSearchSearchResult);
        }
        else {
            this.settingsSelectType.selectionLimit = 0;
        }
        this.settingsSelectType.autoUnselect = this.settingsSelectType.selectionLimit + '' === '1';
        this.optionsSelectPlaylists = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.cdocSearchFormUtils.getPlaylistValues(cdocSearchSearchResult), true, [], true);
    };
    CommonDocSearchformComponent.prototype.updateHumanReadableFiltes = function (cdocSearchSearchResult) {
        var me = this;
        this.humanReadableSpecialFilter = '';
        this.humanReadableSearchForm = '';
        var filters = this.searchFormConverter.searchFormToHumanReadableFilter(cdocSearchSearchResult.searchForm);
        var resolveableFilters = this.searchFormUtils.extractResolvableFilters(filters, this.searchFormConverter.getHrdIds());
        if (resolveableFilters.length > 0) {
            var resolveableIds = this.searchFormUtils.extractResolvableIds(resolveableFilters, this.searchFormConverter.getHrdIds());
            this.cdocDataCacheService.resolveNamesForIds(Array.from(resolveableIds.keys())).then(function (nameCache) {
                me.humanReadableSearchForm = me.sanitizer.bypassSecurityTrustHtml(me.searchFormUtils.searchFormToHumanReadableMarkup(filters, false, nameCache, me.searchFormConverter.getHrdIds()));
                me.humanReadableSpecialFilter = me.searchFormUtils.searchFormToHumanReadableMarkup(resolveableFilters, true, nameCache, me.searchFormConverter.getHrdIds());
                me.cd.markForCheck();
            }).catch(function onRejected(reason) {
                me.toastr.error('Es gibt leider Probleme bei der Suche - am besten noch einmal probieren :-(', 'Oje!');
                console.error('resolve moreFilterIds failed:', reason);
                me.humanReadableSearchForm = me.sanitizer.bypassSecurityTrustHtml(me.searchFormUtils.searchFormToHumanReadableMarkup(filters, false, undefined, me.searchFormConverter.getHrdIds()));
                me.humanReadableSpecialFilter = me.searchFormUtils.searchFormToHumanReadableMarkup(resolveableFilters, true, undefined, me.searchFormConverter.getHrdIds());
                me.cd.markForCheck();
            });
        }
        else {
            this.humanReadableSearchForm = this.sanitizer.bypassSecurityTrustHtml(this.searchFormUtils.searchFormToHumanReadableMarkup(filters, false, undefined, this.searchFormConverter.getHrdIds()));
            this.cd.markForCheck();
        }
    };
    CommonDocSearchformComponent.prototype.updateAvailabilityFlags = function (cdocSearchSearchResult) {
        this.showDetailsAvailable = (this.optionsSelectWhat.length > 0);
        this.showMetaAvailable = (this.optionsSelectPlaylists.length > 0);
    };
    CommonDocSearchformComponent.prototype.removeMoreIdFilters = function () {
        var values = this.searchFormGroup.getRawValue();
        this.searchFormGroup.patchValue({ 'moreFilter': undefined });
        this.search.emit(values);
    };
    CommonDocSearchformComponent.prototype.updateFormState = function (state) {
        if (state !== undefined) {
            this.showForm = this.showDetails = this.showFulltext = this.showMeta = this.showSpecialFilter = this.showWhat = state;
        }
        else {
            this.showForm = this.showDetails || this.showFulltext || this.showMeta || this.showSpecialFilter || this.showWhat;
        }
        this.changedShowForm.emit(this.showForm);
    };
    CommonDocSearchformComponent.prototype.beforeDoSearchPrepareValues = function (values) {
    };
    CommonDocSearchformComponent.prototype.doSearch = function () {
        var values = this.searchFormGroup.getRawValue();
        this.beforeDoSearchPrepareValues({ values: values });
        this.search.emit(values);
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocSearchformComponent.prototype, "searchFormLayout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "short", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showWhat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showFulltext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showDetails", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showMeta", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocSearchformComponent.prototype, "showSpecialFilter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CommonDocSearchformComponent.prototype, "searchResult", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocSearchformComponent.prototype, "search", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocSearchformComponent.prototype, "changedShowForm", void 0);
    return CommonDocSearchformComponent;
}());
exports.CommonDocSearchformComponent = CommonDocSearchformComponent;
//# sourceMappingURL=cdoc-searchform.component.js.map