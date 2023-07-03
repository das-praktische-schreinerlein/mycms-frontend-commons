import { ChangeDetectorRef } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { CommonDocActionTagsComponent, CommonDocActionTagsComponentConfig } from '../../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';
import { PDocAlbumService } from '../../services/pdoc-album.service';
export declare class PDocActionTagsComponent extends CommonDocActionTagsComponent {
    constructor(appService: GenericAppService, contentUtils: PDocContentUtils, albumService: PDocAlbumService, cd: ChangeDetectorRef);
    protected getComponentConfig(config: {}): CommonDocActionTagsComponentConfig;
}
