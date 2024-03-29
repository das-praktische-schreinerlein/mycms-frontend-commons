import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PlatformService} from '../../../angular-commons/services/platform.service';
import {MapElement} from '../../services/leaflet-geo.plugin';
import {AbstractInlineComponent} from '../../../angular-commons/components/inline.component';
import {StringUtils} from '@dps/mycms-commons/dist/commons/utils/string.utils';
import {MapContentUtils} from '../../services/map-contentutils.service';
import {MapDocRecord} from '@dps/mycms-commons/dist/geo-commons/model/map-element.types';

@Component({
    selector: 'app-mapdoc-profilemap',
    templateUrl: './mapdoc-profilemap.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapDocProfileMapComponent extends AbstractInlineComponent {
    mapElements: MapElement[] = [];

    @Input()
    public mapId: string;

    @Input()
    public height: string;

    @Input()
    public docRecords: MapDocRecord[];

    @Input()
    public showImageTrackAndGeoPos ? = false;

    @Output()
    public mapElementsFound: EventEmitter<MapElement[]> = new EventEmitter();

    constructor(protected cd: ChangeDetectorRef, private contentUtils: MapContentUtils, private appService: GenericAppService,
                private platformService: PlatformService) {
        super(cd);
    }

    renderMap() {
        if (!this.docRecords) {
            this.mapElements = [];
            return;
        }

        const tmpList: MapElement[] = [];
        for (let i = 0; i < this.docRecords.length; i++) {
            const record =  this.docRecords[i];
            for (const mapElement of this.contentUtils.createMapElementForDocRecord(record, StringUtils.calcCharCodeForListIndex(i + 1),
                this.showImageTrackAndGeoPos)) {
                tmpList.push(mapElement);
            }
        }
        this.mapElements = tmpList;
        this.mapElementsFound.emit(this.mapElements);

        this.cd.markForCheck();
    }

    protected updateData(): void {
        if (this.platformService.isClient()) {
            this.renderMap();
        }
    }
}
