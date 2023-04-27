// import untested service for code-coverage
import {AngularCommonsModule} from './angular-commons/angular-commons.module';
import {AngularMapsModule} from './angular-maps/angular-maps.module';
import {FrontendCommonDocCommonsModule} from './frontend-cdoc-commons/frontend-cdoc-commons.module';
import {FrontendSectionCommonsModule} from './frontend-section-commons/frontend-section-commons.module';
import {SectionsModule} from './frontend-section-module/sections.module';

for (const a in [
    AngularCommonsModule,
    AngularMapsModule,
    FrontendCommonDocCommonsModule,
    FrontendSectionCommonsModule,
    SectionsModule
]) {
    console.log('import unused modules for codecoverage', a);
}

describe('Dummy-Test', () => {
    it('should be true', () => {
        expect(true).toBeTruthy();
    });
});
