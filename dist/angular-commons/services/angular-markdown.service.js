var AngularMarkdownService = /** @class */ (function () {
    function AngularMarkdownService(htmlService) {
        this.htmlService = htmlService;
    }
    AngularMarkdownService.prototype.renderMarkdown = function (parentSelector, markdown, routeLocalLinkWithAngularRouter) {
        var html = '';
        try {
            html = this.markdownService.renderMarkdown(markdown);
        }
        finally {
            // NOOP
        }
        return this.htmlService.renderHtml(parentSelector, html, routeLocalLinkWithAngularRouter);
    };
    return AngularMarkdownService;
}());
export { AngularMarkdownService };
//# sourceMappingURL=angular-markdown.service.js.map