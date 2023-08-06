var AbstractMarkdownExtension = /** @class */ (function () {
    function AbstractMarkdownExtension(name, level, childTokens, startRegExp, tokenizerRegExp) {
        this.name = name;
        this.level = level;
        this.childTokens = childTokens;
        this.startRegExp = startRegExp;
        this.tokenizerRegExp = tokenizerRegExp;
    }
    AbstractMarkdownExtension.prototype.start = function (marked, src) {
        var match = src.match(this.startRegExp);
        return match
            ? match.index
            : undefined;
    };
    ;
    AbstractMarkdownExtension.prototype.tokenizer = function (marked, src, tokens) {
        throw new Error('must be implemented: ' + this.name);
    };
    AbstractMarkdownExtension.prototype.renderer = function (marked, token) {
        throw new Error('must be implemented: ' + this.name);
    };
    ;
    AbstractMarkdownExtension.prototype.toMarkDownExtension = function () {
        var me = this;
        return {
            name: this.name,
            childTokens: this.childTokens,
            level: this.level,
            start: function (src) {
                return me.start(this, src);
            },
            tokenizer: function (src, tokens) {
                return me.tokenizer(this, src, tokens);
            },
            renderer: function (token) {
                return me.renderer(this, token);
            }
        };
    };
    return AbstractMarkdownExtension;
}());
export { AbstractMarkdownExtension };
//# sourceMappingURL=markdown.extension.js.map