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
var router_1 = require("@angular/router");
var ngx_toastr_1 = require("ngx-toastr");
var pdoc_data_service_1 = require("@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service");
var forms_1 = require("@angular/forms");
var error_resolver_1 = require("../../../frontend-cdoc-commons/resolver/error.resolver");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var page_utils_1 = require("../../../angular-commons/services/page.utils");
var common_routing_service_1 = require("../../../angular-commons/services/common-routing.service");
var SectionBarComponent = /** @class */ (function () {
    function SectionBarComponent(fb, route, pdocDataService, commonRoutingService, errorResolver, toastr, router, pageUtils, cd) {
        this.fb = fb;
        this.route = route;
        this.pdocDataService = pdocDataService;
        this.commonRoutingService = commonRoutingService;
        this.errorResolver = errorResolver;
        this.toastr = toastr;
        this.router = router;
        this.pageUtils = pageUtils;
        this.cd = cd;
        this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        this.sections = [];
        this.themeFormGroup = this.fb.group({
            theme: undefined
        });
    }
    SectionBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to route params
        var me = this;
        this.route.data.subscribe(function (data) {
            if (error_resolver_1.ErrorResolver.isResolverError(data.pdoc)) {
                // an error occured
                me.pdoc = undefined;
                me.themeFormGroup.patchValue({ 'theme': undefined });
                me.sections = [];
                me.cd.markForCheck();
                return;
            }
            me.pdoc = data.pdoc.data;
            me.themeFormGroup.patchValue({ 'theme': me.pdoc.theme });
            me.pageUtils.setGlobalStyle(me.pdoc.css, 'sectionStyle');
            me.cd.markForCheck();
            _this.pdocDataService.getById('menu', { forceLocalStore: true }).then(function onThemesFound(pdoc) {
                me.sections = me.getSubSections(pdoc);
                me.cd.markForCheck();
            }).catch(function onNotFound(error) {
                me.sections = [];
                me.cd.markForCheck();
                console.error('show getSection failed:', error);
            });
        });
    };
    SectionBarComponent.prototype.onThemeChange = function () {
        var url = this.router.url;
        var newUrl = '/sections/' + this.idValidationRule.sanitize(this.themeFormGroup.getRawValue()['theme']);
        url = url.replace('\/sections\/' + this.pdoc.id, newUrl);
        url = url.replace('\/pages\/' + this.pdoc.id, newUrl);
        this.commonRoutingService.navigateByUrl(url);
        return false;
    };
    SectionBarComponent.prototype.getSubSections = function (pdoc) {
        return this.pdocDataService.getSubDocuments(pdoc);
    };
    SectionBarComponent = __decorate([
        core_1.Component({
            selector: 'app-sectionbar',
            templateUrl: './sectionbar.component.html',
            styleUrls: ['./sectionbar.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, pdoc_data_service_1.PDocDataService,
            common_routing_service_1.CommonRoutingService, error_resolver_1.ErrorResolver,
            ngx_toastr_1.ToastrService, router_1.Router, page_utils_1.PageUtils,
            core_1.ChangeDetectorRef])
    ], SectionBarComponent);
    return SectionBarComponent;
}());
exports.SectionBarComponent = SectionBarComponent;
//# sourceMappingURL=sectionbar.component.js.map