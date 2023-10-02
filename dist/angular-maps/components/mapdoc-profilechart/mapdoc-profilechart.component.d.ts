import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../angular-commons/services/platform.service';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { ChartElement } from '../visjs-profilechart/visjs-profilechart.component';
import { MapContentUtils } from '../../services/map-contentutils.service';
import { MapDocRecord } from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';
export declare class MapDocProfileChartComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    private contentUtils;
    private appService;
    private platformService;
    chartElements: ChartElement[];
    chartId: string;
    height: string;
    docRecords: MapDocRecord[];
    showImageTrackAndGeoPos?: boolean;
    chartElementsFound: EventEmitter<ChartElement[]>;
    constructor(cd: ChangeDetectorRef, contentUtils: MapContentUtils, appService: GenericAppService, platformService: PlatformService);
    renderChart(): void;
    protected updateData(): void;
}
