import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PlatformService } from '../../../angular-commons/services/platform.service';
import { MapElement } from '../../services/leaflet-geo.plugin';
import { AbstractInlineComponent } from '../../../angular-commons/components/inline.component';
import { MapContentUtils } from '../../services/map-contentutils.service';
import { MapDocRecord } from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';
export declare class MapDocProfileMapComponent extends AbstractInlineComponent {
    protected cd: ChangeDetectorRef;
    private contentUtils;
    private appService;
    private platformService;
    mapElements: MapElement[];
    mapId: string;
    height: string;
    docRecords: MapDocRecord[];
    showImageTrackAndGeoPos?: boolean;
    mapElementsFound: EventEmitter<MapElement[]>;
    constructor(cd: ChangeDetectorRef, contentUtils: MapContentUtils, appService: GenericAppService, platformService: PlatformService);
    renderMap(): void;
    protected updateData(): void;
}
