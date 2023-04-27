import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ToastrService } from 'ngx-toastr';
import { StaticPagesDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/staticpages-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorResolver } from '../../../frontend-cdoc-commons/resolver/error.resolver';
import { IdValidationRule } from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import { PageUtils } from '../../../angular-commons/services/page.utils';
import { CommonRoutingService } from '../../../angular-commons/services/common-routing.service';
export declare class SectionBarComponent implements OnInit {
    fb: FormBuilder;
    private route;
    private pagesDataService;
    private commonRoutingService;
    private errorResolver;
    private toastr;
    private router;
    private pageUtils;
    private cd;
    idValidationRule: IdValidationRule;
    pdoc: PDocRecord;
    sections: PDocRecord[];
    themeFormGroup: FormGroup;
    constructor(fb: FormBuilder, route: ActivatedRoute, pagesDataService: StaticPagesDataService, commonRoutingService: CommonRoutingService, errorResolver: ErrorResolver, toastr: ToastrService, router: Router, pageUtils: PageUtils, cd: ChangeDetectorRef);
    ngOnInit(): void;
    onThemeChange(): boolean;
    getSubSections(pdoc: PDocRecord): PDocRecord[];
}
