import {ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {AbstractPageComponent} from '../../frontend-pdoc-commons/components/pdoc-page.component';
import {
    IdValidationRule,
    KeywordValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {CommonDocContentUtils} from '../services/cdoc-contentutils.service';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {CommonDocRoutingService} from '../services/cdoc-routing.service';
import {ErrorResolver} from '../resolver/error.resolver';
import {PageUtils} from '../../angular-commons/services/page.utils';
import {CommonRoutingService, RoutingState} from '../../angular-commons/services/common-routing.service';
import {AngularMarkdownService} from '../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../angular-commons/services/angular-html.service';
import {GenericTrackingService} from '../../angular-commons/services/generic-tracking.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PlatformService} from '../../angular-commons/services/platform.service';
import {Layout, LayoutService} from '../../angular-commons/services/layout.service';
import {CommonEnvironment} from '../../frontend-pdoc-commons/common-environment';
import {ResolvedData} from '../../angular-commons/resolver/resolver.utils';
import {CommonDocRecordCreateResolver} from '../resolver/cdoc-create.resolver';
import {CommonDocEditformComponentForwardMode, CommonDocEditformComponentReturnType} from '../components/cdoc-editform/cdoc-editform.component';

export interface CommonDocCreatepageComponentConfig {
    baseSearchUrl: string;
    baseSearchUrlDefault: string;
    editAllowed: boolean;
}

export abstract class CommonDocCreatepageComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    idValidationRule = new IdValidationRule(true);
    keywordsValidationRule = new KeywordValidationRule(true);
    public CommonDocEditformComponentForwardMode = CommonDocEditformComponentForwardMode;
    public contentUtils: CommonDocContentUtils;
    public record: R;
    public baseRecord: R;
    public suggestedForwardModes: CommonDocEditformComponentForwardMode[];
    public Layout = Layout;
    pdoc: PDocRecord;
    baseSearchUrl: string;
    editAllowed = false;

    constructor(protected route: ActivatedRoute, protected cdocRoutingService: CommonDocRoutingService,
                protected toastr: ToastrService, contentUtils: CommonDocContentUtils,
                protected errorResolver: ErrorResolver, protected pageUtils: PageUtils,
                protected commonRoutingService: CommonRoutingService, protected angularMarkdownService: AngularMarkdownService,
                protected angularHtmlService: AngularHtmlService, protected cd: ChangeDetectorRef,
                protected trackingProvider: GenericTrackingService, protected appService: GenericAppService,
                protected platformService: PlatformService, protected layoutService: LayoutService,
                protected environment: CommonEnvironment, protected cdocDataService: D) {
        super(route, toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, environment);
        this.contentUtils = contentUtils;
    }

    protected configureProcessing() {
        const me = this;
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

        this.route.data.subscribe(
            (data: { record: ResolvedData<R>, baseSearchUrl: ResolvedData<string> }) => {
                this.commonRoutingService.setRoutingState(RoutingState.DONE);

                me.configureProcessingOfResolvedData(this.config, data.record);
                if (me.processError(data)) {
                    return;
                }

                this.record = data.record.data;
                this.baseRecord = data.record.sourceData;
                this.baseSearchUrl = data.baseSearchUrl.data;
                this.suggestedForwardModes = this.baseRecord
                    ? [CommonDocEditformComponentForwardMode.SHOW,
                        CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT,
                        CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW,
                        CommonDocEditformComponentForwardMode.BACK_TO_SEARCH]
                    : [CommonDocEditformComponentForwardMode.SHOW,
                        CommonDocEditformComponentForwardMode.BACK_TO_SEARCH];

                this.doProcessAfterResolvedData(this.config, data.record);

                this.setMetaTags(this.config, this.pdoc, this.record);
                this.pageUtils.setMetaLanguage();

                this.cd.markForCheck();
                this.pageUtils.scrollToTop();

                this.trackingProvider.trackPageView();
            });
    }

    submitSave(values: {}) {
        const me = this;

        this.cdocDataService.add(values).then(function doneDocCreated(cdoc: R) {
                me.cdocRoutingService.navigateToShow(cdoc, '');
            },
            function errorCreate(reason: any) {
                console.error('create add failed:', reason);
                me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
            }
        );
        return false;
    }

    submitSaveAndForward(returnType: CommonDocEditformComponentReturnType<R>) {
        const me = this;
        const values: {} = returnType.result;
        const returnMode: CommonDocEditformComponentForwardMode = returnType.returnMode;

        this.cdocDataService.add(values).then(
            function doneDocCreated(cdoc: R) {
                switch (returnMode) {
                    case CommonDocEditformComponentForwardMode.BACK_TO_SEARCH:
                        me.cdocRoutingService.navigateBackToSearch('#' + (me.baseRecord ? me.baseRecord.id : cdoc.id));
                        break
                    case CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_SHOW:
                        me.cdocRoutingService.navigateToShow(me.baseRecord, cdoc.id);
                        break
                    case CommonDocEditformComponentForwardMode.BACK_TO_SOURCE_EDIT:
                        me.cdocRoutingService.navigateToEdit(me.baseRecord, cdoc.id);
                        break
                    case CommonDocEditformComponentForwardMode.SHOW:
                        me.cdocRoutingService.navigateToShow(cdoc, me.baseRecord.id);
                        break
                    default:
                        me.cdocRoutingService.navigateToShow(cdoc, me.baseRecord.id);
                }
            },
            function errorCreate(reason: any) {
                console.error('create add failed:', reason);
                me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
            }
        );
        return false;
    }

    protected abstract getComponentConfig(config: {}): CommonDocCreatepageComponentConfig;

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.editAllowed = componentConfig.editAllowed;
    }

    protected configureProcessingOfResolvedData(config: {}, resolvedData: ResolvedData<R>): void {
    }

    protected doProcessAfterResolvedData(config: {}, resolvedData: ResolvedData<R>): void {
    }

    protected setMetaTags(config: {}, pdoc: PDocRecord, record: CommonDocRecord): void {
        const recordName = this.keywordsValidationRule.sanitize(this.record.name);
        if (this.pdoc) {
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocSectionShowPage',
                {title: this.pdoc.heading, cdoc: recordName}, this.pdoc.heading + ' ' + recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocSectionShowPage',
                {title: this.pdoc.heading, teaser: this.pdoc.teaser, cdoc: recordName}, recordName);
            this.pageUtils.setRobots(false, false);
        } else {
            this.pageUtils.setGlobalStyle('', 'sectionStyle');
            this.pageUtils.setTranslatedTitle('meta.title.prefix.cdocShowPage',
                {cdoc: recordName}, recordName);
            this.pageUtils.setTranslatedDescription('meta.desc.prefix.cdocShowPage',
                {cdoc: recordName}, recordName);
            this.pageUtils.setRobots(false, false);
        }
    }

    protected setPageLayoutAndStyles(): void {
    }

    protected processError(data: { record: ResolvedData<R>, baseSearchUrl: ResolvedData<string> }): boolean {
        const flgCdocError = ErrorResolver.isResolverError(data.record);
        const flgBaseSearchUrlError = ErrorResolver.isResolverError(data.baseSearchUrl);
        if (!flgCdocError && !flgBaseSearchUrlError) {
            return false;
        }

        let newUrl, msg, code;
        let errorCode;
        if (flgCdocError) {
            errorCode = data.record.error.code;
        } else {
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
    }
}
