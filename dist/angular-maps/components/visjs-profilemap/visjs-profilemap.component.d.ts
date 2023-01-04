import { AbstractMapComponent } from '../abstract-map.component';
import { MinimalHttpBackendClient } from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
export declare class VisJsProfileMapComponent extends AbstractMapComponent {
    flgGenerateNameFromGpx?: boolean;
    constructor(http: MinimalHttpBackendClient);
    protected renderMap(): void;
}
