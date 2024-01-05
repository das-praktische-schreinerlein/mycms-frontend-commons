export var PreviewWindowType;
(function (PreviewWindowType) {
    PreviewWindowType[PreviewWindowType["IFRAME"] = 0] = "IFRAME";
    PreviewWindowType[PreviewWindowType["TAB"] = 1] = "TAB";
    PreviewWindowType[PreviewWindowType["WINDOW"] = 2] = "WINDOW";
})(PreviewWindowType || (PreviewWindowType = {}));
var PrintService = /** @class */ (function () {
    function PrintService() {
    }
    PrintService.prototype.isPrintAvailable = function () {
        return false;
    };
    PrintService.PRINT_PREVIEW_IFRAME_CONTAINER_ID = 'print_preview_iframe_container';
    PrintService.PRINT_PREVIEW_IFRAME_ID = 'print_preview_iframe';
    PrintService.PRINT_PREVIEW_WINDOW_ID = 'print_preview_window';
    return PrintService;
}());
export { PrintService };
//# sourceMappingURL=print.service.js.map