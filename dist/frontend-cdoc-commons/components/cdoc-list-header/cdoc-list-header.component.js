"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layout_service_1 = require("../../../angular-commons/services/layout.service");
var forms_1 = require("@angular/forms");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var bean_utils_1 = require("@dps/mycms-commons/dist/commons/utils/bean.utils");
var cdoc_searchresult_1 = require("@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult");
var inline_component_1 = require("../../../angular-commons/components/inline.component");
var CommonDocListHeaderComponent = /** @class */ (function (_super) {
    __extends(CommonDocListHeaderComponent, _super);
    function CommonDocListHeaderComponent(fb, appService, cd) {
        var _this = _super.call(this, cd) || this;
        _this.fb = fb;
        _this.appService = appService;
        _this.cd = cd;
        _this.autoPlayAllowed = false;
        _this.Layout = layout_service_1.Layout;
        _this.availableLayouts = [layout_service_1.Layout.THIN, layout_service_1.Layout.FLAT, layout_service_1.Layout.SMALL, layout_service_1.Layout.BIG, layout_service_1.Layout.PAGE];
        _this.availableSorts = ['relevance', 'location', 'date', 'dateAsc', 'ratePers', 'distance',
            'dataTechDurDesc', 'dataTechAltDesc', 'dataTechMaxDesc', 'dataTechDistDesc',
            'dataTechDurAsc', 'dataTechAltAsc', 'dataTechMaxAsc', 'dataTechDistAsc'];
        _this.availablePerPage = [1, 10, 20, 50];
        _this.showAutoplay = false;
        _this.pauseAutoplay = false;
        _this.pageChange = new core_1.EventEmitter();
        _this.perPageChange = new core_1.EventEmitter();
        _this.sortChange = new core_1.EventEmitter();
        _this.layoutChange = new core_1.EventEmitter();
        _this.headerFormGroup = _this.fb.group({
            sort: 'relevance',
            perPage: 10,
            layout: layout_service_1.Layout.FLAT
        });
        return _this;
    }
    CommonDocListHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getAppState().subscribe(function (appState) {
            if (appState === generic_app_service_1.AppState.Ready) {
                var config = _this.appService.getAppConfig();
                _this.configureComponent(config);
            }
        });
        this.headerFormGroup = this.fb.group({
            sort: this.sort,
            perPage: this.perPage,
            layout: this.layout
        });
    };
    CommonDocListHeaderComponent.prototype.onShowIntervalNext = function () {
        if (this.pauseAutoplay) {
            return false;
        }
        var page = this.searchResult.searchForm.pageNum + 1;
        if (page < 1) {
            page = 1;
        }
        if (page >= this.searchResult.recordCount) {
            page = 1;
        }
        this.onPageChange(page);
        return false;
    };
    CommonDocListHeaderComponent.prototype.onPageChange = function (page) {
        this.pageChange.emit(page);
    };
    CommonDocListHeaderComponent.prototype.onPerPageChange = function () {
        this.perPageChange.emit(this.headerFormGroup.getRawValue()['perPage']);
    };
    CommonDocListHeaderComponent.prototype.onSortChange = function () {
        this.sortChange.emit(this.headerFormGroup.getRawValue()['sort']);
    };
    CommonDocListHeaderComponent.prototype.onLayoutChange = function () {
        this.layoutChange.emit(this.headerFormGroup.getRawValue()['layout']);
    };
    CommonDocListHeaderComponent.prototype.configureComponent = function (config) {
        if (bean_utils_1.BeanUtils.getValue(config, 'permissions.allowAutoPlay') &&
            bean_utils_1.BeanUtils.getValue(config, 'components.cdoc-listheader.allowAutoplay') + '' === 'true') {
            this.autoPlayAllowed = this.showAutoplay;
        }
    };
    CommonDocListHeaderComponent.prototype.updateData = function () {
        var facets = this.searchResult.facets;
        if (facets !== undefined && facets.facets.get('sorts') !== undefined) {
            this.availableSorts = facets.facets.get('sorts').facet.map(function (facet) {
                return facet[0];
            });
            this.availableSorts.sort();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocListHeaderComponent.prototype, "availableLayouts", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocListHeaderComponent.prototype, "availableSorts", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommonDocListHeaderComponent.prototype, "availablePerPage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", cdoc_searchresult_1.CommonDocSearchResult)
    ], CommonDocListHeaderComponent.prototype, "searchResult", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocListHeaderComponent.prototype, "perPage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommonDocListHeaderComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CommonDocListHeaderComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocListHeaderComponent.prototype, "showAutoplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommonDocListHeaderComponent.prototype, "pauseAutoplay", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListHeaderComponent.prototype, "pageChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListHeaderComponent.prototype, "perPageChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListHeaderComponent.prototype, "sortChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonDocListHeaderComponent.prototype, "layoutChange", void 0);
    CommonDocListHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-cdoc-list-header',
            templateUrl: './cdoc-list-header.component.html',
            styleUrls: ['./cdoc-list-header.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, generic_app_service_1.GenericAppService, core_1.ChangeDetectorRef])
    ], CommonDocListHeaderComponent);
    return CommonDocListHeaderComponent;
}(inline_component_1.AbstractInlineComponent));
exports.CommonDocListHeaderComponent = CommonDocListHeaderComponent;
//# sourceMappingURL=cdoc-list-header.component.js.map