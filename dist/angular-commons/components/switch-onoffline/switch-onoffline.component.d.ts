import { OnInit } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class SwitchOnOfflineComponent implements OnInit {
    private formBuilder;
    private appService;
    onlineStateForm: FormGroup;
    constructor(formBuilder: FormBuilder, appService: GenericAppService);
    ngOnInit(): void;
    onSwitchOffline(): void;
    onSwitchOnline(): void;
}
