var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocListSuggesterService } from '../../../frontend-cdoc-commons/services/cdoc-list-suggester.service';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
var PDocPageDescSuggesterService = /** @class */ (function (_super) {
    __extends(PDocPageDescSuggesterService, _super);
    function PDocPageDescSuggesterService(pDocDataService, appService) {
        var _this = _super.call(this, pDocDataService) || this;
        _this.pDocDataService = pDocDataService;
        _this.appService = appService;
        return _this;
    }
    PDocPageDescSuggesterService.prototype.appendFiltersToListItemSearchForm = function (searchForm, form, environment) {
        searchForm.sort = 'ratePers';
        searchForm.perPage = 20;
        searchForm.type = 'PAGE';
    };
    PDocPageDescSuggesterService.prototype.getConfiguration = function (environment) {
        return BeanUtils.getValue(this.appService.getAppConfig(), 'components.pdoc-page-desc-suggester') || {
            nameReplacements: this.DEFAULT_NAME_REPLACEMENTS,
            listItemTemplate: '- [{{LISTITEM.name}}](pdoc/show/page/{{LISTITEM.id}})\n',
            listItemsFallbackTemplate: '',
            footerTemplate: '\nHier könnte Ihre Werbung stehen :-)\n',
            headingTemplate: '\nInhalt der Seite: {{MAINITEM.name}}\n'
        };
    };
    PDocPageDescSuggesterService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PDocDataService, GenericAppService])
    ], PDocPageDescSuggesterService);
    return PDocPageDescSuggesterService;
}(CommonDocListSuggesterService));
export { PDocPageDescSuggesterService };
//# sourceMappingURL=pdoc-page-desc-suggester.service.js.map