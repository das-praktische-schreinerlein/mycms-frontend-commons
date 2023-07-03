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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { PDocContentUtils } from '../../services/pdoc-contentutils.service';
import { CommonDocActionTagsComponent } from '../../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';
import { BeanUtils } from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import { PDocAlbumService } from '../../services/pdoc-album.service';
var PDocActionTagsComponent = /** @class */ (function (_super) {
    __extends(PDocActionTagsComponent, _super);
    function PDocActionTagsComponent(appService, contentUtils, albumService, cd) {
        return _super.call(this, appService, contentUtils, albumService, cd) || this;
    }
    PDocActionTagsComponent.prototype.getComponentConfig = function (config) {
        if (BeanUtils.getValue(config, 'components.pdoc-actions.actionTags')) {
            return {
                tagConfigs: config['components']['pdoc-actions']['actionTags']
            };
        }
        else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    };
    PDocActionTagsComponent = __decorate([
        Component({
            selector: 'app-pdoc-actiontags',
            templateUrl: '../../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component.html',
            styleUrls: ['../../../../frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GenericAppService, PDocContentUtils,
            PDocAlbumService,
            ChangeDetectorRef])
    ], PDocActionTagsComponent);
    return PDocActionTagsComponent;
}(CommonDocActionTagsComponent));
export { PDocActionTagsComponent };
//# sourceMappingURL=pdoc-actiontags.component.js.map