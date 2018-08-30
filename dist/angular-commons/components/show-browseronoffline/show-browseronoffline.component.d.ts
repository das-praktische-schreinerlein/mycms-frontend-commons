import { OnInit } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
export declare class ShowBrowserOnOfflineComponent implements OnInit {
    private appService;
    onlineState: string;
    constructor(appService: GenericAppService);
    ngOnInit(): void;
}
