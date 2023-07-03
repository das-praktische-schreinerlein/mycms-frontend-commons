import { DomSanitizer } from '@angular/platform-browser';
import { PDocRecord } from '@dps/mycms-commons/dist//pdoc-commons/model/records/pdoc-record';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocRoutingService } from '../../../frontend-cdoc-commons/services/cdoc-routing.service';
import { CommonDocContentUtils, CommonDocContentUtilsConfig, CommonItemData } from '../../../frontend-cdoc-commons/services/cdoc-contentutils.service';
export interface PDocItemData extends CommonItemData {
}
export declare class PDocContentUtils extends CommonDocContentUtils {
    constructor(sanitizer: DomSanitizer, cdocRoutingService: CommonDocRoutingService, appService: GenericAppService);
    getStyleClassForRecord(record: PDocRecord, layout: string): string[];
    getPDocSubItemFiltersForType(record: PDocRecord, type: string, theme: string, minPerPage?: number): any;
    updateItemData(itemData: PDocItemData, record: PDocRecord, layout: string): boolean;
    protected getServiceConfig(): CommonDocContentUtilsConfig;
}
