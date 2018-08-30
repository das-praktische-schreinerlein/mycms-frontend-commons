"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_markdown_1 = require("angular2-markdown");
var core_1 = require("@angular/core");
var angular_html_service_1 = require("./angular-html.service");
var AngularMarkdownService = /** @class */ (function () {
    function AngularMarkdownService(htmlService, markdownService) {
        this.htmlService = htmlService;
        this.markdownService = markdownService;
    }
    AngularMarkdownService.prototype.renderMarkdown = function (parentSelector, markdown, routeLocalLinkWithAngularRouter) {
        var html = '';
        try {
            html = this.markdownService.compile(markdown);
        }
        finally { }
        return this.htmlService.renderHtml(parentSelector, html, routeLocalLinkWithAngularRouter);
    };
    AngularMarkdownService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angular_html_service_1.AngularHtmlService, angular2_markdown_1.MarkdownService])
    ], AngularMarkdownService);
    return AngularMarkdownService;
}());
exports.AngularMarkdownService = AngularMarkdownService;
//# sourceMappingURL=angular-markdown.service.js.map