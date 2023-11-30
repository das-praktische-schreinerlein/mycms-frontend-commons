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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PDocSearchForm } from '@dps/mycms-commons/dist/pdoc-commons/model/forms/pdoc-searchform';
import { PDocSearchResult } from '@dps/mycms-commons/dist/pdoc-commons/model/container/pdoc-searchresult';
import { Facets } from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import { PDocSearchFormUtils } from '../../services/pdoc-searchform-utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { PDocDataCacheService } from '../../services/pdoc-datacache.service';
import { SearchFormUtils } from '../../../../angular-commons/services/searchform-utils.service';
import { PDocSearchFormConverter } from '../../services/pdoc-searchform-converter.service';
import { CommonDocSearchformComponent } from '../../../../frontend-cdoc-commons/components/cdoc-searchform/cdoc-searchform.component';
var PDocSearchformComponent = /** @class */ (function (_super) {
    __extends(PDocSearchformComponent, _super);
    function PDocSearchformComponent(sanitizer, fb, searchFormUtils, pdocSearchFormUtils, searchFormConverter, pdocDataCacheService, toastr, cd) {
        var _this = _super.call(this, sanitizer, fb, searchFormUtils, pdocSearchFormUtils, searchFormConverter, pdocDataCacheService, toastr, cd) || this;
        _this.pdocSearchFormUtils = pdocSearchFormUtils;
        _this.optionsSelectFlags = [];
        _this.optionsSelectKey = [];
        _this.optionsSelectLangkeys = [];
        _this.optionsSelectProfiles = [];
        _this.optionsSelectSubType = [];
        _this.optionsSelectTheme = [];
        _this.optionsSelectSortkey = [];
        _this.settingsSelectFlags = _this.defaultSeLectSettings;
        _this.settingsSelectLangkeys = _this.defaultSeLectSettings;
        _this.settingsSelectProfiles = _this.defaultSeLectSettings;
        _this.settingsSelectSubType = _this.defaultSeLectSettings;
        _this.settingsSelectTheme = _this.defaultSeLectSettings;
        _this.settingsSelectSortkey = _this.defaultSeLectSettings;
        _this.textsSelectFlags = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Flags ausgewählt',
            checkedPlural: 'Flags ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.textsSelectLangkeys = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Sprache ausgewählt',
            checkedPlural: 'Sprache ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.textsSelectProfiles = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Profile ausgewählt',
            checkedPlural: 'Profile ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.textsSelectSubType = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Typ ausgewählt',
            checkedPlural: 'Typ ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.textsSelectTheme = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Theme ausgewählt',
            checkedPlural: 'Theme ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.textsSelectSortkey = { checkAll: 'Alle auswählen',
            uncheckAll: 'Alle abwählen',
            checked: 'Gliederung ausgewählt',
            checkedPlural: 'Gliederung ausgewählt',
            searchPlaceholder: 'Find',
            defaultTitle: '',
            allSelected: 'alles' };
        _this.defaultSeLectSettings.dynamicTitleMaxItems = 2;
        return _this;
    }
    PDocSearchformComponent.prototype.createDefaultSearchResult = function () {
        return new PDocSearchResult(new PDocSearchForm({}), 0, undefined, new Facets());
    };
    PDocSearchformComponent.prototype.createDefaultFormGroup = function () {
        return this.fb.group({
            what: [],
            moreFilter: '',
            fulltext: '',
            subtype: [],
            type: [],
            flags: [],
            key: [],
            langkeys: [],
            profiles: [],
            sortkey: [],
            theme: [],
            sort: '',
            perPage: 10,
            pageNum: 1
        });
    };
    PDocSearchformComponent.prototype.updateFormGroup = function (pdocSearchSearchResult) {
        var values = pdocSearchSearchResult.searchForm;
        this.searchFormGroup = this.fb.group({
            what: [(values.what ? values.what.split(/,/) : [])],
            fulltext: values.fulltext,
            moreFilter: values.moreFilter,
            subtype: [(values.subtype ? values.subtype.split(/,/) : [])],
            type: [(values.type ? values.type.split(/,/) : [])],
            flags: [(values.flags ? values.flags.split(/,/) : [])],
            key: [(values.key ? values.key.split(/,/) : [])],
            langkeys: [(values.langkeys ? values.langkeys.split(/,/) : [])],
            profiles: [(values.profiles ? values.profiles.split(/,/) : [])],
            sortkey: [(values.sortkey ? values.sortkey.split(/,/) : [])],
            theme: [(values.theme ? values.theme.split(/,/) : [])],
        });
    };
    PDocSearchformComponent.prototype.updateSelectComponents = function (pdocSearchSearchResult) {
        _super.prototype.updateSelectComponents.call(this, pdocSearchSearchResult);
        var me = this;
        var rawValues = this.searchFormGroup.getRawValue();
        this.optionsSelectFlags = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getFlagsValues(pdocSearchSearchResult), true, [], true), rawValues['flags']);
        this.optionsSelectKey = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getKeyValues(pdocSearchSearchResult), true, [], true), rawValues['key']);
        this.optionsSelectLangkeys = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getLangkeysValues(pdocSearchSearchResult), true, [], true), rawValues['langkeys']);
        this.optionsSelectProfiles = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getProfilesValues(pdocSearchSearchResult), true, [], true), rawValues['profiles']);
        this.optionsSelectSubType = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getSubTypeValues(pdocSearchSearchResult), true, [], true)
            .sort(function (a, b) {
            if (a['count'] < b['count']) {
                return 1;
            }
            if (a['count'] > b['count']) {
                return -1;
            }
            return a.name.localeCompare(b.name);
        }), rawValues['subtype']);
        this.optionsSelectTheme = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getThemeValues(pdocSearchSearchResult), true, [], true), rawValues['theme']);
        this.optionsSelectSortkey = this.searchFormUtils.moveSelectedToTop(this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(this.pdocSearchFormUtils.getSortkeyValues(pdocSearchSearchResult), true, [], true), rawValues['sortkey']);
    };
    PDocSearchformComponent.prototype.updateAvailabilityFlags = function (pdocSearchSearchResult) {
    };
    PDocSearchformComponent.prototype.beforeDoSearchPrepareValues = function (values) {
    };
    PDocSearchformComponent.prototype.updateFormState = function (state) {
        if (state !== undefined) {
            this.showForm = this.showDetails = this.showFulltext = this.showMeta = this.showSpecialFilter = this.showWhat = state;
        }
        else {
            this.showForm = this.showDetails || this.showFulltext || this.showMeta || this.showSpecialFilter || this.showWhat;
        }
        this.changedShowForm.emit(this.showForm);
    };
    PDocSearchformComponent = __decorate([
        Component({
            selector: 'app-pdoc-searchform',
            templateUrl: './pdoc-searchform.component.html',
            styleUrls: ['./pdoc-searchform.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [DomSanitizer, FormBuilder, SearchFormUtils,
            PDocSearchFormUtils, PDocSearchFormConverter,
            PDocDataCacheService, ToastrService, ChangeDetectorRef])
    ], PDocSearchformComponent);
    return PDocSearchformComponent;
}(CommonDocSearchformComponent));
export { PDocSearchformComponent };
//# sourceMappingURL=pdoc-searchform.component.js.map