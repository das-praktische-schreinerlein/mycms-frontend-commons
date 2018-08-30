import { Angulartics2 } from 'angulartics2';
export declare abstract class GenericTrackingService {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    trackPageView(): void;
}
