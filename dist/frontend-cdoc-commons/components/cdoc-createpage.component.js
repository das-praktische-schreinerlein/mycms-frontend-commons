"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pdoc_page_component_1 = require("../../frontend-pdoc-commons/components/pdoc-page.component");
var generic_validator_util_1 = require("@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util");
var error_resolver_1 = require("../resolver/error.resolver");
var common_routing_service_1 = require("../../angular-commons/services/common-routing.service");
var generic_app_service_1 = require("@dps/mycms-commons/dist/commons/services/generic-app.service");
var layout_service_1 = require("../../angular-commons/services/layout.service");
var cdoc_create_resolver_1 = require("../resolver/cdoc-create.resolver");
var cdoc_editform_component_1 = require("../components/cdoc-editform/cdoc-editform.component");
var CommonDocCreatepageComponent = /** @class */ (function (_super) {
    __extends(CommonDocCreatepageComponent, _super);
    function CommonDocCreatepageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, cdocDataService) {
        var _this = _super.call(this, route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment) || this;
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
        _this.environment = environment;
        _this.cdocDataService = cdocDataService;
        _this.idValidationRule = new generic_validator_util_1.IdValidationRule(true);
        _this.keywordsValidationRule = new generic_validator_util_1.KeywordValidationRule(true);
        _this.CommonDocEditformComponentForwardMode = cdoc_editform_component_1.CommonDocEditformComponentForwardMode;
        _this.Layout = layout_service_1.Layout;
        _this.editAllowed = false;
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocCreatepageComponent.prototype.configureProcessing = function () {
        var _this = this;
        var me = this;
        if (!this.editAllowed) {
            console.warn('cdoc not writable');
            this.record = undefined;
            this.baseRecord = undefined;
            this.pdoc = undefined;
            this.suggestedForwardModes = [];
            this.errorResolver.redirectAfterRouterError(error_resolver_1.ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            me.cd.markForCheck();
            return;
        }
        this.route.data.subscribe(function (data) {
            _this.commonRoutingService.setRoutingState(common_routing_service_1.RoutingState.DONE);
            me.configureProcessingOfResolvedData(_this.config, data.record);
            if (me.processError(data)) {
                return;
            }
            _this.record = data.record.data;
            _this.baseRecord = data.record.sourceData;
            _this.baseSearchUrl = data.baseSearchUrl.data;
            _this.suggestedForwardModes = _this.baseRecord
                ? [cdoc_editform_component_1.CommonDocEditformComponentForwardMode.SHOW,
                    cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT,
                    cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW,
                    cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SEARCH]
                : [cdoc_editform_component_1.CommonDocEditformComponentForwardMode.SHOW,
                    cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SEARCH];
            _this.doProcessAfterResolvedData(_this.config, data.record);
            _this.setMetaTags(_this.config, _this.pdoc, _this.record);
            _this.pageUtils.setMetaLanguage();
            _this.cd.markForCheck();
            _this.pageUtils.scrollToTop();
            _this.trackingProvider.trackPageView();
        });
    };
    CommonDocCreatepageComponent.prototype.submitSave = function (values) {
        var me = this;
        this.cdocDataService.add(values).then(function doneDocCreated(cdoc) {
            me.cdocRoutingService.navigateToShow(cdoc, '');
        }, function errorCreate(reason) {
            console.error('create add failed:', reason);
            me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
        });
        return false;
    };
    CommonDocCreatepageComponent.prototype.submitSaveAndForward = function (returnType) {
        var me = this;
        var values = returnType.result;
        var returnMode = returnType.returnMode;
        this.cdocDataService.add(values).then(function doneDocCreated(cdoc) {
            switch (returnMode) {
                case cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SEARCH:
                    me.cdocRoutingService.navigateBackToSearch('#' + (me.baseRecord ? me.baseRecord.id : cdoc.id));
                    break;
                case cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW:
                    me.cdocRoutingService.navigateToShow(me.baseRecord, cdoc.id);
                    break;
                case cdoc_editform_component_1.CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT:
                    me.cdocRoutingService.navigateToEdit(me.baseRecord, cdoc.id);
                    break;
                case cdoc_editform_component_1.CommonDocEditformComponentForwardMode.SHOW:
                    me.cdocRoutingService.navigateToShow(cdoc, me.baseRecord.id);
                    break;
                default:
                    me.cdocRoutingService.navigateToShow(cdoc, me.baseRecord.id);
            }
        }, function errorCreate(reason) {
            console.error('create add failed:', reason);
            me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
        });
        return false;
    };
    CommonDocCreatepageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.editAllowed = componentConfig.editAllowed;
    };
    CommonDocCreatepageComponent.prototype.configureProcessingOfResolvedData = function (config, resolvedData) {
    };
    CommonDocCreatepageComponent.prototype.doProcessAfterResolvedData = function (config, resolvedData) {
    };
    CommonDocCreatepageComponent.prototype.setMetaTags = function (config, pdoc, record) {
        var recordName = this.keywordsValidationRule.sanitize(this.record.name);
        if (this.pdoc) {
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSectionShowPage', { title: this.pdoc.heading, cdoc: recordName }, this.pdoc.heading + ' ' + recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSectionShowPage', { title: this.pdoc.heading, teaser: this.pdoc.teaser, cdoc: recordName }, recordName);
            this.pageUtils.setRobots(false, false);
        }
        else {
            this.pageUtils.setGlobalStyle('', 'sectionStyle');
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocShowPage', { cdoc: recordName }, recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocShowPage', { cdoc: recordName }, recordName);
            this.pageUtils.setRobots(false, false);
        }
    };
    CommonDocCreatepageComponent.prototype.setPageLayoutAndStyles = function () {
    };
    CommonDocCreatepageComponent.prototype.processError = function (data) {
        var flgCdocError = error_resolver_1.ErrorResolver.isResolverError(data.record);
        var flgBaseSearchUrlError = error_resolver_1.ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgCdocError && !flgBaseSearchUrlError) {
            return false;
        }
        var newUrl, msg, code;
        var errorCode;
        if (flgCdocError) {
            errorCode = data.record.error.code;
        }
        else {
            errorCode = data.baseSearchUrl.error.code;
        }
        var cdocId = (flgCdocError ? data.record.error.data : data.record.data.id);
        var cdocName = (flgCdocError ? 'name' : data.record.data.name);
        switch (errorCode) {
            case cdoc_create_resolver_1.CommonDocRecordCreateResolver.ERROR_UNKNOWN_DOC_TYPE:
                code = error_resolver_1.ErrorResolver.ERROR_UNKNOWN_ID;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = [this.baseSearchUrl].join('/');
                msg = undefined;
                break;
            case generic_app_service_1.GenericAppService.ERROR_APP_NOT_INITIALIZED:
                code = error_resolver_1.ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                newUrl = undefined;
                msg = undefined;
                break;
            default:
                code = error_resolver_1.ErrorResolver.ERROR_OTHER;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = undefined;
                msg = undefined;
        }
        this.errorResolver.redirectAfterRouterError(code, newUrl, this.toastr, msg);
        this.cd.markForCheck();
        return true;
    };
    return CommonDocCreatepageComponent;
}(pdoc_page_component_1.AbstractPageComponent));
exports.CommonDocCreatepageComponent = CommonDocCreatepageComponent;
//# sourceMappingURL=cdoc-createpage.component.js.map