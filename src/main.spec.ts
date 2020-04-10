// import untested service for code-coverage
import {AngularCommonsModule} from './angular-commons/angular-commons.module';
import {AngularMapsModule} from './angular-maps/angular-maps.module';
import {FrontendCommonDocCommonsModule} from './frontend-cdoc-commons/frontend-cdoc-commons.module';
import {FrontendPDocCommonsModule} from './frontend-pdoc-commons/frontend-pdoc-commons.module';
import {SectionsModule} from './frontend-pdoc-module/sections.module';

for (const a in [
    AngularCommonsModule,
    AngularMapsModule,
    FrontendCommonDocCommonsModule,
    FrontendPDocCommonsModule,
    SectionsModule
]) {
    console.log('import unused modules for codecoverage', a);
}

describe('Dummy-Test', () => {
    it('should be true', () => {
        expect(true).toBeTruthy();
    });
});
