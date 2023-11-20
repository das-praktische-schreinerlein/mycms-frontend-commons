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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PDocCreatepageComponent } from './pdoc-createpage.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PDocContentUtils } from '../../../shared-pdoc/services/pdoc-contentutils.service';
import { ErrorResolver } from '../../../../frontend-cdoc-commons/resolver/error.resolver';
import { PageUtils } from '../../../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../../../angular-commons/services/common-routing.service';
import { AngularMarkdownService } from '../../../../angular-commons/services/angular-markdown.service';
import { AngularHtmlService } from '../../../../angular-commons/services/angular-html.service';
import { GenericTrackingService } from '../../../../angular-commons/services/generic-tracking.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../../angular-commons/services/platform.service';
import { LayoutService } from '../../../../angular-commons/services/layout.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocRoutingService } from '../../../shared-pdoc/services/pdoc-routing.service';
import { COMMON_APP_ENVIRONMENT } from '../../../../frontend-section-commons/common-environment';
var PDocModalCreatepageComponent = /** @class */ (function (_super) {
    __extends(PDocModalCreatepageComponent, _super);
    function PDocModalCreatepageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, pdocDataService, router, environment) {
        var _this = _super.call(this, route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, pdocDataService, router, environment) || this;
        _this.route = route;
        _this.cdocRoutingService = cdocRoutingService;
        _this.toastr = toastr;
        _this.errorResolver = errorResolver;
        _this.pageUtils = pageUtils;
        _this.commonRoutingService = commonRoutingService;
        _this.angularMarkdownService = angularMarkdownService;
        _this.angularHtmlService = angularHtmlService;
        _this.cd = cd;
        _this.trackingProvider = trackingProvider;
        _this.appService = appService;
        _this.platformService = platformService;
        _this.layoutService = layoutService;
        _this.pdocDataService = pdocDataService;
        _this.environment = environment;
        _this.modal = true;
        return _this;
    }
    PDocModalCreatepageComponent.prototype.submitSave = function (values) {
        var me = this;
        this.cdocDataService.add(values).then(function doneDocCreated(cdoc) {
            me.closeModal();
        }, function errorCreate(reason) {
            console.error('create add failed:', reason);
            me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
        });
        return false;
    };
    PDocModalCreatepageComponent = __decorate([
        Component({
            selector: 'app-pdoc-modal-createpage',
            templateUrl: './pdoc-modal-createpage.component.html',
            styleUrls: ['./pdoc-createpage.component.css', '../../../../frontend-cdoc-commons/styles/cdoc-modal-createpage.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(16, Inject(COMMON_APP_ENVIRONMENT)),
        __metadata("design:paramtypes", [ActivatedRoute, PDocRoutingService,
            ToastrService, PDocContentUtils,
            ErrorResolver, PageUtils,
            CommonRoutingService, AngularMarkdownService,
            AngularHtmlService, ChangeDetectorRef,
            GenericTrackingService, GenericAppService,
            PlatformService, LayoutService,
            PDocDataService, Router, Object])
    ], PDocModalCreatepageComponent);
    return PDocModalCreatepageComponent;
}(PDocCreatepageComponent));
export { PDocModalCreatepageComponent };
//# sourceMappingURL=pdoc-modal-createpage.component.js.map