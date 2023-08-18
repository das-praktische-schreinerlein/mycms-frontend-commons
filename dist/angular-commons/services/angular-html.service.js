var AngularHtmlService = /** @class */ (function () {
    function AngularHtmlService(renderers) {
        this.renderers = renderers;
    }
    AngularHtmlService.browserSaveBlobAsFile = function (blob, fileName, mimeType) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            var e = document.createEvent('MouseEvents'), a = document.createElement('a');
            a.download = fileName;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = [mimeType, a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
        }
    };
    AngularHtmlService.browserSaveTextAsFile = function (text, fileName, mimeType) {
        var blob = new Blob([text], { type: mimeType });
        AngularHtmlService.browserSaveBlobAsFile(blob, fileName, mimeType);
    };
    AngularHtmlService.prototype.renderHtml = function (parentSelector, html, routeLocalLinkWithAngularRouter) {
        var inputEl = document.querySelector(parentSelector);
        if (!inputEl || inputEl === undefined || inputEl === null) {
            return false;
        }
        inputEl.innerHTML = html;
        this.postRender(parentSelector, routeLocalLinkWithAngularRouter);
        return true;
    };
    AngularHtmlService.prototype.postRender = function (parentSelector, routeLocalLinkWithAngularRouter) {
        var args = {
            routeLocalLinkWithAngularRouter: routeLocalLinkWithAngularRouter
        };
        for (var _i = 0, _a = this.renderers; _i < _a.length; _i++) {
            var renderer = _a[_i];
            renderer.postProcessHtml(parentSelector, args);
        }
    };
    return AngularHtmlService;
}());
export { AngularHtmlService };
//# sourceMappingURL=angular-html.service.js.map