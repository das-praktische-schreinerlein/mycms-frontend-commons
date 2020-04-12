var ResolverError = /** @class */ (function () {
    function ResolverError(code, data, errorData) {
        this._code = code;
        this._data = data;
        this._errorData = errorData;
    }
    Object.defineProperty(ResolverError.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResolverError.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResolverError.prototype, "errorData", {
        get: function () {
            return this._errorData;
        },
        enumerable: true,
        configurable: true
    });
    return ResolverError;
}());
export { ResolverError };
//# sourceMappingURL=resolver.utils.js.map