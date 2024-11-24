import { ChangeDetectorRef } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocODObjectDetailsComponent } from '../cdoc-odobjectdetails/cdoc-odobjectdetails.component';
export declare class CommonDocODObjectRectanglesComponent extends CommonDocODObjectDetailsComponent {
    protected appService: GenericAppService;
    protected cd: ChangeDetectorRef;
    width: number;
    rotateFlag?: boolean;
    constructor(appService: GenericAppService, cd: ChangeDetectorRef);
}
