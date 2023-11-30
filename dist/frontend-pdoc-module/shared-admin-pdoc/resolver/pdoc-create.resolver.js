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
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocDataService } from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import { CommonDocRecordCreateResolver } from '../../../frontend-cdoc-commons/resolver/cdoc-create.resolver';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
var PDocRecordCreateResolver = /** @class */ (function (_super) {
    __extends(PDocRecordCreateResolver, _super);
    function PDocRecordCreateResolver(appService, dataService) {
        var _this = _super.call(this, appService, dataService) || this;
        _this.myAppService = appService;
        return _this;
    }
    PDocRecordCreateResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var res = _super.prototype.resolve.call(this, route, state);
        res.then(function (value) {
            if (value.data !== undefined) {
                var name_1 = value.data.name;
                if (name_1 !== undefined && name_1 !== null) {
                    value.data.name = StringUtils.doReplacements(name_1, _this.getNameReplacements());
                }
            }
            return value;
        });
        return res;
    };
    PDocRecordCreateResolver.prototype.configureDefaultFieldToSet = function (type, fields) {
        switch (type.toLowerCase()) {
            case 'page':
                fields.push('css', 'flags', 'langkeys', 'profiles', 'sortkey', 'subtype', 'subSectionIds', 'theme');
                break;
        }
    };
    PDocRecordCreateResolver.prototype.copyDefaultFields = function (type, pdoc, values) {
        switch (type.toLowerCase()) {
            case 'page':
                if (values['keywords'] === undefined || values['keywords'] === null || values['keywords'] === '') {
                    values['keywords'] = 'KW_TODOKEYWORDS';
                }
        }
        switch (type.toLowerCase()) {
            case 'page':
                if (values['descMd'] === undefined || values['descMd'] === null || values['descMd'] === '') {
                    values['descMd'] = 'TODODESC';
                }
        }
    };
    PDocRecordCreateResolver.prototype.setDefaultFields = function (type, values) {
    };
    PDocRecordCreateResolver.prototype.getNameReplacements = function () {
        return this.getCommonReplacements('components.pdoc-create-resolver.nameReplacements');
    };
    PDocRecordCreateResolver.prototype.getCommonReplacements = function (configKey) {
        var config = this.myAppService.getAppConfig();
        var value = BeanUtils.getValue(config, configKey);
        return StringUtils.createReplacementsFromConfigArray(value);
    };
    PDocRecordCreateResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [GenericAppService, PDocDataService])
    ], PDocRecordCreateResolver);
    return PDocRecordCreateResolver;
}(CommonDocRecordCreateResolver));
export { PDocRecordCreateResolver };
//# sourceMappingURL=pdoc-create.resolver.js.map