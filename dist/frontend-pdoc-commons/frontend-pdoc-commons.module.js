"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_commons_module_1 = require("../angular-commons/angular-commons.module");
var core_2 = require("@ngx-translate/core");
var angular_2_dropdown_multiselect_1 = require("angular-2-dropdown-multiselect");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var animations_1 = require("@angular/platform-browser/animations");
var pdoc_list_item_flat_component_1 = require("./components/pdoc-list-item-flat/pdoc-list-item-flat.component");
var pdoc_list_component_1 = require("./components/pdoc-list/pdoc-list.component");
var pdoc_list_item_component_1 = require("./components/pdoc-list-item/pdoc-list-item.component");
var sectionbar_component_1 = require("./components/sectionbar/sectionbar.component");
var section_component_1 = require("./components/section/section.component");
var router_1 = require("@angular/router");
var section_page_component_1 = require("./components/sectionpage/section-page.component");
var FrontendPDocCommonsModule = /** @class */ (function () {
    function FrontendPDocCommonsModule() {
    }
    FrontendPDocCommonsModule = __decorate([
        core_1.NgModule({
            declarations: [
                pdoc_list_component_1.PDocListComponent,
                pdoc_list_item_component_1.PDocListItemComponent,
                pdoc_list_item_flat_component_1.PDocListItemFlatComponent,
                section_component_1.SectionComponent,
                sectionbar_component_1.SectionBarComponent,
                section_page_component_1.SectionPageComponent
            ],
            imports: [
                ng_bootstrap_1.NgbModule,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule,
                core_2.TranslateModule,
                router_1.RouterModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular_commons_module_1.AngularCommonsModule
            ],
            exports: [
                pdoc_list_component_1.PDocListComponent,
                pdoc_list_item_component_1.PDocListItemComponent,
                pdoc_list_item_flat_component_1.PDocListItemFlatComponent,
                section_component_1.SectionComponent,
                sectionbar_component_1.SectionBarComponent,
                section_page_component_1.SectionPageComponent
            ]
        })
    ], FrontendPDocCommonsModule);
    return FrontendPDocCommonsModule;
}());
exports.FrontendPDocCommonsModule = FrontendPDocCommonsModule;
//# sourceMappingURL=frontend-pdoc-commons.module.js.map