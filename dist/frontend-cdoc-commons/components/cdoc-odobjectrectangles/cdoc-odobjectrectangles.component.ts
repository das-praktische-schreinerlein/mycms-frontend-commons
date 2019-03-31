import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocODObjectDetailsComponent} from '../cdoc-odobjectdetails/cdoc-odobjectdetails.component';

@Component({
    selector: 'app-cdoc-odobjectrectangles',
    templateUrl: './cdoc-odobjectrectangles.component.html',
    styleUrls: ['./cdoc-odobjectrectangles.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonDocODObjectRectanglesComponent extends CommonDocODObjectDetailsComponent {

    @Input()
    public width: number;

    constructor(protected appService: GenericAppService, protected cd: ChangeDetectorRef) {
        super(appService, cd);
    }
}
