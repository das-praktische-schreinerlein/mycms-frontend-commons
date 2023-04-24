var FormUtils = /** @class */ (function () {
    function FormUtils() {
    }
    FormUtils.getNumberFormValue = function (values, formKey) {
        if (!values[formKey]) {
            return undefined;
        }
        if (Array.isArray(values[formKey])) {
            return Number(values[formKey][0]);
        }
        else {
            return Number(values[formKey]);
        }
    };
    FormUtils.getStringFormValue = function (values, formKey) {
        if (!values[formKey]) {
            return undefined;
        }
        if (Array.isArray(values[formKey])) {
            return values[formKey][0] + '';
        }
        else {
            return values[formKey] + '';
        }
    };
    FormUtils.getStringArrayFormValue = function (values, formKey) {
        if (!values[formKey]) {
            return undefined;
        }
        if (Array.isArray(values[formKey])) {
            return values[formKey];
        }
        else {
            return [values[formKey]];
        }
    };
    return FormUtils;
}());
export { FormUtils };
//# sourceMappingURL=form.utils.js.map