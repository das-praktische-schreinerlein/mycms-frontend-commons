import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {AppOnlineState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-switch-onoffline',
    templateUrl: './switch-onoffline.component.html',
    styleUrls: ['./switch-onoffline.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class SwitchOnOfflineComponent implements OnInit {
    public onlineStateForm: FormGroup;

    constructor (private formBuilder: FormBuilder, private appService: GenericAppService) {
    }

    ngOnInit() {
        this.onlineStateForm = this.formBuilder.group({
            'onlineState': 'online'
        });
        this.appService.getAppOnlineState().subscribe(appOnlineState => {
            if (appOnlineState === AppOnlineState.Offline) {
                this.onlineStateForm.patchValue({onlineState: 'offline'});
            } else if (appOnlineState === AppOnlineState.Online) {
                this.onlineStateForm.patchValue({onlineState: 'online'});
            }
        });
    }

    onSwitchOffline() {
        this.appService.doSwitchToOfflineVersion();
    }

    onSwitchOnline() {
        this.appService.doSwitchToOnlineVersion();
    }
}
