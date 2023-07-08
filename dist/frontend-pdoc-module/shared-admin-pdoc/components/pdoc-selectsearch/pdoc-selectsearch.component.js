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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractInlineComponent } from '../../../../angular-commons/components/inline.component';
import { CommonDocMultiActionManager } from '../../../../frontend-cdoc-commons/services/cdoc-multiaction.manager';
import { GenericAppService } from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import { Router } from '@angular/router';
import { Layout } from '../../../../angular-commons/services/layout.service';
import { PDocActionTagService } from '../../../shared-pdoc/services/pdoc-actiontag.service';
var PDocSelectSearchComponent = /** @class */ (function (_super) {
    __extends(PDocSelectSearchComponent, _super);
    function PDocSelectSearchComponent(cd, appService, actionService, router) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.appService = appService;
        _this.actionService = actionService;
        _this.router = router;
        _this.Layout = Layout;
        _this.selectMultiActionManager = new CommonDocMultiActionManager(_this.appService, _this.actionService);
        _this.selectFilter = undefined;
        _this.modal = false;
        _this.appendSelected = new EventEmitter();
        _this.configureComponent();
        return _this;
    }
    PDocSelectSearchComponent.prototype.onInputChanged = function (value, field) {
        if (field.startsWith('blimblam')) {
        }
        return false;
    };
    PDocSelectSearchComponent.prototype.onCreateNewRecord = function (id) {
        var me = this;
        // open modal dialog
        me.router.navigate([{ outlets: { 'pdocmodaledit': ['pdocmodaledit', 'create', this.type.toUpperCase(), id] } }]).then(function (value) {
            // check for closing modal dialog and routechange -> update facets
            var subscription = me.router.events.subscribe(function (val) {
                subscription.unsubscribe();
            });
        });
        this.onChangeSelectFilter();
        return false;
    };
    PDocSelectSearchComponent.prototype.onRecordClickedOnMap = function (pdoc) {
        if (!this.selectMultiActionManager.isRecordOnMultiActionTag(pdoc)) {
            this.selectMultiActionManager.appendRecordToMultiActionTag(pdoc);
        }
        else {
            this.selectMultiActionManager.removeRecordFromMultiActionTag(pdoc);
        }
        return false;
    };
    PDocSelectSearchComponent.prototype.onChangeSelectFilter = function () {
        this.selectFilter = this.getRecordFilters();
        this.cd.markForCheck();
        return false;
    };
    PDocSelectSearchComponent.prototype.onAppendSelectedRecords = function () {
        var selectedRecords = this.selectMultiActionManager.getSelectedRecords();
        this.appendSelected.emit(selectedRecords);
        for (var _i = 0, selectedRecords_1 = selectedRecords; _i < selectedRecords_1.length; _i++) {
            var selectedRecord = selectedRecords_1[_i];
            this.selectMultiActionManager.removeRecordFromMultiActionTag(selectedRecord);
        }
        return false;
    };
    PDocSelectSearchComponent.prototype.getRecordFilters = function () {
        var filters = {};
        filters['type'] = this.type;
        filters['sort'] = 'distance';
        var fullText = [].concat(this.nameFilterValues)
            .map(function (value) {
            return value && value.length > 0
                ? value.split(' -> ')
                    .pop()
                    .trim()
                : undefined;
        })
            .map(function (value) {
            return value && value.length > 0
                ? value.split(' - ')
                    .pop()
                    .trim()
                : undefined;
        })
            .filter(function (value) { return value !== undefined && value !== 'undefined' && value.length > 0; })
            .join(' OR ');
        if (fullText) {
            filters['fulltext'] = fullText;
        }
        return filters;
    };
    PDocSelectSearchComponent.prototype.configureComponent = function () {
        var actionTag = {
            configAvailability: [],
            flgUseInput: false,
            flgUseSelect: false,
            recordAvailability: [],
            shortName: '',
            showFilter: [],
            name: 'noop',
            key: 'noop',
            type: 'noop',
            multiRecordTag: true
        };
        actionTag['active'] = true;
        actionTag['available'] = true;
        this.selectMultiActionManager.setSelectedMultiActionTags([
            actionTag
        ]);
    };
    PDocSelectSearchComponent.prototype.updateData = function () {
        //this.updateFormComponents();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PDocSelectSearchComponent.prototype, "modal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PDocSelectSearchComponent.prototype, "baseId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PDocSelectSearchComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PDocSelectSearchComponent.prototype, "nameFilterValues", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PDocSelectSearchComponent.prototype, "appendSelected", void 0);
    PDocSelectSearchComponent = __decorate([
        Component({
            selector: 'app-pdoc-selectsearch',
            templateUrl: './pdoc-selectsearch.component.html',
            styleUrls: ['./pdoc-selectsearch.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            GenericAppService,
            PDocActionTagService,
            Router])
    ], PDocSelectSearchComponent);
    return PDocSelectSearchComponent;
}(AbstractInlineComponent));
export { PDocSelectSearchComponent };
//# sourceMappingURL=pdoc-selectsearch.component.js.map