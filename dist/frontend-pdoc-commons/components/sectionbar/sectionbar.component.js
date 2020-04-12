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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { FormBuilder } from '@angular/forms';
import { ErrorResolver } from '../../../frontend-cdoc-commons/resolver/error.resolver';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { PageUtils } from '../../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
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
        this.idValidationRule = new IdValidationRule(true);
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
            if (ErrorResolver.isResolverError(data.pdoc)) {
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
        Component({
            selector: 'app-sectionbar',
            templateUrl: './sectionbar.component.html',
            styleUrls: ['./sectionbar.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [FormBuilder, ActivatedRoute, PDocDataService,
            CommonRoutingService, ErrorResolver,
            ToastrService, Router, PageUtils,
            ChangeDetectorRef])
    ], SectionBarComponent);
    return SectionBarComponent;
}());
export { SectionBarComponent };
//# sourceMappingURL=sectionbar.component.js.map