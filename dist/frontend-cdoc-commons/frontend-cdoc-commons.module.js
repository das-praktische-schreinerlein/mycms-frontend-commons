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
var cdoc_list_header_component_1 = require("./components/cdoc-list-header/cdoc-list-header.component");
var cdoc_list_footer_component_1 = require("./components/cdoc-list-footer/cdoc-list-footer.component");
var cdoc_keywordsstate_component_1 = require("./components/cdoc-keywordsstate/cdoc-keywordsstate.component");
var cdoc_keywords_component_1 = require("./components/cdoc-keywords/cdoc-keywords.component");
var cdoc_timetable_component_1 = require("./components/cdoc-timetable/cdoc-timetable.component");
var cdoc_tagcloud_component_1 = require("./components/cdoc-tagcloud/cdoc-tagcloud.component");
var cdoc_typetable_component_1 = require("./components/cdoc-typetable/cdoc-typetable.component");
var cdoc_tagsstate_component_1 = require("./components/cdoc-tagsstate/cdoc-tagsstate.component");
var cdoc_tags_component_1 = require("./components/cdoc-tags/cdoc-tags.component");
var cdoc_videoplayer_component_1 = require("./components/cdoc-videoplayer/cdoc-videoplayer.component");
var cdoc_list_item_component_1 = require("./components/cdoc-list-item/cdoc-list-item.component");
var angular_commons_module_1 = require("../angular-commons/angular-commons.module");
var core_2 = require("@ngx-translate/core");
var angular_2_dropdown_multiselect_1 = require("angular-2-dropdown-multiselect");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var animations_1 = require("@angular/platform-browser/animations");
var cdoc_list_component_1 = require("./components/cdoc-list/cdoc-list.component");
var cdoc_audioplayer_component_1 = require("./components/cdoc-audioplayer/cdoc-audioplayer.component");
var cdoc_actiontags_component_1 = require("./components/cdoc-actiontags/cdoc-actiontags.component");
var FrontendCommonDocCommonsModule = /** @class */ (function () {
    function FrontendCommonDocCommonsModule() {
    }
    FrontendCommonDocCommonsModule = __decorate([
        core_1.NgModule({
            declarations: [
                cdoc_list_component_1.CommonDocListComponent,
                cdoc_list_header_component_1.CommonDocListHeaderComponent,
                cdoc_list_footer_component_1.CommonDocListFooterComponent,
                cdoc_list_item_component_1.CommonDocListItemComponent,
                cdoc_keywords_component_1.CommonDocKeywordsComponent,
                cdoc_keywordsstate_component_1.CommonDocKeywordsStateComponent,
                cdoc_timetable_component_1.CommonDocTimetableComponent,
                cdoc_typetable_component_1.CommonDocTypetableComponent,
                cdoc_tagcloud_component_1.CommonDocTagcloudComponent,
                cdoc_tags_component_1.CommonDocTagsComponent,
                cdoc_tagsstate_component_1.CommonDocTagsStateComponent,
                cdoc_videoplayer_component_1.CommonDocVideoplayerComponent,
                cdoc_audioplayer_component_1.CommonDocAudioplayerComponent,
                cdoc_actiontags_component_1.CommonDocActionTagsComponent
            ],
            imports: [
                ng_bootstrap_1.NgbModule,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule,
                core_2.TranslateModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular_commons_module_1.AngularCommonsModule
            ],
            exports: [
                cdoc_list_component_1.CommonDocListComponent,
                cdoc_list_header_component_1.CommonDocListHeaderComponent,
                cdoc_list_footer_component_1.CommonDocListFooterComponent,
                cdoc_list_item_component_1.CommonDocListItemComponent,
                cdoc_keywords_component_1.CommonDocKeywordsComponent,
                cdoc_keywordsstate_component_1.CommonDocKeywordsStateComponent,
                cdoc_timetable_component_1.CommonDocTimetableComponent,
                cdoc_typetable_component_1.CommonDocTypetableComponent,
                cdoc_tagcloud_component_1.CommonDocTagcloudComponent,
                cdoc_tags_component_1.CommonDocTagsComponent,
                cdoc_tagsstate_component_1.CommonDocTagsStateComponent,
                cdoc_videoplayer_component_1.CommonDocVideoplayerComponent,
                cdoc_audioplayer_component_1.CommonDocAudioplayerComponent,
                cdoc_actiontags_component_1.CommonDocActionTagsComponent
            ]
        })
    ], FrontendCommonDocCommonsModule);
    return FrontendCommonDocCommonsModule;
}());
exports.FrontendCommonDocCommonsModule = FrontendCommonDocCommonsModule;
//# sourceMappingURL=frontend-cdoc-commons.module.js.map