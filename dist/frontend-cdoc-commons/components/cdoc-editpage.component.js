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
import { AbstractPageComponent } from '../../frontend-pdoc-commons/components/pdoc-page.component';
import { Layout } from '../../angular-commons/services/layout.service';
import { CommonDocRecordResolver } from '../resolver/cdoc-details.resolver';
import { IdValidationRule, KeywordValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { ErrorResolver } from '../resolver/error.resolver';
import { RoutingState } from '../../angular-commons/services/common-routing.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
var CommonDocEditpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocEditpageComponent, _super);
    function CommonDocEditpageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment, cdocDataService) {
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
        _this.idValidationRule = new IdValidationRule(true);
        _this.keywordsValidationRule = new KeywordValidationRule(true);
        _this.Layout = Layout;
        _this.editAllowed = false;
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocEditpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        var me = this;
        if (!this.editAllowed) {
            console.warn('cdoc not writable');
            this.record = undefined;
            this.pdoc = undefined;
            this.errorResolver.redirectAfterRouterError(ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            me.cd.markForCheck();
            return;
        }
        this.route.data.subscribe(function (data) {
            _this.commonRoutingService.setRoutingState(RoutingState.DONE);
            me.configureProcessingOfResolvedData(_this.config);
            if (me.processError(data)) {
                return;
            }
            _this.record = data.record.data;
            _this.baseSearchUrl = data.baseSearchUrl.data;
            _this.doProcessAfterResolvedData(_this.config);
            _this.setMetaTags(_this.config, _this.pdoc, _this.record);
            _this.pageUtils.setMetaLanguage();
            _this.cd.markForCheck();
            _this.pageUtils.scrollToTop();
            _this.trackingProvider.trackPageView();
        });
    };
    CommonDocEditpageComponent.prototype.submitSave = function (values, backToSearch) {
        var me = this;
        this.cdocDataService.updateById(values['id'], values).then(function doneUpdateById(cdoc) {
            if (backToSearch) {
                me.cdocRoutingService.navigateBackToSearch('#' + me.record.id);
            }
            else {
                me.cdocRoutingService.navigateToShow(cdoc, '');
            }
        }, function errorCreate(reason) {
            console.error('edit updateById failed:', reason);
            me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
        });
        return false;
    };
    CommonDocEditpageComponent.prototype.submitBackToShow = function () {
        this.cdocRoutingService.navigateToShow(this.record, '');
        return false;
    };
    CommonDocEditpageComponent.prototype.submitBackToSearch = function () {
        this.cdocRoutingService.navigateBackToSearch('#' + this.record.id);
        return false;
    };
    CommonDocEditpageComponent.prototype.getBackToSearchUrl = function () {
        return this.cdocRoutingService.getLastSearchUrl();
    };
    CommonDocEditpageComponent.prototype.getBackToShowUrl = function () {
        return this.cdocRoutingService.getShowUrl(this.record, '');
    };
    CommonDocEditpageComponent.prototype.onActionTagEvent = function (event) {
        if (event.result !== undefined) {
            this.record = event.result;
            this.cd.markForCheck();
        }
        return false;
    };
    CommonDocEditpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.editAllowed = componentConfig.editAllowed;
    };
    CommonDocEditpageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    CommonDocEditpageComponent.prototype.doProcessAfterResolvedData = function (config) {
    };
    CommonDocEditpageComponent.prototype.setMetaTags = function (config, pdoc, record) {
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
    CommonDocEditpageComponent.prototype.setPageLayoutAndStyles = function () {
    };
    CommonDocEditpageComponent.prototype.processError = function (data) {
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
        var cdocId = (flgCdocError ? data.record.error.data : data.record.data.id);
        var cdocName = (flgCdocError ? 'name' : data.record.data.name);
        switch (errorCode) {
            case CommonDocRecordResolver.ERROR_INVALID_DOC_ID:
                code = ErrorResolver.ERROR_INVALID_ID;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = [this.baseSearchUrl,
                    'show',
                    this.idValidationRule.sanitize(cdocName),
                    this.idValidationRule.sanitize(cdocId)].join('/');
                msg = undefined;
                break;
            case CommonDocRecordResolver.ERROR_UNKNOWN_DOC_ID:
                code = ErrorResolver.ERROR_UNKNOWN_ID;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = [this.baseSearchUrl].join('/');
                msg = undefined;
                break;
            case CommonDocRecordResolver.ERROR_READING_DOC_ID:
                code = ErrorResolver.ERROR_WHILE_READING;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = undefined;
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
    return CommonDocEditpageComponent;
}(AbstractPageComponent));
export { CommonDocEditpageComponent };
//# sourceMappingURL=cdoc-editpage.component.js.map