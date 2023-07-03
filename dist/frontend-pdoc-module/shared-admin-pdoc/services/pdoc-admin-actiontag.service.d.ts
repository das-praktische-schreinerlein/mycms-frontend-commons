import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { CommonDocActionTagServiceConfig } from '../../../frontend-cdoc-commons/services/cdoc-actiontag.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { PDocRecord } from '@dps/mycms-commons/dist/pdoc-commons/model/records/pdoc-record';
import { ActionTagEvent, ActionTagFormResultType, MultiRecordActionTagEvent } from '../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PDocActionTagService } from '../../shared-pdoc/services/pdoc-actiontag.service';
import { PDocAlbumService } from '../../shared-pdoc/services/pdoc-album.service';
export declare class PDocAdminActionTagService extends PDocActionTagService {
    protected modalService: NgbModal;
    protected toastr: ToastrService;
    constructor(router: Router, cdocDataService: PDocDataService, albumService: PDocAlbumService, appService: GenericAppService, modalService: NgbModal, toastr: ToastrService);
    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig;
    protected processActionTagEventUnknown(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<PDocRecord>;
    protected processActionMultiRecordTagEventUnknown(actionTagEvent: MultiRecordActionTagEvent, actionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<PDocRecord[]>;
    protected processActionTagEventReplace(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<PDocRecord>;
    protected processMultiActionTagEventReplace(multiActionTagEvent: MultiRecordActionTagEvent, multiActionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<PDocRecord[]>;
    protected processActionTagEventAssign(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<PDocRecord>;
    protected processMultiActionTagEventAssign(multiActionTagEvent: MultiRecordActionTagEvent, multiActionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<PDocRecord[]>;
    protected processActionTagEventAssignJoin(actionTagEvent: ActionTagEvent, actionTagEventEmitter: EventEmitter<ActionTagEvent>): Promise<PDocRecord>;
    protected processMultiActionTagEventAssignJoin(multiActionTagEvent: MultiRecordActionTagEvent, multiActionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>): Promise<PDocRecord[]>;
    protected processMultiActionFormTagEvent(multiActionTagEvent: MultiRecordActionTagEvent, multiActionTagEventEmitter: EventEmitter<MultiRecordActionTagEvent>, formResultObservable: Subject<ActionTagFormResultType>): Promise<PDocRecord[]>;
}
