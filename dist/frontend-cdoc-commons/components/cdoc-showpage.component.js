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
import { Layout } from '../../angular-commons/services/layout.service';
import { ErrorResolver } from '../resolver/error.resolver';
import { SectionsPDocRecordResolver } from '../resolver/sections-pdoc-details.resolver';
import { IdValidationRule, KeywordValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { RoutingState } from '../../angular-commons/services/common-routing.service';
import { CommonDocRecordResolver } from '../resolver/cdoc-details.resolver';
import { AbstractPageComponent } from '../../frontend-pdoc-commons/components/pdoc-page.component';
var CommonDocShowpageComponent = /** @class */ (function (_super) {
    __extends(CommonDocShowpageComponent, _super);
    function CommonDocShowpageComponent(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService, angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment) {
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
        _this.flgDescRendered = false;
        _this.idValidationRule = new IdValidationRule(true);
        _this.keywordsValidationRule = new KeywordValidationRule(true);
        _this.Layout = Layout;
        _this.queryParamMap = undefined;
        _this.contentUtils = contentUtils;
        return _this;
    }
    CommonDocShowpageComponent.prototype.configureProcessing = function () {
        var _this = this;
        var me = this;
        this.route.queryParamMap.subscribe(function (value) {
            me.queryParamMap = value;
        });
        this.route.data.subscribe(function (data) {
            me.commonRoutingService.setRoutingState(RoutingState.DONE);
            me.flgDescRendered = false;
            me.configureProcessingOfResolvedData(me.config);
            if (me.processError(data)) {
                return;
            }
            me.record = data.record.data;
            me.pdoc = (data.pdoc ? data.pdoc.data : undefined);
            me.baseSearchUrl = data.baseSearchUrl.data;
            me.doProcessAfterResolvedData({});
            me.setMetaTags(me.config, me.pdoc, me.record);
            me.pageUtils.setMetaLanguage();
            me.cd.markForCheck();
            me.pageUtils.scrollToTop();
            _this.trackingProvider.trackPageView();
        });
    };
    CommonDocShowpageComponent.prototype.renderDesc = function () {
        if (this.flgDescRendered || !this.record) {
            return;
        }
        if (!this.platformService.isClient()) {
            return this.record.descTxt || '';
        }
        if (this.record.descHtml) {
            this.flgDescRendered = this.angularHtmlService.renderHtml('#desc', this.record.descHtml, true);
        }
        else {
            var desc = this.record.descMd ? this.record.descMd : '';
            this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#desc', desc, true);
        }
        return '';
    };
    CommonDocShowpageComponent.prototype.submitBackToSearch = function () {
        this.cdocRoutingService.navigateBackToSearch('#' + this.record.id);
        return false;
    };
    CommonDocShowpageComponent.prototype.submitToLastSearchPredecessor = function () {
        this.cdocRoutingService.navigateToSearchPredecessor();
        return false;
    };
    CommonDocShowpageComponent.prototype.submitToLastSearchSuccessor = function () {
        this.cdocRoutingService.navigateToSearchSuccessor();
        return false;
    };
    CommonDocShowpageComponent.prototype.getBackToSearchUrl = function () {
        return this.cdocRoutingService.getLastSearchUrl() + '#' + this.record.id;
    };
    CommonDocShowpageComponent.prototype.getLastSearchSuccessorUrl = function () {
        return this.cdocRoutingService.getLastSearchUrlSuccessor();
    };
    CommonDocShowpageComponent.prototype.getLastSearchPredecessorUrl = function () {
        return this.cdocRoutingService.getLastSearchUrlPredecessor();
    };
    CommonDocShowpageComponent.prototype.onActionTagEvent = function (event) {
        if (event.result !== undefined) {
            this.record = event.result;
            this.cd.markForCheck();
        }
        return false;
    };
    CommonDocShowpageComponent.prototype.configureComponent = function (config) {
        var componentConfig = this.getComponentConfig(config);
        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
    };
    CommonDocShowpageComponent.prototype.configureProcessingOfResolvedData = function (config) {
    };
    CommonDocShowpageComponent.prototype.doProcessAfterResolvedData = function (config) {
    };
    CommonDocShowpageComponent.prototype.setMetaTags = function (config, pdoc, record) {
        var recordName = this.keywordsValidationRule.sanitize(record.name);
        if (pdoc) {
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSectionShowPage', { title: pdoc.heading, cdoc: recordName }, pdoc.heading + ' ' + recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSectionShowPage', { title: pdoc.heading, teaser: pdoc.teaser, cdoc: recordName }, recordName);
            this.pageUtils.setRobots(false, false);
            var indexableTypes = this.getConfiguredIndexableTypes(config);
            if (pdoc.id === 'start' && indexableTypes.indexOf(record.type) >= 0) {
                this.pageUtils.setRobots(true, true);
            }
            else {
                this.pageUtils.setRobots(false, false);
            }
        }
        else {
            this.pageUtils.setGlobalStyle('', 'sectionStyle');
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocShowPage', { cdoc: recordName }, recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocShowPage', { cdoc: recordName }, recordName);
            this.pageUtils.setRobots(false, false);
        }
    };
    CommonDocShowpageComponent.prototype.setPageLayoutAndStyles = function () {
    };
    CommonDocShowpageComponent.prototype.processError = function (data) {
        var flgCommonDocError = ErrorResolver.isResolverError(data.record);
        var flgPDocError = ErrorResolver.isResolverError(data.pdoc);
        var flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgCommonDocError && !flgPDocError && !flgBaseSearchUrlError) {
            return false;
        }
        var newUrl, msg, code;
        var errorCode;
        if (flgCommonDocError) {
            errorCode = data.record.error.code;
        }
        else {
            errorCode = (flgPDocError ? data.pdoc.error.code : data.baseSearchUrl.error.code);
        }
        var sectionId = (flgPDocError ? data.pdoc.error.data : data.pdoc.data.id);
        var cdocId = (flgCommonDocError ? data.record.error.data : data.record.data.id);
        var cdocName = (flgCommonDocError ? 'name' : data.record.data.name);
        switch (errorCode) {
            case SectionsPDocRecordResolver.ERROR_INVALID_SECTION_ID:
            case CommonDocRecordResolver.ERROR_INVALID_DOC_ID:
                code = ErrorResolver.ERROR_INVALID_ID;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = [this.baseSearchUrl,
                    'show',
                    this.idValidationRule.sanitize(cdocName),
                    this.idValidationRule.sanitize(cdocId)].join('/');
                msg = undefined;
                break;
            case SectionsPDocRecordResolver.ERROR_UNKNOWN_SECTION_ID:
                code = ErrorResolver.ERROR_UNKNOWN_ID;
                this.baseSearchUrl = this.baseSearchUrlDefault;
                newUrl = [this.baseSearchUrl,
                    'show',
                    this.idValidationRule.sanitize(cdocName),
                    this.idValidationRule.sanitize(cdocId)].join('/');
                msg = undefined;
                break;
            case CommonDocRecordResolver.ERROR_UNKNOWN_DOC_ID:
                code = ErrorResolver.ERROR_UNKNOWN_ID;
                if (sectionId && sectionId !== '') {
                    this.baseSearchUrl = ['sections', this.idValidationRule.sanitize(sectionId)].join('/');
                }
                else {
                    this.baseSearchUrl = this.baseSearchUrlDefault;
                }
                newUrl = [this.baseSearchUrl].join('/');
                msg = undefined;
                break;
            case SectionsPDocRecordResolver.ERROR_READING_SECTION_ID:
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
    return CommonDocShowpageComponent;
}(AbstractPageComponent));
export { CommonDocShowpageComponent };
//# sourceMappingURL=cdoc-showpage.component.js.map