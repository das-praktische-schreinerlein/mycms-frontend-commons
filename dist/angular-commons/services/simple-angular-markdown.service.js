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
import { DefaultOptions } from '@dps/mycms-commons/dist/markdown-commons/options';
import { MarkdownService } from '@dps/mycms-commons/dist/markdown-commons/markdown.service';
import { AngularMarkdownService } from './angular-markdown.service';
import { AngularHtmlService } from './angular-html.service';
var SimpleAngularMarkdownService = /** @class */ (function (_super) {
    __extends(SimpleAngularMarkdownService, _super);
    function SimpleAngularMarkdownService(angularHtmlService) {
        var _this = _super.call(this, angularHtmlService) || this;
        _this.angularHtmlService = angularHtmlService;
        _this.markdownService = new MarkdownService(DefaultOptions.getDefault(), []);
        return _this;
    }
    SimpleAngularMarkdownService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularHtmlService])
    ], SimpleAngularMarkdownService);
    return SimpleAngularMarkdownService;
}(AngularMarkdownService));
export { SimpleAngularMarkdownService };
//# sourceMappingURL=simple-angular-markdown.service.js.map