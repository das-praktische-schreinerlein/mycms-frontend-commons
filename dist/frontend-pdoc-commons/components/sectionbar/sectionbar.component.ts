import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PDocRecord} from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import {ToastrService} from 'ngx-toastr';
import {StaticPagesDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ResolvedData} from '../../../angular-commons/resolver/resolver.utils';
import {ErrorResolver} from '../../../frontend-cdoc-commons/resolver/error.resolver';
import {IdValidationRule} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {PageUtils} from '../../../angular-commons/services/page.utils';
import {CommonRoutingService} from '../../../angular-commons/services/common-routing.service';

@Component({
    selector: 'app-sectionbar',
    templateUrl: './sectionbar.component.html',
    styleUrls: ['./sectionbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionBarComponent implements OnInit {
    idValidationRule = new IdValidationRule(true);
    pdoc: PDocRecord;
    sections: PDocRecord[] = [];

    public themeFormGroup: FormGroup = this.fb.group({
        theme: undefined
    });

    constructor(public fb: FormBuilder, private route: ActivatedRoute, private pagesDataService: StaticPagesDataService,
                private commonRoutingService: CommonRoutingService, private errorResolver: ErrorResolver,
                private toastr: ToastrService, private router: Router, private pageUtils: PageUtils,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        // Subscribe to route params
        const me = this;
        this.route.data.subscribe(
            (data: { pdoc: ResolvedData<PDocRecord>}) => {
                if (ErrorResolver.isResolverError(data.pdoc)) {
                    // an error occured
                    me.pdoc = undefined;
                    me.themeFormGroup.patchValue({'theme': undefined});
                    me.sections = [];
                    me.cd.markForCheck();
                    return;
                }

                me.pdoc = data.pdoc.data;
                me.themeFormGroup.patchValue({'theme': me.pdoc.theme});

                me.pageUtils.setGlobalStyle(me.pdoc.css, 'sectionStyle');

                me.cd.markForCheck();
                this.pagesDataService.getById('menu', {forceLocalStore: true}).then(function onThemesFound(pdoc: PDocRecord) {
                    me.sections = me.getSubSections(pdoc);
                    me.cd.markForCheck();
                    }).catch(function onNotFound(error) {
                        me.sections = [];
                        me.cd.markForCheck();
                        console.error('show getSection failed:', error);
                    });
            }
        );
    }

    onThemeChange() {
        let url = this.router.url;
        const newUrl = '/sections/' + this.idValidationRule.sanitize(this.themeFormGroup.getRawValue()['theme']);
        url = url.replace('\/sections\/' + this.pdoc.id, newUrl);
        url = url.replace('\/pages\/' + this.pdoc.id, newUrl);
        this.commonRoutingService.navigateByUrl(url);
        return false;
    }

    getSubSections(pdoc: PDocRecord): PDocRecord[] {
        return this.pagesDataService.getSubDocuments(pdoc);
    }

}
