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
import { AbstractPageComponent } from '../../angular-commons/components/abstract-page.component';
import { IdValidationRule, KeywordValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ErrorResolver } from '../resolver/error.resolver';
import { RoutingState } from '../../angular-commons/services/common-routing.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { Layout } from '../../angular-commons/services/layout.service';
import { CommonDocRecordCreateResolver } from '../resolver/cdoc-create.resolver';
import { CommonDocEditformComponentForwardMode } from '../components/cdoc-editform/cdoc-editform.component';
var CommonDocCreatepageComponent = /** @class */ (function (_super) {
    __extends(CommonDocCreatepageComponent, _super);
    function CommonDocCreatepageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, cdocDataService, router) {
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
        _this.router = router;
        _this.idValidationRule = new IdValidationRule(true);
        _this.keywordsValidationRule = new KeywordValidationRule(true);
        _this.CommonDocEditformComponentForwardMode = CommonDocEditformComponentForwardMode;
        _this.Layout = Layout;
        _this.editAllowed = false;
        _this.modal = false;
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
            this.errorResolver.redirectAfterRouterError(ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            me.cd.markForCheck();
            return;
        }
        this.route.data.subscribe(function (data) {
            _this.commonRoutingService.setRoutingState(RoutingState.DONE);
            me.configureProcessingOfResolvedData(_this.config, data.record);
            if (me.processError(data)) {
                return;
            }
            _this.record = data.record.data;
            _this.baseRecord = data.record.sourceData;
            _this.baseSearchUrl = data.baseSearchUrl.data;
            _this.suggestedForwardModes = _this.baseRecord
                ? [CommonDocEditformComponentForwardMode.SHOW,
                    CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT,
                    CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW,
                    CommonDocEditformComponentForwardMode.BACK_TO_SEARCH]
                : [CommonDocEditformComponentForwardMode.SHOW,
                    CommonDocEditformComponentForwardMode.BACK_TO_SEARCH];
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
                case CommonDocEditformComponentForwardMode.BACK_TO_SEARCH:
                    me.cdocRoutingService.navigateBackToSearch('#' + (me.baseRecord ? me.baseRecord.id : cdoc.id));
                    break;
                case CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW:
                    me.cdocRoutingService.navigateToShow(me.baseRecord, cdoc.id);
                    break;
                case CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT:
                    me.cdocRoutingService.navigateToEdit(me.baseRecord, cdoc.id);
                    break;
                case CommonDocEditformComponentForwardMode.SHOW:
                    me.cdocRoutingService.navigateToShow(cdoc, (me.baseRecord ? me.baseRecord.id : undefined));
                    break;
                default:
                    me.cdocRoutingService.navigateToShow(cdoc, (me.baseRecord ? me.baseRecord.id : undefined));
            }
        }, function errorCreate(reason) {
            console.error('create add failed:', reason);
            me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
        });
        return false;
    };
    CommonDocCreatepageComponent.prototype.submitCancelModal = function () {
        this.closeModal();
        return false;
    };
    CommonDocCreatepageComponent.prototype.closeModal = function () {
        var me = this;
        me.router.navigate(['', { outlets: { 'modaledit': null }, primary: '' }], { relativeTo: me.route.parent // <--- PARENT activated route.
        }).then(function (value) {
            me.commonRoutingService.setRoutingState(RoutingState.DONE);
        });
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
        var flgCdocError = ErrorResolver.isResolverError(data.record);
        var flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
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
        switch (errorCode) {
            case CommonDocRecordCreateResolver.ERROR_UNKNOWN_DOC_TYPE:
                code = ErrorResolver.ERROR_UNKNOWN_ID;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = [this.baseSearchUrl].join('/');
                msg = undefined;
                break;
            case GenericAppService.ERROR_APP_NOT_INITIALIZED:
                code = ErrorResolver.ERROR_APP_NOT_INITIALIZED;
                newUrl = undefined;
                msg = undefined;
                break;
            default:
                code = ErrorResolver.ERROR_OTHER;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = undefined;
                msg = undefined;
        }
        this.errorResolver.redirectAfterRouterError(code, newUrl, this.toastr, msg);
        this.cd.markForCheck();
        return true;
    };
    return CommonDocCreatepageComponent;
}(AbstractPageComponent));
export { CommonDocCreatepageComponent };
//# sourceMappingURL=cdoc-createpage.component.js.map