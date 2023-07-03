import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonDocRoutingService} from '../../frontend-cdoc-commons/services/cdoc-routing.service';
import {ToastrModule} from 'ngx-toastr';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {CommonDocContentUtils} from '../../frontend-cdoc-commons/services/cdoc-contentutils.service';
import {BrowserModule} from '@angular/platform-browser';
import {AngularCommonsModule} from '../../angular-commons/angular-commons.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ErrorResolver} from '../../frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '../../angular-commons/services/page.utils';
import {AngularHtmlService} from '../../angular-commons/services/angular-html.service';
import {AngularMarkdownService} from '../../angular-commons/services/angular-markdown.service';
import {CommonRoutingService} from '../../angular-commons/services/common-routing.service';
import {CommonDocSearchFormUtils} from '../../frontend-cdoc-commons/services/cdoc-searchform-utils.service';
import {FrontendCommonDocCommonsModule} from '../../frontend-cdoc-commons/frontend-cdoc-commons.module';
import {LayoutService} from '../../angular-commons/services/layout.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {SharedPDocModule} from '../shared-pdoc/shared-pdoc.module';
import {PDocSearchFormConverter} from '../shared-pdoc/services/pdoc-searchform-converter.service';
import {PDocSearchFormUtils} from '../shared-pdoc/services/pdoc-searchform-utils.service';
import {PDocContentUtils} from '../shared-pdoc/services/pdoc-contentutils.service';
import {PDocSearchFormResolver} from '../shared-pdoc/resolver/pdoc-searchform.resolver';
import {PDocRecordResolver} from '../shared-pdoc/resolver/pdoc-details.resolver';
import {PDocRoutingService} from '../shared-pdoc/services/pdoc-routing.service';
import {PDocDataStore} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.store';
import {PDocShowPageComponent} from './components/pdoc-showpage/pdoc-showpage.component';
import {PDocSearchPageComponent} from './components/pdoc-searchpage/pdoc-searchpage.component';
import {PDocModalShowpageComponent} from './components/pdoc-showpage/pdoc-modal-showpage.component';
import {PDocRoutingModule} from './pdoc-routing.module';

@NgModule({
    declarations: [
        PDocShowPageComponent,
        PDocModalShowpageComponent,
        PDocSearchPageComponent
    ],
    imports: [
        TranslateModule,
        BrowserModule,
        ToastrModule,
        HttpClientModule,
        AngularCommonsModule,
        SharedPDocModule,
        PDocRoutingModule,
        FrontendCommonDocCommonsModule
    ],
    providers: [
        TranslateService,
        CommonRoutingService,
        PDocSearchFormConverter,
        PDocDataStore,
        PDocDataService,
        { provide: CommonDocRoutingService, useClass: PDocRoutingService },
        PDocRoutingService,
        { provide: CommonDocSearchFormUtils, useClass: PDocSearchFormUtils },
        PDocSearchFormUtils,
        SearchParameterUtils,
        { provide: CommonDocContentUtils, useClass: PDocContentUtils },
        PDocContentUtils,
        PDocSearchFormResolver,
        PDocRecordResolver,
        ErrorResolver,
        PageUtils,
        AngularHtmlService,
        AngularMarkdownService,
        LayoutService
    ],
    exports: [
        PDocShowPageComponent,
        PDocModalShowpageComponent,
        PDocSearchPageComponent
    ]
})
export class PDocModule {}
