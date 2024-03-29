import {ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {
    AbstractPageComponent,
    CommonPageComponentComponentConfig
} from '../../angular-commons/components/abstract-page.component';
import {CommonDocContentUtils} from '../services/cdoc-contentutils.service';
import {CommonDocRoutingService} from '../services/cdoc-routing.service';
import {Layout, LayoutService} from '../../angular-commons/services/layout.service';
import {CommonEnvironment} from '../../frontend-section-commons/common-environment';
import {CommonDocRecordResolver} from '../resolver/cdoc-details.resolver';
import {
    IdValidationRule,
    KeywordValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ErrorResolver} from '../resolver/error.resolver';
import {PageUtils} from '../../angular-commons/services/page.utils';
import {CommonRoutingService, RoutingState} from '../../angular-commons/services/common-routing.service';
import {AngularMarkdownService} from '../../angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '../../angular-commons/services/angular-html.service';
import {GenericTrackingService} from '../../angular-commons/services/generic-tracking.service';
import {PlatformService} from '../../angular-commons/services/platform.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {ResolvedData} from '../../angular-commons/resolver/resolver.utils';
import {ActionTagEvent} from './cdoc-actiontags/cdoc-actiontags.component';

export interface CommonDocEditpageComponentConfig extends CommonPageComponentComponentConfig {
    editAllowed: boolean;
}

export abstract class CommonDocEditpageComponent <R extends CommonDocRecord, F extends CommonDocSearchForm,
    S extends CommonDocSearchResult<R, F>, D extends CommonDocDataService<R, F, S>> extends AbstractPageComponent {
    idValidationRule = new IdValidationRule(true);
    keywordsValidationRule = new KeywordValidationRule(true);
    public contentUtils: CommonDocContentUtils;
    public record: R;
    public Layout = Layout;
    pdoc: PDocRecord;
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
            this.pdoc = undefined;

            this.errorResolver.redirectAfterRouterError(ErrorResolver.ERROR_READONLY, undefined, this.toastr, undefined);
            me.cd.markForCheck();
            return;
        }

        this.route.data.subscribe(
            (data: { record: ResolvedData<R>, baseSearchUrl: ResolvedData<string> }) => {
                this.commonRoutingService.setRoutingState(RoutingState.DONE);

                me.configureProcessingOfResolvedData(this.config);
                if (me.processError(data)) {
                    return;
                }

                this.record = data.record.data;
                this.baseSearchUrl = data.baseSearchUrl.data;

                this.doProcessAfterResolvedData(this.config);

                this.setMetaTags(this.config, this.pdoc, this.record);
                this.pageUtils.setMetaLanguage();

                this.cd.markForCheck();
                this.pageUtils.scrollToTop();

                this.trackingProvider.trackPageView();
            });
    }

    abstract getFiltersForType(record: R, type: string): any;

    submitSave(values: {}, backToSearch: boolean) {
        const me = this;

        this.cdocDataService.updateById(values['id'], values).then(function doneUpdateById(cdoc: R) {
                if (backToSearch) {
                    me.cdocRoutingService.navigateBackToSearch('#' + me.record.id);
                } else {
                    me.cdocRoutingService.navigateToShow(cdoc, '');
                }
            },
            function errorCreate(reason: any) {
                console.error('edit updateById failed:', reason);
                me.toastr.error('Es gibt leider Probleme bei der Speichern - am besten noch einmal probieren :-(', 'Oje!');
            }
        );
        return false;
    }

    submitBackToShow() {
        this.cdocRoutingService.navigateToShow(this.record, '');
        return false;
    }

    submitBackToSearch() {
        this.cdocRoutingService.navigateBackToSearch('#' + this.record.id);
        return false;
    }

    getBackToSearchUrl(): string {
        return this.cdocRoutingService.getLastSearchUrl();
    }

    getBackToShowUrl(): string {
        return this.cdocRoutingService.getShowUrl(this.record, '');
    }

    public onActionTagEvent(event: ActionTagEvent) {
        if (event.result !== undefined) {
            this.record = <R>event.result;
            this.cd.markForCheck();
        }

        return false;
    }

    protected abstract getComponentConfig(config: {}): CommonDocEditpageComponentConfig;

    protected configureComponent(config: {}): void {
        const componentConfig = this.getComponentConfig(config);

        this.baseSearchUrl = componentConfig.baseSearchUrl;
        this.baseSearchUrlDefault = componentConfig.baseSearchUrlDefault;
        this.editAllowed = componentConfig.editAllowed;
    }

    protected configureProcessingOfResolvedData(config: {}): void {
    }

    protected doProcessAfterResolvedData(config: {}): void {
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
        const cdocId = (flgCdocError ? data.record.error.data : data.record.data.id);
        const cdocName = (flgCdocError ? 'name' : data.record.data.name);
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
    }
}
